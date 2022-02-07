<template>
  <v-container fluid style="padding: 1em">
    <v-data-iterator
      :items="albums"
      :items-per-page.sync="itemsPerPage"
      :page.sync="page"
      :search="search"
      hide-default-footer
    >
      <template v-slot:header>
        <v-toolbar dark color="blue darken-3" class="mb-1">
          <v-text-field
            v-model="search"
            clearable
            flat
            solo-inverted
            hide-details
            prepend-inner-icon="mdi-filter "
            label="Filter"
          ></v-text-field>
          <template v-if="$vuetify.breakpoint.mdAndUp">
            <v-spacer></v-spacer>
            <v-btn large depressed color="blue" :value="false" @click="backToSearch">
              <v-icon class="mr-2">mdi-arrow-u-right-bottom</v-icon>
              New Search
            </v-btn>
          </template>
        </v-toolbar>
      </template>

      <template v-slot:default="props">
        <v-row>
          <v-col
            v-for="item in props.items"
            :key="item.name"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card class="pt-2 pb-2 d-flex">
              <v-img width="100" :src="item.artworkUrl100" class="ml-2"></v-img>
              <v-list-item three-line>
                <v-list-item-content>
                  <v-list-item-title class="text-h6 mb-1" style="text-overflow: ellipsis;">
                    {{ item.collectionName }}
                  </v-list-item-title>
                  <v-list-item-subtitle>{{
                    item.artistName
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-divider></v-divider>
            </v-card>
          </v-col>
        </v-row>
      </template>

      <template v-slot:footer>
        <v-row class="mt-2" align="center" justify="center">
          <span class="grey--text">Items per page</span>
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                dark
                text
                color="primary"
                class="ml-2"
                v-bind="attrs"
                v-on="on"
              >
                {{ itemsPerPage }}
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(number, index) in itemsPerPageArray"
                :key="index"
                @click="updateItemsPerPage(number)"
              >
                <v-list-item-title>{{ number }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-spacer></v-spacer>

          <span class="mr-4 grey--text">
            Page {{ page }} of {{ numberOfPages }}
          </span>
          <v-btn
            fab
            dark
            color="blue darken-3"
            class="mr-1"
            @click="formerPage"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn fab dark color="blue darken-3" class="ml-1" @click="nextPage">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Music",
  data() {
    return {
      itemsPerPageArray: [6, 9, 12, 24, 36, 64],
      search: "",
      page: 1,
      itemsPerPage: 9,
    };
  },
  computed: {
    artist: {
      get: function () {
        return this.$route.params.artist;
      },
    },
    albums: {
      get: function () {
        return this.$store.state.albums;
      },
      set: function (newValue) {
        this.getAlbums(newValue);
      },
    },
    numberOfPages() {
      return Math.ceil(this.albums.length / this.itemsPerPage);
    },
  },
  methods: {
    ...mapActions(["getAlbums"]),
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1;
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1;
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number;
    },
    backToSearch() {
      this.$router.push({ name: "Home"});
    }
  },
};
</script>
