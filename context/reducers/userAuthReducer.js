// reducers/userAuthReducer.js
const initialState = {
  user: null,
  registrationComplete: false,
  nonRejectedUsers: [],
  nonRejectedUsersForSelectedHobby: [],
  selectedHobby: "",
  randomSearchEnabled: false,
};

const userAuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
        registrationComplete: true,
      };
    case "SET_USER_NULL":
      return {
        ...state,
        user: null,
        registrationComplete: false,
      };
    case "SET_REGISTRATION_COMPLETE":
      return {
        ...state,
        registrationComplete: true,
      };
    case "SET_NON_REJECTED_USERS":
      return {
        ...state,
        nonRejectedUsers: action.nonRejectedUsers,
      };
    case "SET_NON_REJECTED_USERS_FOR_SELECTED_HOBBY":
      return {
        ...state,
        nonRejectedUsersForSelectedHobby: action.nonRejectedUsers,
      };
    case "SET_SELECTED_HOBBY":
      return {
        ...state,
        selectedHobby: action.hobby,
      };
    case "REMOVE_USER_FROM_NON_REJECTED":
      return {
        ...state,
        nonRejectedUsers: state.nonRejectedUsers.filter(
          (user) => user._id !== action.userId
        ),
      };
    case "ENABLE_RANDOM_SEARCH":
      return {
        ...state,
        randomSearchEnabled: true,
      };
    case "DISABLE_RANDOM_SEARCH":
      return {
        ...state,
        randomSearchEnabled: false,
      };

    case "MARK_USER_AS_VIEWED":
      const updatedViewedUserProfiles = {
        ...state.user.viewedUserProfiles,
        [action.payload.viewedUserId]: true,
      };

      return {
        ...state,
        user: {
          ...state.user,
          viewedUserProfiles: updatedViewedUserProfiles,
        },
      };

    default:
      return state;
  }
};

export default userAuthReducer;
