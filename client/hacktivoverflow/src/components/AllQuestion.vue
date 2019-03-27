<template>
  <div class="container">
    <div class="row">
      <div class="mt-2 col-sm-12" v-for="(question, index) in questions" :key="index">
        <div class="card mt-2 col-sm-12">
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
                  <button class="btn btn-outline-info btn-sm">Show</button>
                </router-link>
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
    return {};
  },
  methods: {},
  created() {
    this.getAllQuestion();
  },
  computed: {
    ...mapState(["questions", "answers"])
  },
  methods: {
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
            path: `/`
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
    ...mapMutations(["getAllQuestion", "getDetail"])
  }
};
</script>