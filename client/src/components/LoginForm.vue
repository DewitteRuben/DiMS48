<template>
 <v-form ref="form" lazy-validation>
   <v-btn @click="action = action === 'login' ? 'register' : 'login'">{{action}}</v-btn>
   <span>{{msg}}</span>
   <v-text-field
    v-model="email"
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
   <v-btn @click="submit">{{action}}</v-btn>
   <v-btn @click="clear">clear</v-btn>
 </v-form>
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
        msg: ''
      }
    },
    methods: {
      submit: function(){
        console.log(this.email, this.password, this.valid);
        let self = this;
        if(self.action === "login")
        howtotestapi.loginUser({email: self.email, password: self.password})
          .then(json=>{
            if(json.user.username && json.user.email) {
              self.$root.$emit("loggedIn");
              this.$store.dispatch("user/loginUser", json.user);
              this.$router.push(this.$router.currentRoute.query.from || '/');
            }else{
              this.msg = json.msg;
            }
          }).catch(err=>{console.error(err); this.error="Inloggen mislukt, probeer later opnieuw"});
        if(self.action === "register"){
          howtotestapi.registerUser({email: self.email, password: self.password, username: self.username})
            .then(json=>{
                if(json.user.username && json.user.email){
                  this.msg = "Uw verzoek is aangevraagd.";
                }else{
                  this.msg = json.msg;
                }
            }).catch(err=>{console.error(err); this.error = "Registeren mislukt, probeer later opnieuw"});
        }
      },
      clear: function(){
        this.email = '';
        this.password = '';
      }
    }
  }
</script>
