import api from "../lib/axios";
import countries from "../lib/countries";
export default {
  register(data) {
    return api.post("/auth/signup", data);
  },
  registerThird(data) {
    return api.post("/auth/thirdsignup", data);
  },
  login(data) {
    return api.post("/auth/ownsignin", data);
  },
  authentication(data) {
    return api.post("/auth/thirdsignin", data);
  },
  getUserById(id) {
    return api.get(`/user/${id}`);
  },
  getAllUsers() {
    return api.get("/user/all");
  },
  deleteUserById(userId) {
    return api.delete(`/user/${userId}`);
  },
  reviveUser(id) {
    return api.post(`/user/revive/${id}`);
  },
  updateUserById(userId, userData) {
    return api.post(`/user/${userId}`, userData);
  },
  sendEmail(userData) {
    return api.post(`/auth/passwordcode`, userData);
  },
  changePassword(userData) {
    return api.post(`/user/password`, userData);
  },
  searchByEmail(data) {
    return api.post("/user/find", data);
  },
  checkthird(user) {
    return api.post("/auth/checkthird", user);
  },
  logout(user) {
    return api.post("/logout", user);
  },
  banUser(id) {
    return api.delete(`/user/ban/${id}`);
  },
  unBanUser(id) {
    return api.post(`/user/unBan/${id}`);
  },
  searchByName({ email }) {
    return api.get(`/user/search/?email=${email}`);
  },
  getAllGames() {
    return api.get(`/game/all`);
  },
  getGameById(id) {
    return api.get(`/game/${id}`);
  },
  postComment(data) {
    return api.post("/comment", data);
  },
  getAllComments(data) {
    return api.post("/comment/all", data);
  },
  filterComments(data) {
    return api.post("/comment/find", data);
  },
  deleteComment(id) {
    return api.delete(`/comment/${id}`);
  },
  findUserByEmail(data) {
    return api.post("/user/find", data);
  },
  // traer todas las cohortes
  getAllCohorts() {
    return api.get("/cohort/all");
  },

  // traer todos los grupos
  getAllGroups(cohort) {
    return api.get(`/group/all?cohort=${cohort}`);
  },

  // Rankings
  getGlobalRanking() {
    return api.get("/ranking/general");
  },
  getCohortRanking(cohort) {
    return api.get(`/ranking/cohort/${cohort}`);
  },
  getGroupRanking(cohort, group) {
    return api.get(`/ranking/group?cohort=${cohort}&group=${group}`);
  },
  //Para un usuario, total de puntos por juego y cantidad de veces que se jugó
  getRankingInGamesByUser(userID) {
    return api.get(`/ranking/ingames/${userID}`);
  },
  // total de phtos que obtuvo un usuario
  totalRankingOfUser(userID) {
    return api.get(`/ranking/total/${userID}`);
  },
  // cuenta un ranking para el juego de terceros
  // data debe ser {userID, gameID, cohort, group}
  countRankingThird(data) {
    return api.post("/ranking/count", data);
  },
  // devuelve el ranking para un juego
  gameRanking(gameID) {
    return api.get(`/ranking/game/${gameID}`);
  },

  // COUNTRIES
  getAllCountries() {
    return api.get("/country/all");
  },
  // para paypal
  getAllDonations(){
    return api.get('/payment/all-donations')
  }
};
