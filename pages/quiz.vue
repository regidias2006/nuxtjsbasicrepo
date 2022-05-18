<template>
  <v-main class="">
    <v-card class="main-bg">
      <v-toolbar class="detail-bg" elevation="4">
        <v-row>
          <v-col cols="6">
            <v-card-title> Quiz Da Vinci Team:</v-card-title>
          </v-col>
          <v-col cols="6">
            <div class="d-flex justify-end pa-4">
              <v-chip color="orange" class="">
                Minha Pontuação:
                <h2>{{ User.Score.toFixed(2) }}</h2>
              </v-chip>
            </div>
          </v-col>
        </v-row>
      </v-toolbar>
      <v-divider></v-divider>

      <div v-if="!endquiz">
        <v-card-title> Questão sobre:</v-card-title>
        <v-card-subtitle>{{
          currentQuestion.title ? currentQuestion.title : ""
        }}</v-card-subtitle>

        <v-card-text class="ma-10">
          <v-row>
            <v-col cols="6">
              <h2>
                {{ currentQuestion.question ? currentQuestion.question : "" }}
              </h2>

              <v-radio-group :disabled="showResult" v-model="selected">
                <template v-slot:label>
                  Selecione a resposta <strong>correta</strong>
                </template>
                <v-radio v-for="(option, id) in options" :key="id" :value="id"
                  ><template v-slot:label>
                    <span>{{ option.text }}</span>
                  </template>
                </v-radio>
              </v-radio-group>
              <v-spacer></v-spacer>
              <v-btn
                :disabled="answerbtn"
                color="success"
                v-on:click="validateAnswer(selected)"
                >Responder
              </v-btn>
              <v-btn
                v-if="(showResult)"
                :disabled="nextbtn"
                color="primary"
                v-on:click="getCurrentQuestion(currentQuestion.index)"
                >Próxima</v-btn
              >
              <v-btn
                v-if="nextbtn == true && answerbtn == true"
                color="primary"
                v-on:click="endquiz = true"
              >
                Finalizar Quiz
              </v-btn>
              <v-spacer></v-spacer>
              <div>
                <!-- <a class="u-link-white" href="#" @click="toggleTimer">
                {{ hours }} : {{ minutes }} : {{ seconds }} - {{ second }}
              </a> -->
              </div>
            </v-col>
            <v-col cols="6">
              <div v-if="showResult" class="feedback">
                <v-chip v-if="answerResult.result" color="blue pa-5">
                  <h1 style="font-size: 2rem">Acertou</h1>
                </v-chip>
                <v-chip v-if="!answerResult.result" color="orange pa-5">
                  <h1 style="font-size: 2rem">Errou</h1>
                </v-chip>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </div>
      <div v-if="endquiz">
        <v-row>
          <v-col cols="6">
            <v-card outlined color="transparent">
          <v-card-text class="ma-10 detail-bg text-center">
             <v-chip color="orange pa-5 mt-5">
            <h1  style="font-size: 2rem" class="">Sua pontuação final é: {{ User.Score.toFixed(2) }}</h1>
            </v-chip>
            <div class="d-flex justify-center">
               <v-img max-width="500px" src="/img/Logo.png"> </v-img>
            </div>
           <div>
             
              <h1>Obrigado por participar!</h1>
           
           </div>
           <div class="mt-5">
              <v-btn rounded href="/introduction">
              Finalizar
            </v-btn>
           </div>
           
           
          </v-card-text>
        </v-card>
          </v-col>
          <v-col cols="6"></v-col>
        </v-row>
        
      </div>
    </v-card>
  </v-main>
</template>

