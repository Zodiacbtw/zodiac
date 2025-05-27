import {
  SET_USER,
  SET_ROLES,
  SET_THEME,
  SET_LANGUAGE,
  FETCH_ROLES_REQUEST,
  FETCH_ROLES_FAILURE,
  LOGIN_REQUEST,
  LOGIN_FAILURE,
  LOGOUT_USER,
} from '../actions/clientActions';

const initialState = {
  user: null,
  token: null,
  addressList: [],
  creditCards: [],
  roles: [],
  theme: 'light',
  language: 'en',
  isRolesLoading: false,
  rolesError: null,
  isLoggingIn: false,
  loginError: null,
};

const clientReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        isLoggingIn: false,
        loginError: null,
      };
    case FETCH_ROLES_REQUEST:
      return { ...state, isRolesLoading: true, rolesError: null };
    case SET_ROLES:
      return { ...state, roles: action.payload, isRolesLoading: false, rolesError: null };
    case FETCH_ROLES_FAILURE:
      return { ...state, isRolesLoading: false, rolesError: action.payload };
    case SET_THEME:
      return { ...state, theme: action.payload };
    case SET_LANGUAGE:
      return { ...state, language: action.payload };
    case LOGIN_REQUEST:
      return { ...state, isLoggingIn: true, loginError: null };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoggingIn: false,
        loginError: action.payload,
        user: null,
        token: null,
      };
    case LOGOUT_USER:
      return {
        ...state,
        user: null,
        token: null,
        loginError: null,
        isLoggingIn: false,
      };
    default:
      return state;
  }
};

export default clientReducer;