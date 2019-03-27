<template>
  <div class="container">
    <div class="row" id="AddQuestion">
      <div class="mt-5 col-sm-12">
        <form @submit.prevent="addQuest">
          <input type="text" v-model="title" placeholder="Title" class="col-sm-12" required>
          <ckeditor :editor="editor" v-model="description"></ckeditor>
          <button class="btn btn-lg btn-primary btn-block text-uppercase mt-3" type="submit">Post</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import Axios from "axios";
import Vue from "vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const baseUrl = "http://localhost:3000";

export default {
  name: "AddQuestion",
  data() {
    return {
      editor: ClassicEditor,
      title: "",
      description: ""
    };
  },
  methods: {
    addQuest() {
      let Quest = {
        title: this.title,
        description: this.description
      };
      Axios.post(`${baseUrl}/questions`, Quest, {
        headers: { token: localStorage.getItem("token") }
      })
        .then(response => {
          this.title = "";
          this.description = "";
          this.$router.push({
            path: "/"
          });
        })
        .catch(err => {
          Swal.fire({
            title: err.response.message,
            animation: false,
            customClass: {
              popup: "animated tada"
            }
          });
        });
    },
    ...mapMutations(["getAllQuestion"])
  },
  computed: {}
};
</script>