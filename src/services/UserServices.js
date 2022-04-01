import axios from "axios";

const basePath = process.env.REACT_APP_USER_USERCONTROLLER_BASE_URL_PATH;

export default class UserServices {
  add(user) {
    return axios.post(`${basePath}/add`, user);
  }

  login(credential) {
    return axios.post(`/api/auth/authenticationHandle`,{},{ auth: credential });
  }

  update(user,credential) {
    return axios.put(`${basePath}/update`,user,{ auth: credential });
  }

  changeLanguage(language) {
    return (axios.defaults.headers["accept-language"] = language);
  }

  getAllUsers() {
    return axios.get(`${basePath}/getAllUsers`);
  }

  getUser(username) {
    return axios.get(`${basePath}/getByUsername/${username}`);
  }

  getUserById(id) {
    return axios.get(`${basePath}//getById/${id}`);
  }
}
