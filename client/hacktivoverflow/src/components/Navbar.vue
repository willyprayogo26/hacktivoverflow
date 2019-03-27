<template>
  <nav class="navbar navbar-expand-sm navbar-light bg-light sticky-top">
    <a class="navbar-brand btn">Hacktiv Overflow</a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarTogglerDemo02"
      aria-controls="navbarTogglerDemo02"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarTogglerDemo02" v-if="isLogin == false">
      <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
        <li class="nav-item active">
          <router-link to="/">
            <a class="nav-link btn">
              Home
              <span class="sr-only">(current)</span>
            </a>
          </router-link>
        </li>
      </ul>
      <ul class="navbar-nav ml-auto">
        <li class="nav-item mr-2">
          <router-link to="/register">
            <button
              type="button"
              class="btn btn-outline-primary my-2 my-sm-0"
              @click="getRegisForm"
            >Register</button>
          </router-link>
        </li>
        <li class="nav-item mr-2">
          <router-link to="/login">
            <button
              type="button"
              class="btn btn-outline-primary my-2 my-sm-0"
              @click="getLoginForm"
            >Login</button>
          </router-link>
        </li>
      </ul>
    </div>

    <div class="collapse navbar-collapse" id="navbarTogglerDemo02" v-if="isLogin == true">
      <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
        <li class="nav-item active">
          <router-link to="/">
            <a class="nav-link btn">
              Home
              <span class="sr-only">(current)</span>
            </a>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/myQuestion">
            <a class="nav-link btn">My Questions</a>
          </router-link>
        </li>
      </ul>
      <form class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2" type="search" placeholder="Search">
      </form>
      <router-link to="/addQuestion">
        <button
          type="button"
          class="btn btn-outline-primary my-2 my-sm-0 mr-2"
          data-toggle="modal"
          data-target="#exampleModal"
        >+Add Question</button>
      </router-link>
      <router-link to="/">
        <button
          type="button"
          class="btn btn-outline-primary my-2 my-sm-0"
          @click="getLoginForm"
        >Logout</button>
      </router-link>
    </div>
  </nav>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "navbar",
  data: () => ({}),
  created() {
    if (localStorage.getItem("token")) {
      this.getContent();
    }
  },
  computed: {
    ...mapState(["isLogin"])
  },
  methods: {
    ...mapMutations(["getRegisForm", "getLoginForm", "getContent"])
  }
};
</script>