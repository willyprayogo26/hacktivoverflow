<template>
  <div class="container">
    <div class="row" id="updateQuestion">
      <div class="mt-5 col-sm-12">
        <form @submit.prevent="updateAns">
          <input type="text" v-model="title" placeholder="Title" class="col-sm-12" required>
          <ckeditor :editor="editor" v-model="description"></ckeditor>

          <button class="btn btn-lg btn-primary btn-block text-uppercase mt-3" type="submit">Update</button>
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
  name: "updateQuestion",
  data() {
    return {
      editor: ClassicEditor,
      title: "",
      description: ""
    };
  },
  created() {
    Axios.get(`${baseUrl}/questions/${this.$route.params.id}`, {
      headers: { token: localStorage.getItem("token") }
    })
      .then(({ data }) => {
        this.title = data.title;
        this.description = data.description;
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
  methods: {
    updateAns() {
      let newAns = {
        title: this.title,
        description: this.description
      };
      Axios.put(`${baseUrl}/questions/${this.$route.params.id}`, newAns, {
        headers: { token: localStorage.getItem("token") }
      })
        .then(response => {
          this.question = "";
          this.$router.push({
            path: `/myQuestion`
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
    }
  },
  computed: {}
};
</script>