import http from './http'
//*********** */
//Note :  The js docs are generated with Ai
//*********** */
export interface LoginRespones {
  user: {
    /**
     * Unique identifier of the user.
     */
    id: string

    /**
     * Username of the user.
     */
    username: string

    /**
     * Email address of the user.
     */
    email: string

    /**
     * Optional biography of the user.
     */
    bio?: string

    /**
     * URL of the user's profile image.
     */
    image: string

    /**
     * Authentication token for the user session.
     */
    token: string
  }
}
interface LoginPayLoad {
  user: {
    /**
     * Email address used for login.
     */
    email: string

    /**
     * Password used for login.
     */
    password: string
  }
}

interface RegisterPayLoad {
  user: {
    /**
     * Email address to register with.
     */
    email: string

    /**
     * Password to register with.
     */
    password: string

    /**
     * Username to register with.
     */
    username: string
  }
}
const user = {
  /**
   * Registers a new user with the provided data.
   * @param {RegisterPayLoad} data - The registration details of the user.
   * @returns {Promise<LoginRespones>} The response containing the user's login information upon successful registration.
   */
  async registerUser(data: RegisterPayLoad) {
    return await http.postData<typeof data, LoginRespones>('/users', data)
  },

  /**
   * Logs in a user with the provided credentials.
   * @param {LoginPayLoad} data - The login credentials of the user.
   * @returns {Promise<LoginRespones>} The response containing the user's login information upon successful login.
   */
  async loginUser(data: LoginPayLoad) {
    return await http.postData<typeof data, LoginRespones>('/users/login', data)
  },

  /**
   * Fetches the current authenticated user's information.
   * @returns {Promise<LoginRespones>} The response containing the user's information.
   */
  async getUser() {
    return await http.readData<LoginRespones>('/user')
  },
}

export default user
