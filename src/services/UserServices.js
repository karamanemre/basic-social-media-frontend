import axios from "axios";

export default class UserServices {
  add(user) {
    return axios.post(`${process.env.REACT_APP_USER_BASE_URL_PATH}/add`, user);
  }

  //ikinci süüslü paranteze body kısmı gelir
  // 3.yere doğrulama gerektiren yani password ve username gelecek
  login(credential) {
    console.log(credential);
    return axios.post(`/api/auth/login`, credential);
  }
  // { auth: credential },

  changeLanguage(language) {
    return (axios.defaults.headers["accept-language"] = language);
  }
}
