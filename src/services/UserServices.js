import axios from "axios";

export default class UserServices {
  add(user) {
    return axios.post(`${process.env.REACT_APP_USER_BASE_URL_PATH}/add`, user);
  }

  login(credential) {
    return axios.post(`/api/auth/authenticationHandle`,{},{ auth: credential });
  }

  changeLanguage(language) {
    return (axios.defaults.headers["accept-language"] = language);
  }

  getAllUsers() {
    return axios.get(`${process.env.REACT_APP_USER_BASE_URL_PATH}/getAllUsers`);
  }
}
