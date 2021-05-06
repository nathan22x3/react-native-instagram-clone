import firebase from 'firebase';
import { getErrorMessage } from '../../utils';
import { SET_AUTH_ERRORS } from '../constants';

export const login = (email, password) => (dispatch) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch((error) => {
      dispatch({
        type: SET_AUTH_ERRORS,
        errors: { login: getErrorMessage(error.message) },
      });
      console.log(getErrorMessage(error.message));
    });
};

export const signup = (email, password) => (dispatch) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(({ user }) => {
      firebase
        .firestore()
        .collection('users')
        .doc(user.uid)
        .set({ email: user.email });
    })
    .catch((error) => {
      dispatch({
        type: SET_AUTH_ERRORS,
        errors: { signup: getErrorMessage(error.message) },
      });
      console.log(getErrorMessage(error.message));
    });
};

export const logout = () => (dispatch) => {
  firebase
    .auth()
    .signOut()
    .catch((error) => {
      dispatch({
        type: SET_AUTH_ERRORS,
        errors: { logout: getErrorMessage(error.message) },
      });
    });
};
