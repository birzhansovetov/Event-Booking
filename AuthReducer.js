const initialState = { user: null };

function AuthReducer(state = initialState, action) {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    default:
      return state;
  }
}

export default AuthReducer;

export const login = (user) => ({ type: "LOGIN", payload: user });
export const logout = () => ({ type: "LOGOUT" });