<template>
<v-layout justify-center align-center fill-height>
 <v-form ref="form" v-model="valid" lazy-validation class="login-form">
   <span>{{error}}</span>
   <v-text-field
    v-model="email"
    :rules=[]
    name="email"
    label="Email"
    required
   ></v-text-field>
   <v-text-field v-if="action === 'register'"
    v-model="username"
    name="username"
    label="Username"
   ></v-text-field>
   <v-text-field
    v-model="password"
    :type="'password'"
    name="password"
    label="Password"
    required
   ></v-text-field>
   <v-btn class="blue white--text" large @click="submit('login')" v-if="action === 'login'">Inloggen</v-btn>
   <v-btn large @click="action = 'register'" v-if="action === 'login'">Registeren</v-btn>
   <v-btn class="blue white--text" large @click="submit('login')" v-if="action === 'register'">Registeren</v-btn>
 </v-form>
 </v-layout>
</template>

<script>
  import * as howtotestapi from "@/services/api/howtotestapi";
  export default{
    data: function(){
      return {
        action: 'login',
        email: '',
        password: '',
        username: '',
        valid: true,
        error: ''
      }
    },
    methods: {
      submit: function(action){
        let self = this;
        if(self.action === "login")
        howtotestapi.loginUser({email: self.email, password: self.password})
          .then(json=>{
            if(json.user.username && json.user.email) {
              self.$root.$emit("loggedIn");
              this.$store.dispatch("user/loginUser", json.user);
              this.$router.push(this.$router.currentRoute.query.from || '/');
            }else{
              this.error = json.msg;
            }
          }).catch(err=>{console.error(err); this.error="Inloggen is mislukt, probeer het later opnieuw"});
        if(self.action === "register"){
          howtotestapi.registerUser({email: self.email, password: self.password, username: self.username})
            .then(json=>{
                if(json.user.username && json.user.email){
                  this.$store.dispatch("user/loginUser", json.user);
                  this.$router.push({name: "home"});
                }else{
                  this.error = json.msg;
                }
            }).catch(err=>{console.error(err); this.error = "Registreren is mislukt, probeer het later opnieuw"});
        }
      },
      clear: function(){
        this.email = '';
        this.password = '';
      }
    }
  }
</script>

<style scoped>
.login-form {
  padding: 15px;
  width:75%;
}
</style>
