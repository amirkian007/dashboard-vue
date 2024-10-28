import http from "./http";
export interface LoginRespones {
  user: {
    id: string;
    username: string;
    email: string;
    bio?: string;
    image: string;
    token: string;
  };
}
interface LoginPayLoad {
  user: {
    email: string;
    password: string;
  };
}

interface RegisterPayLoad {
  user: {
    email: string;
    password: string;
    username: string;
  };
}
const user = {
  async registerUser(data: RegisterPayLoad) {
    return await http.postData<typeof data, LoginRespones>("/users", data);
  },
  async loginUser(data: LoginPayLoad) {
    return await http.postData<typeof data, LoginRespones>(
      "/users/login",
      data
    );
  },
  async getUser() {
    return await http.readData<LoginRespones>("/user");
  },
};

export default user;
