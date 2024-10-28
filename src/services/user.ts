
import http from "./http";
export interface LoginRespones{
  user:{
    id:string
    username:string
    email:string
    bio?: string
    image: string
    token: string
  }
}
interface LoginPayLoad{
  user:{
    email:string
    password:string
  }
}

interface RegisterPayLoad{
  user:{
    email:string
    password:string
    username:string
  }
}
const user = {
    //   async getUserData(params) {
    //     return await http.get("/api/users/user", params);
    //   },
  async registerUser(data:RegisterPayLoad) {
    return await http.postData<typeof data,LoginRespones>("/users",data);
    //    { "user": { "id": 5, "email": "ssss@gmail.com", "username": "sssss", "bio": null,
    //   "image": "https://api.realworld.io/images/smiley-cyrus.jpeg",
    //   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo1fSwiaWF0IjoxNzI5ODgzNDU3LCJleHAiOjE3MzUwNjc0NTd9.6ZIb2tVO1yHyQcVLzUXG4ZaVeygtIYgKQsVJn73olcs" } }
  },
  async loginUser(data:LoginPayLoad) {
    return await http.postData<typeof data,LoginRespones>("/users/login",data);

  },
async getUser(){
  return await http.readData<LoginRespones>('/user')
}
};

export default user
