<template>
  <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
    <div class="card card-signin my-5">
      <div class="card-body">
        <h5 class="card-title text-center">Sign In</h5>
        <form class="form-signin" @submit.prevent="toLogin" method="POST">
          <div class="form-label-group">
            <input
              type="email"
              v-model="inputEmail"
              id="inputEmail"
              class="form-control"
              placeholder="Email address"
              required
              autofocus
            >
            <label for="inputEmail">Email address</label>
          </div>

          <div class="form-label-group">
            <input
              type="password"
              v-model="inputPassword"
              id="inputPassword"
              class="form-control"
              placeholder="Password"
              required
            >
            <label for="inputPassword">Password</label>
          </div>

          <button class="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Sign In</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import Axios from "axios";

const baseUrl = "http://localhost:3000";

export default {
  name: "LoginForm",
  data() {
    return {
      inputEmail: "",
      inputPassword: ""
    };
  },
  methods: {
    toLogin: function() {
      let User = {
        email: this.inputEmail,
        password: this.inputPassword
      };
      Axios.post(`${baseUrl}/login`, User)
        .then(response => {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("email", response.data.email);
          this.inputEmail = "";
          this.inputPassword = "";
          this.getContent();
          this.$router.push({
            path: "/"
          });
        })
        .catch(err => {
          Swal.fire({
            title: err.response.data.message,
            animation: false,
            customClass: {
              popup: "animated tada"
            }
          });
        });
    },
    ...mapMutations(["getContent"])
  }
};
</script>
