import {fire} from './firebase.init';
import store from './store';

// https://firebase.google.com/docs/auth/web/manage-users
fire.auth().onAuthStateChanged(function(user) {
  if (user) {
    store.commit(`user/USER_DETAILS`, user);
  } else {
    store.commit(`user/LOGOUT`);
  }
});