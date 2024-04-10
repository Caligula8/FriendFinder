// userAuthReducer
const initialState = {
  user: null,
  registrationComplete: false,
  selectedHobby: "",
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
    case "SET_SELECTED_HOBBY":
      return {
        ...state,
        selectedHobby: action.hobby,
      };
    default:
      return state;
  }
};

export default userAuthReducer;
