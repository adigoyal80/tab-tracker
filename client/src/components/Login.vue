// Register vue template

/* template defines input fields and button
  two-way binds email and password to state of template
  and adds event to click button and binds a method
*/
<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <div class="white elevation-2">
        <v-toolbar flat dense class="cyan" dark>
          <v-toolbar-title>Log In</v-toolbar-title>
        </v-toolbar>
            <div class="pl-4 pr-4 pt-2 pb-2">
              <v-text-field
                name="email"
                label="Email"
                v-model="email">
              </v-text-field>
              <br>
              <v-text-field
                name="password"
                label="Password"
                v-model="password">
              </v-text-field>
              <br>
              <div
                v-html="error"
                class="error">
              </div>
              <v-btn class="cyan"
                @click="login"
                dark
                >LOGIN
              </v-btn>
            </div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
// authentication service module which uses Api.js to register user
import AuthenticationService from '@/services/AuthenticationService'
export default {
  // delcaring model of state
  data () {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  methods: {
    // uses the authenticaiton method asynchronsly to register the user
    async login () {
      try {
        await AuthenticationService.login({
          email: this.email,
          password: this.password
        })
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.error {
  color: red;
}

</style>
