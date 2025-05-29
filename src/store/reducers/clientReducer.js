const initialState = {
  user: null,
  token: localStorage.getItem('authToken') || null,
  isAuthenticated: false,
  roles: [],
  theme: 'light',
  language: 'en',
  isRolesLoading: false,
  rolesError: null,
  isLoggingIn: false,
  loginError: null,
  isVerifyingToken: false,
  verifyTokenError: null,
};

const clientReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token || state.token,
        isAuthenticated: !!action.payload.user,
        isLoggingIn: false,
        loginError: null,
      };
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.payload,
        isAuthenticated: !!action.payload,
      };
    case 'FETCH_ROLES_REQUEST':
      return { ...state, isRolesLoading: true, rolesError: null };
    case 'FETCH_ROLES_SUCCESS':
      return { ...state, roles: action.payload, isRolesLoading: false, rolesError: null };
    case 'FETCH_ROLES_FAILURE':
      return { ...state, isRolesLoading: false, rolesError: action.payload };
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'SET_LANGUAGE':
      return { ...state, language: action.payload };
    
    case 'LOGIN_REQUEST':
      return { ...state, isLoggingIn: true, loginError: null, isAuthenticated: false };
    case 'LOGIN_SUCCESS':
      if (action.payload.rememberMe && action.payload.token) {
        localStorage.setItem('authToken', action.payload.token);
      } else {
        localStorage.removeItem('authToken');
      }
      return {
        ...state,
        isLoggingIn: false,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        loginError: null,
      };
    case 'LOGIN_FAILURE':
      localStorage.removeItem('authToken');
      return {
        ...state,
        isLoggingIn: false,
        loginError: action.payload,
        user: null,
        token: null,
        isAuthenticated: false,
      };
    case 'LOGOUT_USER':
      localStorage.removeItem('authToken');
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loginError: null,
        isLoggingIn: false,
        isVerifyingToken: false,
        verifyTokenError: null,
      };

    case 'VERIFY_TOKEN_REQUEST':
        return { ...state, isVerifyingToken: true, verifyTokenError: null };
    case 'VERIFY_TOKEN_SUCCESS':
        if (action.payload.token) {
            localStorage.setItem('authToken', action.payload.token);
        }
        return {
            ...state,
            isVerifyingToken: false,
            user: action.payload.user,
            token: action.payload.token,
            isAuthenticated: true,
            verifyTokenError: null,
        };
    case 'VERIFY_TOKEN_FAILURE':
        localStorage.removeItem('authToken');
        return {
            ...state,
            isVerifyingToken: false,
            verifyTokenError: "Token verification failed",
            user: null,
            token: null,
            isAuthenticated: false,
        };
    default:
      return state;
  }
};

export default clientReducer;