import { useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  SET_NON_REJECTED_USERS,
  disableRandomSearch,
} from "../context/actions/userActions";
import { firestoreDB } from "../config/firebase.config";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";

const useNonRejectedUsers = (user) => {
  const dispatch = useDispatch();

  const fetchAndFilterUsers = useCallback(async () => {
    if (!user) {
      console.log("User is null, returning early");
      return;
    }

    dispatch(disableRandomSearch());
    const usersRef = collection(firestoreDB, "users");
    const nonRejectedUsers = [];
    const uniqueUserIds = new Set();

    for (const hobby of user.hobbies) {
      const q = query(usersRef, where("hobbies", "array-contains", hobby));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        if (
          doc.id !== user._id &&
          (!user.viewedUserProfiles || !user.viewedUserProfiles[doc.id]) &&
          !uniqueUserIds.has(doc.id)
        ) {
          uniqueUserIds.add(doc.id);
          nonRejectedUsers.push(doc.data());
        }
      });
    }

    dispatch(SET_NON_REJECTED_USERS(nonRejectedUsers));

    if (
      user.viewedUserProfiles &&
      Object.keys(user.viewedUserProfiles).length > 300
    ) {
      const userRef = doc(firestoreDB, "users", user._id);
      await updateDoc(userRef, {
        viewedUserProfiles: {},
      });
    }

    console.log("nonRejectedUsers count:", nonRejectedUsers.length);
  }, [dispatch, user]);

  return { fetchAndFilterUsers };
};

export default useNonRejectedUsers;
