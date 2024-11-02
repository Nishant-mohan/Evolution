import axios from "axios"
import server from "../server.json"
class User {
    constructor(id) {
      this.id = id;
      this.baseURL = import.meta.env.VITE_REACT_APP_BACKWEB;
    }
  
    // Method to fetch all projects for this user
    async getAllUsersProject() {
      try {
        const response = await axios.get(`${this.baseURL}/api/user/${this.id}/project`)
        if (response.status!==200) {
          throw new Error('Failed to fetch user projects');
        }
        const projects = response.data;
        return projects;
      } catch (error) {
        console.error('Error fetching user projects:', error);
        throw error;
      }
    }
  }

export default User;