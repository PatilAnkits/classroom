<template functional>
   <v-app-bar
   absolute
      color="white"
      elevate-on-scroll
      scroll-target="#scrolling-techniques-7"
    >
     <v-app-bar-nav-icon></v-app-bar-nav-icon>
     <v-toolbar-title>Classroom</v-toolbar-title>
     <v-spacer></v-spacer>
  
     <v-btn v-if="props.loggedIn" class="ma-0" color="indigo" dark @click="active = true">
       Join 
        <v-icon dark right>mdi-plus</v-icon>
      </v-btn>
      
      <v-btn v-if="props.loggedIn" class="ma-5" color="error" dark>
       Create
        <v-icon dark right>mdi-checkbox-marked-circle</v-icon>
      </v-btn>
    <v-menu offset-y v-if="props.loggedIn">
      <template v-slot:activator="{ on, attrs }">
        <v-avatar
          v-bind="attrs"
          v-on="on">
          <img :src="props.userProfile.picture" />
        </v-avatar>
        <v-btn v-if="props.loggedIn"
        text class="ma-0" color="error" dark>
       {{props.userProfile.name}}
        <v-icon dark right>mdi-profile</v-icon>
      </v-btn>
      </template>
    <v-list>
      <v-list-item @click="props.logout">
       <v-badge
        bordered
        color="error"
        icon="mdi-lock"
        overlap
      >
        <v-btn
          class="white--text"
          color="error"
          depressed
        >
          LogOut
        </v-btn>
      </v-badge>
      </v-list-item>
    </v-list>
    </v-menu>
      <v-btn 
       v-else
      @click="props.login"
      class="ma-2" color="orange darken-2" dark>
        <v-icon dark left>mdi-google</v-icon>Login with Google
      </v-btn>

  </v-app-bar>
</template>

<script>
  export default {
    name: '',
  
  }
</script>