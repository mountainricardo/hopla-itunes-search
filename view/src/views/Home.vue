<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-5" cols="12">
        <h2 class="headline font-weight-bold mb-3" style="color: blue">
          Search ITunes for Music Albums
        </h2>
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col cols="6" offset="3">
        <form @submit.prevent="handleSubmit">
          <v-text-field
            :rules="rules"
            v-model="artist"
            name="artist"
            label="Artist Name"
            placeholder="Artist Name"
            :class="{ 'is-invalid': submitted && !artist }"
            outlined
          >
          </v-text-field>

          <v-btn color="primary" type="submit" :disabled="!artist">
            <v-icon color="white">mdi-magnify</v-icon>
            <span class="ml-3">Search</span>
          </v-btn>
        </form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from "vuex"
export default {
  name: "Home",

  data: () => ({
    rules: [(value) => !!value || "Required."],
    artist: "",
    submitted: false,
  }),
  methods: {
    ...mapActions(["getAlbums"]),
    handleSubmit: async function () {
      this.submitted = true;
      const { artist } = this;
      if (artist) {
        const fullName = artist.split(" ").join("+");
        console.log("Artist Name", fullName);
        this.getAlbums(fullName);
        await this.$nextTick()
        this.$router.push({ name: "Music", params: { artist: fullName } });
      }
    },
  },

};
</script>
