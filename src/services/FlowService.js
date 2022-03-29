import axios from "axios";

const basePath = process.env.REACT_APP_USER_FLOWCONTROLLER_BASE_URL_PATH;

export default class FlowService{

    add(flow,credential){
        return axios.post(`${basePath}/add`,flow,{auth:credential});
    }

    getAll(pageNo,pageSize){
        return axios.get(`${basePath}/getAll?pageNo=${pageNo}&pageSize=${pageSize}`);
    }

    getAllByUsername(username,pageNo,pageSize){
        return axios.get(`${basePath}/getAll/${username}?pageNo=${pageNo}&pageSize=${pageSize}`);
    }

}