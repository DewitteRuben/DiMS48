<template>
  <v-app>
    <v-toolbar height="80px" dark color="primary">
      <v-toolbar-side-icon class="hidden-sm-and-up"></v-toolbar-side-icon>
      <!-- <v-toolbar-title class="white-text">How To Test Apps</v-toolbar-title> -->
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat to="/">
          <v-icon>home</v-icon>Home
        </v-btn>
        <v-btn flat to="/results">
          <v-icon>book</v-icon>Test Resultaten
        </v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <a href="https://www.howtotest.be/" target="_blank">
      <img
        src="http://172.31.15.35:3000/images/logo/logo.png"
        class="App-Logo align-center"
        alt="logo"
        title="logo"
      >
      </a>
    </v-toolbar>
    <router-view></router-view>
  </v-app>
</template>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

.App-Logo {
  height: 70%;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
