<template>
  <div class="container">
    <div class="row" id="updateAnswer">
      <div class="mt-5 col-sm-12">
        <form @submit.prevent="updateAns">
          <ckeditor :editor="editor" v-model="answer"></ckeditor>

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
  name: "updateAnswer",
  data() {
    return {
      editor: ClassicEditor,
      answer: ""
    };
  },
  created() {
    Axios.get(`${baseUrl}/answers/${this.$route.params.id}`, {
      headers: { token: localStorage.getItem("token") }
    })
      .then(({ data }) => {
        this.answer = data.answer;
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
        answer: this.answer
      };
      Axios.put(`${baseUrl}/answers/${this.$route.params.id}`, newAns, {
        headers: { token: localStorage.getItem("token") }
      })
        .then(response => {
          this.answer = "";
          this.$router.push({
            path: `/questions/${this.$route.params.questionId}`
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