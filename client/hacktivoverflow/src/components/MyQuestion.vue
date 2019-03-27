<template>
  <div class="container">
    <div class="row">
      <div class="mt-2 col-sm-12" v-for="(question, index) in questions" :key="index">
        <div class="card mt-2 col-sm-12" v-if="user == question.userId.email">
          <div class="card-body">
            <h5 class="card-title">{{question.title}}</h5>
            <p class="card-text" v-html="question.description"></p>
            <footer class="blockquote-footer">
              Asked by:
              <cite title="Source Title">{{question.userId.email}}</cite>
            </footer>
            <footer class="footer">
              <a class="btn" @click="votes('upvote', question._id)">
                <i class="far fa-thumbs-up"></i>
              </a>
              <a class="btn" @click="votes('downvote', question._id)">
                <i class="far fa-thumbs-down"></i>
              </a>
              {{showVotes(index).status}}
              <span class="float-right">
                <router-link :to="`/questions/${question._id}`">
                  <button class="btn btn-outline-info btn-sm mr-2">Show</button>
                </router-link>
                <router-link :to="`/myQuestion/update/${question._id}`">
                  <button class="btn btn-outline-warning btn-sm mr-2">Edit</button>
                </router-link>
                <button
                  class="btn btn-outline-danger btn-sm"
                  @click="deleteQuestion(question._id)"
                >Delete</button>
              </span>
            </footer>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import Axios from "axios";

const baseUrl = "http://localhost:3000";

export default {
  name: "AllQuestion",
  data() {
    return {
      user: localStorage.getItem("email")
    };
  },
  methods: {},
  created() {
    this.getAllQuestion();
  },
  computed: {
    ...mapState(["questions", "answers"])
  },
  methods: {
    deleteQuestion: function(id) {
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
          Axios.delete(`${baseUrl}/questions/${id}`, {
            headers: { token: localStorage.getItem("token") }
          })
            .then(response => {
              this.getAllQuestion();
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
    },
    votes: function(state, questionId) {
      let vote = {
        status: state
      };
      Axios.put(`${baseUrl}/questions/${questionId}/votes`, vote, {
        headers: { token: localStorage.getItem("token") }
      })
        .then(({ data }) => {
          this.getAllQuestion();
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
    },
    showVotes(index) {
      if (this.questions[index].votes.length) {
        return this.questions[index].votes.reduce((a, b) => {
          return {
            status: a.status + b.status
          };
        });
      } else {
        return { status: 0 };
      }
    },
    ...mapMutations(["getAllQuestion"])
  }
};
</script>