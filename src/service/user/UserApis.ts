import api from "../../api/api";

class UserApis {
  static async currentUser() {
    try {
      const response = await api.get({ url: "/users/current" });
      return response;
    } catch (error) {
      console.log("error");
    }
  }
}
export default UserApis;
