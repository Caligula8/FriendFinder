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
