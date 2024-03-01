import { apiConnector } from "../apiConnector";

import { endpoints } from "../apis";


export async function createUser(user) {
    try {
        
        const result = await apiConnector("POST", endpoints.CREATE_USER, user, null, null);
        if(result.status === 500){
            return new Error("User not created");
        }
        console.log("CREATE USER", result.data);
        return result.data;
    } catch (err) {
        console.log(err);
    }
}