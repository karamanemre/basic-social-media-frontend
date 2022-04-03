import axios from "axios";

const basePath = process.env.REACT_APP_FLOW_IMAGE_CONTROLLER_BASE_URL_PATH;

export default class FlowImageService{
    add(imageUrl){
        return axios.post(`${basePath}/add`,imageUrl);
    }
}
