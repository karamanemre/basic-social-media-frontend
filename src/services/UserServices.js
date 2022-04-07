import axios from "axios";
import SecureLS from "secure-ls";

const secureLS = new SecureLS();
const basePath = process.env.REACT_APP_USER_USERCONTROLLER_BASE_URL_PATH;

export default class UserServices {

  add(user) {
    return axios.post(`${basePath}/add`, user);
  }

  login(credential) {
    return axios.post(`/api/auth/authenticationHandle`,credential)
  }

  logout(){
    delete axios.defaults.headers['Authorization'];
  }

  update(user,credential) {
    return axios.put(`${basePath}/update`,user);
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

  setAxiosHeader(token){
    let signature = `Bearer ${token})}`
    secureLS.set("authorization",signature)
    axios.defaults.headers['Authorization'] = signature
  }
}
