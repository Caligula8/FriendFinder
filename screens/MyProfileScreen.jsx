import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { globalStyles } from "../styles/globalStyles";
import ContinueButton from "../components/ContinueButton";
import NavBar from "../components/Navbar";
import SelectPrimaryHobbiesMenu from "../components/SelectPrimaryHobbiesMenu";
import { useSelector, useDispatch } from "react-redux";
import { SET_USER } from "../context/actions/userActions";
import { updateDoc, doc } from "firebase/firestore";
import { firebaseStorage, firestoreDB } from "../config/firebase.config";
import { debounce } from "lodash";
import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const MyProfileScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [aboutMeText, setAboutMeText] = useState(user?.description || "");
  const [profileImage, setProfileImage] = useState(user?.photoURL || null);
  const hobbyButtonLabels = Array.from(
    { length: 3 },
    (_, index) => user?.primaryHobbies?.[index] || "Select"
  );
  const [isHobbiesMenuOpen, setHobbiesMenuOpen] = useState(false);

  // Initialize aboutMeText state when the component mounts
  useEffect(() => {
    setAboutMeText(user?.description || "");
  }, [user]);

  // Initialize profileImage state when the component mounts
  useEffect(() => {
    setProfileImage(user?.photoURL || null);
  }, [user]);

  const handleSettingsRedirect = () => {
    navigation.navigate("Settings");
  };

  const handleSelectPrimaryHobbies = () => {
    setHobbiesMenuOpen(true);
  };

  const handleReSelectHobbies = () => {
    navigation.navigate("ReSelectHobbies");
  };

  const handleViewPublicProfile = () => {
    navigation.navigate("MyPublicProfile");
  };

  const debouncedSave = useCallback(
    debounce((text) => handleSaveAboutMe(text), 1000),
    []
  );

  const handleSaveAboutMe = async (text) => {
    try {
      const trimmedText = text ? text.trim() : "";

      if (user && user._id && trimmedText) {
        const userRef = doc(firestoreDB, "users", user._id);

        await updateDoc(userRef, {
          description: trimmedText,
        });

        // Dispatch the action to update Redux store
        dispatch(SET_USER({ ...user, description: trimmedText }));
        console.log("About Me updated successfully!");
      } else {
        console.error("User, user ID, or About Me text is missing");
      }
    } catch (error) {
      console.error("Error updating About Me:", error);
    }
  };

  const handleUploadImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
      });

      if (!result.cancelled && result.assets && result.assets.length > 0) {
        const selectedImage = result.assets[0];
        const imageUri = selectedImage.uri;
        const fileExtension = imageUri.split(".").pop(); // Extract file extension

        const response = await fetch(imageUri);
        const blob = await response.blob();

        // Create storage reference with file extension
        const storageRef = ref(
          firebaseStorage,
          `profile_images/${user._id}.${fileExtension}`
        );

        await uploadBytes(storageRef, blob); // Upload image to Firebase Storage
        const downloadURL = await getDownloadURL(storageRef); // Get URL

        // Update user photoURL field in Firestore
        const userRef = doc(firestoreDB, "users", user._id);
        await updateDoc(userRef, { photoURL: downloadURL });

        // Dispatch the action to update Redux store
        dispatch(SET_USER({ ...user, photoURL: downloadURL }));
        console.log("Profile image uploaded successfully!");
      }
    } catch (error) {
      console.error("Error uploading profile image:", error);
    }
  };

  const hasProfileImage = profileImage !== null;

  return (
    <View style={globalStyles.pageContainer}>
      {/* Header */}
      <View style={globalStyles.header}>
        <View style={globalStyles.titleContainer}>
          <Text style={globalStyles.title}>FriendFinder</Text>
        </View>
        <TouchableOpacity
          style={globalStyles.headerIconContainerRight}
          onPress={handleSettingsRedirect}
        >
          <Ionicons name="settings-outline" size={32} color="black" />
        </TouchableOpacity>
      </View>
      {/* Body */}
      <View style={globalStyles.contentContainer}>
        {/* Profile Image */}
        <View style={ggg.profileImageContainer}>
          {hasProfileImage ? (
            <View>
              <Image
                source={{ uri: profileImage }}
                style={ggg.profileImage}
                resizeMode="cover"
                onError={(error) => console.error("Image Error:", error)}
              />
              <TouchableOpacity
                style={ggg.uploadProfileImageButton}
                onPress={() => handleUploadImage()}
              >
                <MaterialIcons name="edit" size={22} color="white" />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={ggg.profileImage}>
              <Ionicons name="person" size={110} color="grey" />
              <TouchableOpacity
                style={ggg.uploadProfileImageButton}
                onPress={() => handleUploadImage()}
              >
                <MaterialIcons name="edit" size={22} color="white" />
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Profile Options */}
        <View style={globalStyles.subContentContainer}>
          {/* Profile Description */}
          <Text style={globalStyles.subTitle}>About Me</Text>
          <TextInput
            style={ggg.textInput}
            placeholder="Write about yourself..."
            multiline
            value={aboutMeText}
            onChangeText={(text) => {
              setAboutMeText(text);
              debouncedSave(text);
            }}
          />

          {/* Primary Hobbies */}
          <Text style={globalStyles.subTitle}>Primary Hobbies</Text>
          <View style={ggg.hobbiesButtonContainer}>
            {hobbyButtonLabels.map((label, index) => (
              <TouchableOpacity
                key={index}
                style={ggg.hobbiesButton}
                onPress={handleSelectPrimaryHobbies}
              >
                <Text style={ggg.hobbiesButtonText}>{label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Buttons */}
        <View style={ggg.buttonContainer}>
          <ContinueButton
            onPress={handleReSelectHobbies} //need change this
            buttonText="Modify My Hobbies"
            transparency={0.7}
          />
          <ContinueButton
            onPress={handleViewPublicProfile}
            buttonText="View My Public Profile"
            transparency={0.7}
          />
        </View>
      </View>
      {/* Footer/Navbar */}
      <View style={globalStyles.footer}>
        <NavBar />
      </View>

      {isHobbiesMenuOpen && (
        <SelectPrimaryHobbiesMenu
          isVisible={isHobbiesMenuOpen}
          onClose={() => setHobbiesMenuOpen(false)}
        />
      )}
    </View>
  );
};

const ggg = StyleSheet.create({
  profileImageContainer: {
    alignItems: "center",
    paddingTop: 18,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 16,
    borderWidth: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#d3d3d3",
    position: "relative",
  },
  uploadProfileImageButton: {
    position: "absolute",
    bottom: -10,
    right: -12,
    backgroundColor: "grey",
    borderRadius: 100,
    padding: 5,
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 20,
    position: "absolute",
    bottom: 0,
  },
  textInput: {
    width: "100%",
    height: 64,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#fddbdd",
    padding: 10,
    marginVertical: 10,
  },
  hobbiesButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    //borderWidth: 1,
    //borderColor: "green",
  },
  hobbiesButton: {
    flex: 1,
    height: 64,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#fddbdd",
    padding: 1,
    marginHorizontal: 5,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  hobbiesButtonText: {
    color: "#8D8D8D",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default MyProfileScreen;