<script>
export default {
  data: function () {
    return {
      second: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isRunning: false,
      interval: null,
      radios: "Duckduckgo",
      showResult: false,
      answerbtn: false,
      nextbtn: false,
      currentQuestion: {},
      questions: [],
      options: [],
      selected: null,
      answerResult: {},
      scoreSession: 0,
      endquiz: false,
      User: {
        UserId: 0,
        Score: 0,
        questionInitialTime: 0,
        questionEndTime: 0,
        timeInterval: 0,
        questionId: 0,
        QuestionScore: 0,
        isCorrect: 0,
      },
      questionDataAnalyses: [],
      questionsStore: [],
      types: [],
      alternatives: [],
    };
  },
  methods: {
    async initiate() {
      let types = await this.getAllTypes();
      let alternatives = await this.getAllAlternatives();
      let questions = await this.getAllQuestions();

      let data = [];
      data["types"] = types;
      data["alternatives"] = alternatives;
      data["questions"] = questions;

      return data;
    },

    async getAllQuestions() {
      const payload = {
        link: "/QuestionStore",
      };

      let result = await this.$store.dispatch("shop/questions/getAll", payload);

      return result.data.obj;
    },
    async getAllTypes() {
      const payload = {
        link: "/QuestionType",
      };

      let result = await this.$store.dispatch("shop/types/getAll", payload);

      return result.data.obj;
    },
    async getAllAlternatives() {
      const payload = {
        link: "/alternatives",
      };

      let result = await this.$store.dispatch(
        "shop/alternatives/getAll",
        payload
      );

      return result.data.obj;
    },
    getQuestions() {
      this.questions = [];

      if (this.types) {
        this.types.forEach((x) => {
          var questions = this.questionsStore.filter(
            (item) => item.type_id === x.id
          );

          var i = 0;
          while (i < 2) {
            var rnd = Math.floor(Math.random() * questions.length);

            if (questions[rnd]) {
              if (
                this.questions.length > 0 &&
                this.questions.filter((q) => q.id === questions[rnd].id)
              ) {
                i++;
              }

              if (
                this.questions.filter((q) => q.id === questions[rnd].id)
                  .length <= 0
              ) {
                var newObj = {
                  ...this.types.find((x) => x.id === questions[rnd].type_id),
                  ...questions[rnd],
                };
                this.questions.push(newObj);

                i++;
              }
            }

            if (!questions[rnd]) {
              i++;
            }
          }
        });
      }
      this.toggleTimer();
    },
    getCurrentQuestion(current) {
      if (this.questions && current < this.questions.length) {
        this.currentQuestion = this.questions.slice(current, current + 1)[0];
      }

      if (this.currentQuestion) {
        this.answerbtn = false;
        this.currentQuestion["index"] = current + 1;

        this.selected = null;
        this.answerResult = {};
        this.getOptions(this.currentQuestion.id);

        this.questionInitialTime = this.second;
        this.User.questionInitialTime = this.second;
      }

      if (this.questions && current >= this.questions.length) {
        this.answerbtn = true;
        this.nextbtn = true;
      }
    },
    getOptions(questionId) {
      this.options = this.alternatives.filter(
        (x) => x.questionStore_id === questionId
      );
    },
    validateAnswer(val) {
      this.showResult = true;
      this.answerbtn = true;

      if (this.options[val]) {
        this.User.isCorrect = this.options[val].isCorrect;
        this.setScore(this.options[val].score);
      }
    },
    setScore(score) {
      //definindo 20 sec como base de desconto quanto mais próximo de 3 mais se desconta
      var factor = score / 21.00;

      //tempo de resposta do usuário
      var answerTime = this.second - this.questionInitialTime;

      //com o tempo que se passou sabe-se quanto pontos foram perdidos
      var discountScore = answerTime * factor;

      //com valor final fazemos o desconto
      var finalScore = score - discountScore;

       console.log('final score:',  answerTime * factor,  answerTime, factor)

      //caso o desconto exceda 50% do score colocamos um valor padrão para não zerar o score.
      if (discountScore / score >= 0.76263) {
        finalScore = score / 2.6;
      }
     
      this.User.timeInterval = answerTime;
      this.User.questionId = this.currentQuestion.id;
      this.User.QuestionScore = finalScore;
      this.User.questionEndTime = this.second;

  

      this.User.Score = this.User.Score + finalScore;

        const payload = {
          data: this.User,
          link: '/UserData'
        };

      this.$store
          .dispatch("shop/userdata/create", payload)
          .then((response) => {
            console.log('Dado inserido no banco: ', this.User)
          });

      console.log(this.User);
    },
    toggleTimer() {
      if (this.isRunning) {
        clearInterval(this.interval);
        console.log("timer stops");
      } else {
        this.interval = setInterval(this.incrementTime, 1000);
      }
      this.isRunning = !this.isRunning;
    },
    incrementTime() {
      this.second = this.second + 1.0;
      this.hours = Math.floor(this.second / 3600);
      this.minutes = Math.floor((this.second - this.hours * 3600) / 60);
      this.seconds = this.second - this.hours * 3600 - this.minutes * 60;
    },
  },
  created() {
    this.initiate().then((response) => {
      this.types = response.types;
      this.questionsStore = response.questions;
      this.alternatives = response.alternatives;
      this.User.UserId = this.$store.state.shop.users.Users.id
      console.log(this.$store.state.shop.users.Users.id)
      this.getQuestions();
      this.getCurrentQuestion(0);
     
    });

    //this.getOptions();
  },

  watch: {
    selected: function (val) {
      this.showResult = false;
      if (this.options[val]) {
        if (this.options[val].isCorrect) {
          this.answerResult.result = true;
          this.answerResult.text = "Acertou";
        } else {
          this.answerResult.result = false;
          this.answerResult.text = "Errou";
        }
      }
    },
  },
};
</script>

<style scoped>
.detail-bg {
  background: rgb(24, 115, 144);
  background: linear-gradient(
    50deg,
    rgba(24, 115, 144, 1) 0%,
    rgba(61, 232, 187, 1) 78%
  );
}
.login-card {
  border-radius: 29px;
}
.main-bg {
  background: rgb(131 58 180 / 64%);
  background: url(https://ouch-cdn2.icons8.com/6xR7hLv0Cu7cNZTYf-TWggmFVxX_Cr_54b2S_KF_SvE/rs:fit:912:912/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvOTU1/LzQ1MThiYWQ2LTM5/ZGUtNDdjMC04YmZi/LWIyYmIzODkzMzkz/Zi5zdmc.png),
    linear-gradient(
      90deg,
      rgb(131 58 180 / 69%) 0%,
      rgb(253 29 29 / 64%) 50%,
      rgb(252 176 69 / 61%) 100%
    );
  background-repeat: no-repeat;
  background-position-x: right;
  background-attachment: fixed;
  background-blend-mode: normal;
}
.feedback {
  position: relative;
  right: 0px;
  top: 213px;
}
</style>
