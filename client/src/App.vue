<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" temporary app>
      <v-list dense>
        <v-list-tile flat to="/">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile flat to="/results">
          <v-list-tile-action>
            <v-icon>book</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Testresultaten</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar dark prominent color="primary">
      <v-toolbar-side-icon @click.stop="drawer = !drawer" class="hidden-sm-and-up"></v-toolbar-side-icon>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat to="/">
          <v-icon>home</v-icon>Home
        </v-btn>
        <v-btn flat to="/results">
          <v-icon>book</v-icon>Testresultaten
        </v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <img
        src="http://172.31.15.35:3000/images/logo/logo.png"
        class="App-Logo align-center"
        alt="logo"
        title="logo"
      >
    </v-toolbar>
    
    <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: null
  })
};
</script>


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
