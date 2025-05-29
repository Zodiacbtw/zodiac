import axiosInstance from '../../api/axiosInstance';
import md5 from 'md5';

export const SET_USER = 'SET_USER';
export const SET_TOKEN = 'SET_TOKEN';
export const SET_ROLES = 'SET_ROLES';
export const SET_THEME = 'SET_THEME';
export const SET_LANGUAGE = 'SET_LANGUAGE';

export const FETCH_ROLES_REQUEST = 'FETCH_ROLES_REQUEST';
export const FETCH_ROLES_SUCCESS = 'FETCH_ROLES_SUCCESS';
export const FETCH_ROLES_FAILURE = 'FETCH_ROLES_FAILURE';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_USER = 'LOGOUT_USER';

export const VERIFY_TOKEN_REQUEST = 'VERIFY_TOKEN_REQUEST';
export const VERIFY_TOKEN_SUCCESS = 'VERIFY_TOKEN_SUCCESS';
export const VERIFY_TOKEN_FAILURE = 'VERIFY_TOKEN_FAILURE';


export const setUser = (userData, tokenFromLogin = null) => {
  let gravatarUrl = `https://www.gravatar.com/avatar/?d=mp&s=40`;
  if (userData && userData.email) {
    try {
      const emailToHash = userData.email.trim().toLowerCase();
      const hash = md5(emailToHash);
      gravatarUrl = `https://www.gravatar.com/avatar/${hash}?d=identicon&s=40`;
    } catch (error) {
      console.error("Error creating Gravatar hash:", error);
    }
  }
  return {
    type: SET_USER,
    payload: {
        user: userData ? {
            id: userData.id,
            name: userData.name,
            email: userData.email,
            role_id: userData.role_id,
            gravatarUrl
        } : null,
        token: tokenFromLogin
    }
  };
};

export const setToken = (token) => ({
    type: SET_TOKEN,
    payload: token,
});

export const setRoles = (rolesData) => ({
  type: SET_ROLES,
  payload: rolesData,
});

export const setTheme = (theme) => ({
  type: SET_THEME,
  payload: theme,
});

export const setLanguage = (language) => ({
  type: SET_LANGUAGE,
  payload: language,
});

export const fetchRolesIfNeeded = () => async (dispatch, getState) => {
  const { client } = getState();
  if (!client.roles || client.roles.length === 0) {
    dispatch({ type: FETCH_ROLES_REQUEST });
    try {
      const response = await axiosInstance.get('/roles');
      dispatch({ type: FETCH_ROLES_SUCCESS, payload: response.data });
    } catch (error) {
      console.error("Error fetching roles:", error);
      dispatch({ type: FETCH_ROLES_FAILURE, payload: error.message });
    }
  }
};


export const loginUser = (credentials, rememberMe, history, from) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const response = await axiosInstance.post('/login', credentials);
    console.log("API Login Response Data:", response.data);

    const { token, name, email, role_id } = response.data;

    const userDataForReducer = {
      name: name,
      email: email,
      role_id: role_id,
    };

    if (!token || !userDataForReducer.name || !userDataForReducer.email || !userDataForReducer.role_id) {
        throw new Error('Login response is missing required user data or token.');
    }
    
    dispatch({ 
        type: LOGIN_SUCCESS, 
        payload: { user: userDataForReducer, token, rememberMe }
    });

    if (from && from.pathname !== "/login" && from.pathname !== "/signup") {
      history.replace(from);
    } else {
      history.replace('/');
    }
    return { success: true };
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'Login failed. Please check your credentials.';
    dispatch({ type: LOGIN_FAILURE, payload: errorMessage });
    console.error("Login error:", error.response?.data || error.message);
    return { success: false, message: errorMessage };
  }
};

export const logoutUser = (history) => (dispatch) => {
    localStorage.removeItem('authToken');
    delete axiosInstance.defaults.headers.common['Authorization'];
    dispatch({ type: LOGOUT_USER });
    if (history) {
      history.push('/login');
    }
  };

export const verifyTokenOnAppLoad = () => async (dispatch) => {
    const tokenFromStorage = localStorage.getItem('authToken');
    if (tokenFromStorage) {
        dispatch({ type: VERIFY_TOKEN_REQUEST });
        try {
            const response = await axiosInstance.get('/verify');
            
            const userData = response.data.user || response.data;
            
            if (!userData || !userData.name || !userData.email || !userData.role_id) {
                 throw new Error('/verify endpoint did not return valid user data.');
            }

            dispatch({ 
                type: VERIFY_TOKEN_SUCCESS, 
                payload: { user: userData, token: tokenFromStorage }
            });

        } catch (error) {
            console.warn("Token verification failed:", error.response?.data?.message || error.message);
            dispatch({ type: VERIFY_TOKEN_FAILURE });
        }
    } else {
        delete axiosInstance.defaults.headers.common['Authorization'];
    }
};