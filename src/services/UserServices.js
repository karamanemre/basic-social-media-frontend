import axios from "axios";

export default class UserServices {

  add(user) {
    return axios.post(`${process.env.REACT_APP_USER_BASE_URL_PATH}/add`, user);
  }
}
