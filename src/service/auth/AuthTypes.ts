import Role from "./Role";

export namespace AuthTypes {

  export type RegisterRequest = {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    role: Role;
  };

  export type AuthenticationResponse = {
    access_token: string;
    refresh_token: string;
  };

}
