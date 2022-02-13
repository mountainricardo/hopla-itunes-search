import Vue from "vue";
import Vuex from "vuex";
import { itunesMusicService } from "../services";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    albums: [],
  },
  mutations: {
    setAlbums(state, albums) {
      state.albums = albums;
    },
    resetAlbums(state) {
      state.albums = [];
    },
  },
  actions: {
    async getAlbums({ commit }, artist) {
      try {
        //
        const albums = await itunesMusicService.albumsFromItunes(artist);
        commit("setAlbums", albums);
      } catch (error) {
        console.error("getAlbums", error);
      }
    },
  },
  modules: {},
});
