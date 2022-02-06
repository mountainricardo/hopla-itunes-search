<template>
  <v-container fluid>
    <v-data-iterator
      :items="albums.length > 0 ? albums : []"
      item-key="collectionId"
      hide-default-footer
    >
      <template v-slot:default="items">
        <v-row>
          <v-col
            v-for="item in items"
            :key="item.collectionId"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card>
              <v-card-title>
                <h4>{{ item.collectionName }}</h4>
              </v-card-title>
              <v-divider></v-divider>
            </v-card>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
// import ItunesMusicList from "../components/ItunesMusicList.vue";
import { itunesMusicService } from "../services";

export default {
  name: "Music",
  // components: {
  //   ItunesMusicList,
  // },
  data() {
    return {
      albums: [],
    };
  },
  computed: {
    artist: {
      get: function () {
        return this.$route.params.artist;
      },
    },
  },
  created() {
    this.getAlbumsData();
  },
  methods: {
    async getAlbumsData() {
      itunesMusicService.albumsFromItunes(this.$route.params.artist).then(
        ((albums) => {
          console.log("albums", albums);
          this.$set(this, "albums", albums);
        }).bind(this)
      );
    },
  },
};
</script>
