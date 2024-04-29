// userActions.js
export const SET_USER = (user) => {
  return {
    type: "SET_USER",
    user: user,
  };
};

export const SET_USER_NULL = () => {
  return {
    type: "SET_USER_NULL",
  };
};

export const SET_REGISTRATION_COMPLETE = () => {
  return {
    type: "SET_REGISTRATION_COMPLETE",
  };
};

export const SET_NON_REJECTED_USERS = (nonRejectedUsers) => {
  return {
    type: "SET_NON_REJECTED_USERS",
    nonRejectedUsers,
  };
};

export const SET_NON_REJECTED_USERS_FOR_SELECTED_HOBBY = (nonRejectedUsers) => {
  return {
    type: "SET_NON_REJECTED_USERS_FOR_SELECTED_HOBBY",
    nonRejectedUsers,
  };
};

export const SET_SELECTED_HOBBY = (hobby) => {
  return {
    type: "SET_SELECTED_HOBBY",
    hobby,
  };
};

export const REMOVE_USER_FROM_NON_REJECTED = "REMOVE_USER_FROM_NON_REJECTED";
export const removeUserFromNonRejected = (userId) => {
  return {
    type: REMOVE_USER_FROM_NON_REJECTED,
    userId,
  };
};

export const enableRandomSearch = () => ({
  type: "ENABLE_RANDOM_SEARCH",
});

export const disableRandomSearch = () => ({
  type: "DISABLE_RANDOM_SEARCH",
});

export const markUserAsViewed = (viewedUserId) => {
  return {
    type: "MARK_USER_AS_VIEWED",
    payload: { viewedUserId },
  };
};
