import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import NavBar from "../components/Navbar";
import SuggestedProfile from "../components/SuggestedProfile";
import { globalStyles } from "../styles/globalStyles";
import { firestoreDB } from "../config/firebase.config";
import {
  doc,
  getDoc,
  updateDoc,
  getDocs,
  collection,
  query,
  startAfter,
  limit,
  runTransaction,
} from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import {
  removeUserFromNonRejected,
  markUserAsViewed,
} from "../context/actions/userActions";
import useNonRejectedUsers from "../components/useNonRejectedUsers";
import MessagePromptModal from "../components/MessagePromptModal";

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.user.user);
  const nonRejectedUsers = useSelector((state) => state.user.nonRejectedUsers);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [randomSearchEnabled, setRandomSearchEnabled] = useState(false);
  const [nonRejectedUsersAllViewed, setNonRejectedUsersAllViewed] =
    useState(false);
  const [noMoreNewUsersExist, setNoMoreNewUsersExist] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { fetchAndFilterUsers } = useNonRejectedUsers(loggedInUser);
  const screenWidth = Dimensions.get("window").width;

  //useEffect hook to handle user selection and state management
  useEffect(() => {
    if (!randomSearchEnabled && nonRejectedUsers.length > 0) {
      //listing through users that share a hobby with you
      setSelectedUser(nonRejectedUsers[0]);
    } else if (!randomSearchEnabled && nonRejectedUsers.length === 0) {
      //no more matches, prompt user state
      setNonRejectedUsersAllViewed(true);
      setSelectedUser(null);
    } else if (randomSearchEnabled) {
      //random new users state
      fetchRandomUser();
    }
  }, [nonRejectedUsers, randomSearchEnabled]);

  // Updates user as viewed in the db and redux store
  const markUserAsViewedAndUpdate = async (viewedUserId) => {
    if (isUpdating) return; //prevent updates during another update
    setIsUpdating(true);
    try {
      const userRef = doc(firestoreDB, "users", loggedInUser?._id);
      await updateDoc(userRef, {
        [`viewedUserProfiles.${viewedUserId}`]: true,
      });
      dispatch(markUserAsViewed(loggedInUser?._id, viewedUserId));
    } catch (error) {
      console.error("Error marking user as viewed:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  // Handles action to select next user.
  const handleNextUser = () => {
    if (selectedUser) {
      markUserAsViewedAndUpdate(selectedUser?._id);
      dispatch(removeUserFromNonRejected(selectedUser?._id));
      if (nonRejectedUsers.length === 1) {
        setNonRejectedUsersAllViewed(true);
        setSelectedUser(null);
      }
    }
  };

  const fetchRandomUser = async () => {
    let lastVisible = null; // Tracks the last document snapshot from the previous query for pagination
    try {
      const pageSize = 20; // Page size for each query batch
      const usersRef = collection(firestoreDB, "users");

      // Repeat until a suitable user is found or no users are left to query
      while (true) {
        // Construct the query for fetching users, paginating if necessary.
        const userDocRef = doc(firestoreDB, "users", loggedInUser?._id);
        const userDoc = await getDoc(userDocRef);
        const viewedProfiles = userDoc.data()?.viewedUserProfiles || {};

        const userQuery = lastVisible // Execute the query
          ? query(usersRef, startAfter(lastVisible), limit(pageSize))
          : query(usersRef, limit(pageSize));

        const snapshot = await getDocs(userQuery);
        if (snapshot.empty) {
          // No more users to fetch
          setNoMoreNewUsersExist(true);
          setSelectedUser(null);
          return;
        }
        // Filter out users who have already been viewed and the logged-in user
        const candidates = snapshot.docs
          .filter(
            (doc) =>
              doc.id !== loggedInUser?._id &&
              !viewedProfiles.hasOwnProperty(doc.id) //hasOwnProperty = check existence
          )
          .map((doc) => ({ id: doc.id, ...doc.data() })); // Map documents to user objects

        if (candidates.length > 0) {
          const randomIndex = Math.floor(Math.random() * candidates.length);
          const selected = candidates[randomIndex];
          setSelectedUser(selected); // Select a random user from the filtered list

          // Using a transaction to update viewedUserProfiles
          await runTransaction(firestoreDB, async (transaction) => {
            const freshDoc = await transaction.get(userDocRef);
            const freshProfiles = freshDoc.data()?.viewedUserProfiles || {};
            freshProfiles[selected.id] = true; // Mark user as viewed
            transaction.update(userDocRef, {
              viewedUserProfiles: freshProfiles,
            });
          });

          return;
        }
        // If the fetched batch is smaller than the page size, indicates there are no more queries left to make
        if (snapshot.docs.length < pageSize) {
          setNoMoreNewUsersExist(true);
          setSelectedUser(null);
          return;
        }
        // Update lastVisible for the next query batch using the last document from the current batch.
        lastVisible = snapshot.docs[snapshot.docs.length - 1];
      }
    } catch (error) {
      console.error("Error fetching random user:", error);
      setNoMoreNewUsersExist(true);
      setSelectedUser(null);
    }
  };

  const emptyViewedUsers = async () => {
    setRandomSearchEnabled(false);
    setNoMoreNewUsersExist(false);
    setIsLoading(true);
    try {
      await updateDoc(doc(firestoreDB, "users", loggedInUser?._id), {
        viewedUserProfiles: {},
      });
      fetchAndFilterUsers(loggedInUser);
    } catch (error) {
      console.error("Failed to reset viewed profiles:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={globalStyles.pageContainer}>
      <View style={globalStyles.header}>
        <View style={globalStyles.titleContainer}>
          <Text style={globalStyles.title}>Discover Profiles</Text>
        </View>
      </View>
      <View style={globalStyles.suggestedProfileContainer}>
        {selectedUser ? (
          <SuggestedProfile
            displayName={selectedUser.displayName}
            hobbies={selectedUser?.hobbies || "None"}
            userHobbies={loggedInUser?.hobbies || "None"}
            onPressMessage={() => setModalVisible(true)}
            onPressNextUser={handleNextUser}
            onPressProfile={() =>
              navigation.navigate("SelectedPublicProfile", {
                userID: selectedUser?._id,
              })
            }
          />
        ) : nonRejectedUsersAllViewed && !randomSearchEnabled ? (
          <View style={styles.noUsersContainer}>
            <Text style={styles.noUsersText}>
              You've explored all potential hobby matches!
            </Text>
            <Text style={styles.noUsersText}>
              Feel free to adjust your hobbies or enable random search to
              discover new connections.
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, { width: screenWidth * 0.4 }]}
                onPress={() => navigation.navigate("ReSelectHobbies")}
              >
                <Text style={styles.buttonText}>Change Hobbies</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { width: screenWidth * 0.4 }]}
                onPress={setRandomSearchEnabled(true)}
              >
                <Text style={styles.buttonText}>Enable Random Search</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : noMoreNewUsersExist ? (
          <View style={styles.noUsersContainer}>
            <Text style={styles.noUsersText}>
              Looks Like You've Reached The End
            </Text>
            <TouchableOpacity
              style={[styles.button, { width: screenWidth * 0.4 }]}
              onPress={emptyViewedUsers}
            >
              <Text style={styles.buttonText}>Show Viewed Profiles</Text>
            </TouchableOpacity>
          </View>
        ) : isLoading ? (
          <View style={styles.noUsersContainer}>
            <ActivityIndicator size="large" color="#E24E59" />
          </View>
        ) : (
          <View style={styles.noUsersContainer}>
            <ActivityIndicator size="large" color="#E24E59" />
          </View>
        )}
      </View>
      <MessagePromptModal
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        recipientUsername={selectedUser?.displayName || "Guest"}
        senderID={loggedInUser?._id || "Guest"}
        recipientID={selectedUser?.uid || "Guest"}
        senderName={loggedInUser?.displayName || "Guest"}
        onMessageSent={handleNextUser}
      />
      <NavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  noUsersContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  noUsersText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: "#e24e59",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
});

export default HomeScreen;
