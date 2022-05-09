<template>
  <v-app class="inspire">
    <v-divider></v-divider>

    <v-card class="pl-4">
      <v-card-title> Questão sobre:</v-card-title>
      <v-card-subtitle>{{ currentQuestion.title ? currentQuestion.title : "" }}</v-card-subtitle>

      <v-card-text>
        
       

        <h2>{{ currentQuestion.question ? currentQuestion.question : "" }}</h2>
        <p class="text-right">Minha Pontuação: {{ User.Score }}</p>
        <v-radio-group v-model="selected">
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
          :disabled="nextbtn"
          color="primary"
          v-on:click="getCurrentQuestion(currentQuestion.index)"
          >Próxima</v-btn
        >
        <span v-if="showResult">{{ answerResult.text }}</span>
      </v-card-text>
    </v-card>
  </v-app>
</template>

<script>
export default {
  data: function () {
    return {
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
      User: {
        Name: "",
        Score: 0,
        StartTime: "",
        EndTime: "",
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
                console.log("aqui nas 3 ", questions.length);
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

            if(!questions[rnd]){
              i++;
            }
          }
        });
      }
    },
    getCurrentQuestion(current) {
      if (this.questions && current < this.questions.length) {
        this.currentQuestion = this.questions.slice(current, current + 1)[0];
      }

      if (this.currentQuestion) {
        this.answerbtn = false;
        this.currentQuestion["index"] = current + 1;
        // console.log(this.questions && current, this.questions.length);
        this.selected = null;
        this.answerResult = {};
        this.getOptions(this.currentQuestion.id);
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
        this.setScore(this.options[val].score);
      }
    },
    setScore(score) {
      this.User.Score = this.User.Score + score;
    },
  },
  created() {
    this.initiate().then((response) => {
      this.types = response.types;
      this.questionsStore = response.questions;
      this.alternatives = response.alternatives;

      this.getQuestions();
      this.getCurrentQuestion(0);
      console.log("result final: ", response.types);
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
 
</style>
