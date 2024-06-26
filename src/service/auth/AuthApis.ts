import api from "../../api/api";
import { AuthTypes } from "./AuthTypes";

class AuthApis {
  /**
   * Register a new user
   * @param req - request body
   * @returns Promise containing data or error message
   */
  static async register(
    req: AuthTypes.RegisterRequest
  ): Promise<{ data?: AuthTypes.AuthenticationResponse; errorMessage?: string }> {
    try {
      const result:AuthTypes.AuthenticationResponse = await api.post({
        url: "auth/register",
        data: req
      });
      return { data: result };
    } catch (error) {
      throw error;
    }
  }

  static authenticate = async (
    req: AuthTypes.AuthenticationRequest
  ): Promise<{ data?: AuthTypes.AuthenticationResponse; errorMessage?: string }> => {
    try {
      const response: AuthTypes.AuthenticationResponse = await api.post({
        url: "auth/authenticate",
        data: req
      });
      return { data: response };
    } catch (error) {
      throw error;
    }
  };
}

export default AuthApis;
