<template>
  <div class="container">
    <div class="row d-flex justify-content-center">
      <div class="card mt-2 col-sm-12">
        <div class="card-body">
          <h5 class="card-title">{{title}}</h5>
          <p class="card-text" v-html="description"></p>
          <footer class="blockquote-footer">
            Asked by:
            <cite title="Source Title">{{email}}</cite>
          </footer>
        </div>
      </div>
      <div class="mt-2 col-sm-10" v-if="answers.length != 0">
        <h5>All answers:</h5>
      </div>
      <div class="card mt-2 col-sm-10" v-for="(answer, index) in answers" :key="index">
        <div class="card-body">
          <p class="card-text" v-html="answer.answer"></p>
          <footer class="blockquote-footer">
            Answer by:
            <cite title="Source Title">{{answer.userId.email}}</cite>
            <span class="float-right">
              <button
                class="btn btn-outline-danger btn-sm ml-2"
                @click="deleteAnswer(answer._id)"
                v-if="user == answer.userId.email"
              >Delete</button>
            </span>
            <span class="float-right">
              <router-link :to="`/questions/${$route.params.id}/${answer._id}`">
                <button class="btn btn-outline-info btn-sm" v-if="user == answer.userId.email">Edit</button>
              </router-link>
            </span>
          </footer>
        </div>
      </div>
      <div class="mt-2 col-sm-10">
        <h5>Your answer:</h5>
      </div>
      <div class="mt-2 col-sm-11">
        <form @submit.prevent="addAnswer">
          <ckeditor :editor="editor" v-model="answer"></ckeditor>

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
  name: "QuestionDetail",
  data() {
    return {
      title: "",
      description: "",
      email: "",
      answers: [],
      editor: ClassicEditor,
      answer: "",
      user: localStorage.getItem("email")
    };
  },
  methods: {},
  created() {
    this.getDetail();
  },
  computed: {},
  methods: {
    getDetail: function() {
      Axios.get(`${baseUrl}/questions/${this.$route.params.id}`)
        .then(({ data }) => {
          this.title = data.title;
          this.description = data.description;
          this.email = data.userId.email;
          this.answers = data.answers;
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
    addAnswer() {
      let Answer = {
        answer: this.answer
      };
      Axios.post(`${baseUrl}/answers/${this.$route.params.id}`, Answer, {
        headers: { token: localStorage.getItem("token") }
      })
        .then(response => {
          this.answer = "";
          this.getDetail();
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
    updateAnswer(id) {
      let newAnswer = {
        answer: this.answer
      };
      Axios.put(`${baseUrl}/answers/${id}`, newAnswer, {
        headers: { token: localStorage.getItem("token") }
      })
        .then(response => {
          this.answer = "";
          this.getDetail();
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
    deleteAnswer(id) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          Axios.delete(`${baseUrl}/answers/${id}`, {
            headers: { token: localStorage.getItem("token") }
          })
            .then(response => {
              this.getDetail();
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
      });
    }
  }
};
</script>