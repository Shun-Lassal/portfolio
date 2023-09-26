import { defineStore } from "pinia";
import { verifyJwtToken } from "@@/utils/tokenManagement";
export const useAuthStore = defineStore('auth', {
  state: () => ({
    jwtToken: null,
    user: null,
  }),

  getters: () => ({

    getTokenFromLocalStorage() {
      return localStorage.getItem('jwtToken');
    },

    getUserInfosFromToken(token) {
      return verifyJwtToken(token);
    },

    getUserInfos() {
      return this.user;
    }

  }),

  actions: () => ({

    setUserInfos(token) {
      const userInfos = getUserInfosFromToken(token);
      this.user.userId = userInfos.userId;
      this.user.username = userInfos.username;
      this.user.email = userInfos.email;
    },

    setToken(token) {
      this.jwtToken = token;
    },

    setTokenFromLocalStorage() {
      this.token = getTokenFromLocalStorage();
    }

  }),
})