
import firebase from 'firebase';
const state = {
  userProfile: {},
  loadClass:{},
  loggedIn: false
};

const getters = {
  userProfile: ({userProfile}) => userProfile,
  loadClass: ({loadClass}) => loadClass,
  loggedIn: ({loggedIn}) => loggedIn
};

const mutations = {
  USER_DETAILS(state, userProfile) {
    state.loggedIn = true;    
    state.userProfile = {
      name: userProfile.displayName,
      picture: userProfile.photoURL,
      uid: userProfile.uid
    };
  },

  LOGOUT(state) {
    state.loggedIn = false;
    state.userProfile = {};
  },
  loadClass(state , loadClass) {
    firebase.database().ref("Room").child("Class").once("value")
    .then((data)=>{
      state.loadClass = []
      const obj = data.val()
      for(let key in obj){
        loadClass.push({
          id: key,
          ClassName: obj[key].ClassName,
          roomId: obj[key].roomId,
          timedate: obj[key].timedate,
          username: obj[key].username
                })
      }
    })
  }
};

const actions = {
  async login(store) {

    if (store.state.loggedIn)
      return;

    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      await firebase.auth().signInWithPopup(provider);
      
    } catch(error) {
      console.log(error);
    }
  },
 
  async logout() {
    try {
      await firebase.auth().signOut();
    } catch(error) {
      console.log(error);
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};