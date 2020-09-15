<template>
  <div style="margin-top:3rem">
    <v-banner single-line v-if="!loggedIn">
      <v-icon slot="icon" color="warning" size="36">mdi-cancel</v-icon>Please login! .....
      <v-icon color="error">mdi-thumb-up</v-icon>
    </v-banner>
    <div v-else style="margin-left:3rem">
    <div>
    <lottie-animation
    path="@/assets/rabit.json"
/>
  </div>
      <v-container>
        <v-row no-gutters>
          <v-col v-for="data in datas" :key="data" cols="data" sm="4" style="margin:5px">
            <v-hover v-slot:default="{ hover }" open-delay="200">
              <v-card
                max-width="344"
                class="mx-auto"
                style="margin:10px"
                :elevation="hover ? 16 : 2"
              >
                <v-list-item>
                  <v-list-item-avatar>
                    <img :src="data.photo" alt="John" />
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title class="headline">{{data.ClassName}}</v-list-item-title>
                    <v-list-item-subtitle>by {{data.username}}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-img
                  :aspect-ratio="16/9"
                  src="https://img.pngio.com/classroom-png-free-classroompng-transparent-images-2862-pngio-classroom-images-png-3917_2083.png"
                  height="150"
                >
                  <v-expand-transition>
                    <div
                      v-if="hover"
                      class="d-flex transition-fast-in-fast-out orange darken-3 v-card--reveal display-1 white--text"
                      style="height: 100%;"
                    >{{data.ClassName}}</div>
                  </v-expand-transition>
                </v-img>
                <v-btn absolute color="orange" class="white--text" fab large right top>
                  <v-icon>mdi-share</v-icon>
                </v-btn>
                <v-row>
                  <v-btn class="ma-3" color="error" text dark>Class Id :- {{data.roomId}}</v-btn>
                </v-row>
                <v-card-actions>
                  <v-btn color="error">Open</v-btn>

                  <v-spacer></v-spacer>
                  <v-btn icon>
                    <v-icon>mdi-heart</v-icon>
                  </v-btn>
                  <v-btn icon>
                    <v-icon>mdi-account</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import { db, fire } from "../firebase.init";
import { mapGetters } from "vuex";
export default {
  name: "homee",
  data() {
    return {
      datas: [],
      user: null,
    };
  },
  computed: {
    ...mapGetters("user", {
      loggedIn: "loggedIn",
      userProfile: "userProfile",
      loadClass: "loadClass",
    }),
  },
  created() {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        var useri = user.uid;
        var userName = user.displayName;
        var userEmail = user.email;
        var userPicture = user.photoURL;
        // console.log("UID",userUid)
        let userRef = db.ref("users/" + useri);

        userRef.set({
          username: userName,
          email: userEmail,
          photo: userPicture,
        });
        let ClassRef = db
          .ref("Room")
          .child("Class")
          .orderByChild(useri + "class")
          .equalTo("true");

        ClassRef.on("value", (data) => {
          let list = [];
          const obj = data.val();
          for (let key in obj) {
            list.push({
              ...obj[key],
              id: key,
            });
          }
          console.log("List", list);
          this.datas = list;
        });
      }
    });
  },
};
</script>
<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  width: 100%;
}
</style>