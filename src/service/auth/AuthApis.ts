import api from "../../api/api";
import { AuthTypes } from "./AuthTypes";
import { AxiosResponse } from "axios";

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
      const response: AxiosResponse<AuthTypes.AuthenticationResponse> = await api.post({
        url: "auth/register",
        data: req
      });
      return { data: response.data };
    } catch (error) {
      return { errorMessage: `Error during registration: ${error}` };
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
      console.log(response)
      return { data: response };
    } catch (error) {
      return { errorMessage: `Error during authentication: ${error}` };
    }
  };
}

export default AuthApis;
