import axios from "axios";

const basePath = process.env.REACT_APP_USER_FLOWCONTROLLER_BASE_URL_PATH;

export default class FlowService{

    add(flow,credential){
        return axios.post(`${basePath}/add`,flow);
    }

    getAll(pageNo,pageSize){
        return axios.get(`${basePath}/getAll?pageNo=${pageNo}&pageSize=${pageSize}`);
    }

    getAllByUsername(username,pageNo,pageSize){
        return axios.get(`${basePath}/getAll/${username}?pageNo=${pageNo}&pageSize=${pageSize}`);
    }

    getFlowCount(id){
        return axios.get(`${basePath}/findNewPosts/${id}`);
    }

    getFlowIdGreaterThan(id){
        return axios.get(`${basePath}/findByIdGreaterThan/${id}`);
    }

    deleteById(id){
        return axios.delete(`${basePath}/deleteById?id=${id}`);
    }
}
