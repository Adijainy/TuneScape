import { Axios } from "axios";

const axiosInstance = Axios.create({});

export const apiConnector = (method, url, body, header, params) => {
    return axiosInstance({
        method: `${method}`,
        url: `${url}`,
        body: body,
        headers: header ? header : null,
        params: params ? params : null
    })
}