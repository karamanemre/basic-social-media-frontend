import axios from "axios";

const baseUrl=process.env.REACT_APP_USER_BASE_URL_PATH

export default class UserServices {


  add(user) {
    return axios.post(`${baseUrl}/add`, user);
  }

  login(credential) {
    return axios.post(`/api/auth/authenticationHandle`,{},{ auth: credential });
  }

  changeLanguage(language) {
    return (axios.defaults.headers["accept-language"] = language);
  }

  getAllUsers() {
    return axios.get(`${baseUrl}/getAllUsers`);
  }

  getAllUsersWithPage(data) {
    const {pageNo,pageSizeNo} = data
    return axios.get(`${baseUrl}/getAllUsersWithPage?pageNo=${pageNo}&pageSize=${pageSizeNo}`);
  }
}
