import Role from "service/auth/Role";

export namespace UserTypes {
  export type User = {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    role: Role;
  };
}
