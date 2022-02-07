<template>
  <v-container fluid>
    <!-- <p>{{ artist }}</p>
    <ul v-if="albums && albums.length > 0">
      <li v-for="(album, index) in albums" :key="index">{{album.collectionName}}</li>
    </ul> -->
      <!-- :item-key="item.releaseDate" -->
    <v-data-iterator
      v-if="albums && albums.length > 0"
      :items="albums"
      hide-default-footer
    >
      <template v-slot:default="props">
        <v-row>
          <v-col
            :key="item.releaseDate"
            v-for="item in props.items"
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
import { mapActions } from "vuex";
// import ItunesMusicList from "../components/ItunesMusicList.vue";
// import { itunesMusicService } from "../services";
// import { mapActions } from 'vuex'

export default {
  name: "Music",
  // components: {
  //   ItunesMusicList,
  // },
  data() {
    return {
      // albums: [],
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
        // this.$store.state.commit("setAlbums", newValue);
        this.getAlbums(newValue);
      },
    },
  },

  mounted() {},
  created() {
    // this.getAlbumsData();
    // this.getAlbums( this.$route.params.artist )
    // this.albums = this.$store.state.albums;
  },
  methods: {
    ...mapActions(["getAlbums"]),
    // async getAlbumsData() {
    //   itunesMusicService.albumsFromItunes(this.$route.params.artist).then(
    //     ((albums) => {
    //       console.log("albums", albums);
    //       this.$set(this, "albums", albums);
    //     }).bind(this)
    //   );
    // },
  },
};
</script>
