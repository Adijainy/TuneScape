import { apiConnector } from "../apiConnector";

import { endpoints } from "../apis";

export async function createUser(data) {
  try {
    const result = await apiConnector(
      "POST",
      endpoints.CREATE_USER,
      data,
      null,
      null
    );
    if (result.status === 500) {
      return new Error("User not created");
    }
    return result.data;
  } catch (err) {
    console.log(err);
  }
}
