<template>
  <v-app>
    <h1>Cadastro de Tipos</h1>
    <hr />
    <v-data-table
      :headers="headers"
      :items="questions"
      sort-by="calories"
      class="elevation-1 mt-8"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>My CRUD</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="800px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                New Item
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col class="d-flex" cols="12" sm="6">
                      <v-select
                        v-model="editedItem.type_id"
                        :items="types"
                        item-text="title"
                        item-value="id"
                        label="Tipos de perguntas"
                      >
                      </v-select>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" md="12">
                      <v-textarea
                        outlined
                        v-model="editedItem.question"
                        name=""
                        label="Pergunta"
                        :value="editedItem.question"
                      ></v-textarea>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize"> Reset </v-btn>
      </template>
    </v-data-table>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "pergunta",
        align: "start",
        sortable: false,
        value: "question",
      },
      {text: 'Tipo Id', value: 'type_id'},
      { text: "Actions", value: "actions", sortable: false },
    ],
    questions: [],
    types: [],
    editedIndex: -1,
    editedItem: {
      type_id: 0,
      question: "",
    },
    defaultItem: {
      type_id: 0,
      question: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
    this.getAllTypes();
  },

  methods: {
    getAllTypes() {
      const payload = {
        link: "/QuestionType",
      };

      this.$store.dispatch("shop/types/getAll", payload).then((res) => {
        return (this.types = res.data.obj);
      });
    },

    initialize() {
      const payload = {
        link: "/QuestionStore",
      };

      this.$store.dispatch("shop/questions/getAll", payload).then((res) => {
        return (this.questions = res.data.obj);
      });
    },

    editItem(item) {
      this.editedIndex = this.questions.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.types.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      var index = this.questions
        .map((item) => item.id)
        .indexOf(this.editedIndex);

      const payload = {
        id: this.editedItem.id,
        link: '/QuestionStore/'
      };

      this.$store.dispatch("shop/questions/delete", payload).then((res) => {
        this.questions.splice(index, 1);
      });

      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        var index = this.editedIndex;

        const payload = {
          id: this.editedItem.id,
          data: this.editedItem,
          link: '/QuestionStore/'
        };

        this.$store
          .dispatch("shop/questions/edit", payload)
          .then((response) => {
            Object.assign(this.questions[index], response.data.obj);
          });
      } else {
        const payload = {
          data: this.editedItem,
          link: '/QuestionStore'
        };

        this.$store
          .dispatch("shop/questions/create", payload)
          .then((response) => {
            this.questions.push(response.data.obj);
          });
      }
      this.close();
    },
  },
};
</script>

<style>
</style>