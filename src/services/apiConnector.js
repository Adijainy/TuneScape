import axios from "axios";

const axiosInstance = axios.create({});

export const apiConnector = (method, url, body, header, params) => {
    return axiosInstance({
        method: `${method}`,
        url: `${url}`,
        data: body ? body : null,
        headers: header ? header : null,
        params: params ? params : null
    })
}