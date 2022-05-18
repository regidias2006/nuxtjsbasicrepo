<template>
  <v-main>
    <v-card class="main-bg">
      <v-toolbar class="detail-bg" elevation="4">
        <v-card-title>Qustionário Flex - Da Vinci Automation</v-card-title>
      </v-toolbar>
      <v-card-text>
        <v-row class="mt-8">
          <v-col cols="6">
            <v-card class="ma-10 login-card detail-bg" elevation="10">
              <form @submit.prevent="submit" class="ma-10 pa-5">
                <v-card-title>Participar do Quiz!</v-card-title>
                <v-card-text>
                  <v-text-field
                    v-model="name"
                    label="Nome"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="workday"
                    label="Workday"
                    required
                  ></v-text-field>
                  <v-btn rounded class="mr-4" @click="submit" color="success">
                    Entrar
                  </v-btn>
                </v-card-text>
              </form>
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-card class="ma-10" outlined color="transparent">
              <v-card-title> Sobre o Quiz Da Vinci! </v-card-title>

              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title
                    >Quanto mais rápido Melhor!</v-list-item-title
                  >
                  <v-list-item-subtitle
                    >Responda de forma ágil, além da resposta correta <br />
                    contabilizamos o tempo de sua
                    resposta.</v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>

              <v-list-item three-line>
                <v-list-item-content>
                  <v-list-item-title>Que tipo de questões?</v-list-item-title>
                  <v-list-item-subtitle> Automação </v-list-item-subtitle>
                  <v-list-item-subtitle> Programação </v-list-item-subtitle>
                  <v-list-item-subtitle>
                    Conhecimentos gerais
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-spacer></v-spacer>
              <div class="d-flex justify-center">
                <v-img max-width="300px" src="/img/Logo.png"> </v-img>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-main>
</template>

<script>
export default {
  data: function () {
    return {
      name: "",
      workday: 0,
    };
  },
  methods: {
    submit() {
      var data = {
        name: this.name,
        workday: this.workday,
      };
      this.createUserQuiz(data).then((response) => {
        console.log(response);

        this.$router.push({ name: "quiz" });
      });
    },
    async createUserQuiz(data) {
      const payload = {
        link: "/User",
        data: data,
      };

      let result = await this.$store.dispatch("shop/users/create", payload);
      return result;
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
.login-card{
    border-radius: 29px;    
}
.main-bg {
  background: rgb(131 58 180 / 64%);
  background: linear-gradient(
    90deg,
    rgb(131 58 180 / 69%) 0%,
    rgb(253 29 29 / 64%) 50%,
    rgb(252 176 69 / 61%) 100%
  );
}
</style>