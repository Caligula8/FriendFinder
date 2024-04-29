import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_NON_REJECTED_USERS_FOR_SELECTED_HOBBY } from "../context/actions/userActions";
import { firestoreDB } from "../config/firebase.config";
import { collection, query, where, getDocs } from "firebase/firestore";

const useFilteredNonRejectedUsers = () => {
  const dispatch = useDispatch();
  const { user, selectedHobby } = useSelector((state) => state.user);

  useEffect(() => {
    async function fetchUsersByHobby(hobby) {
      const usersRef = collection(firestoreDB, "users");
      const nonRejectedUsers = [];
      const q = query(usersRef, where("hobbies", "array-contains", hobby));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        if (!user.usersRejected[doc.id] && doc.id !== user._id) {
          nonRejectedUsers.push(doc.data());
        }
      });

      return nonRejectedUsers;
    }

    const updateFilteredUsers = async () => {
      if (selectedHobby && user?._id) {
        const filteredUsers = await fetchUsersByHobby(selectedHobby);
        dispatch({
          type: "SET_NON_REJECTED_USERS_FOR_SELECTED_HOBBY",
          nonRejectedUsers: filteredUsers,
        });
      }
    };

    updateFilteredUsers();
  }, [dispatch, user, selectedHobby]);
};

export default useFilteredNonRejectedUsers;
