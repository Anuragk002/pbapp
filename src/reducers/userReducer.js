const initialState = {
  users: [],
  userDetails: null,
  loading: false,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_USERS_SUCCESS':
      return { ...state, users: [...state.users, ...action.payload], loading: false, error: null };
    case 'FETCH_USERS_ERROR':
      return { ...state, users: [], loading: false, error: action.payload };
    // case 'SET_USER_DETAILS':
    //   return { ...state, userDetails: action.payload };
    default:
      return state;
  }
};

export default userReducer;
