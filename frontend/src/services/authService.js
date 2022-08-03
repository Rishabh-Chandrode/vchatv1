import axios from "axios";

const signup = async (username, email, password) => {
  return await axios({
    method: "post",
    url: "http://localhost:5000/api/auth/signup",
    headers: {
      "Content-Type": "application/json",
    },
    data: { username, email, password },
  })
  .then((response) => {
    if(response.data.acessToken){
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  }).catch( (err) => {
    return err.JSON(err.response.data);
  })
};

const login = (email, password) => {
    return axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
    })
    .then((response) => {
        if(response.data.acessToken){
            localStorage.setItem("user", JSON.stringify(response.data));
        }
        
        return response.data;
    });
    }

    const logout = () => {
        localStorage.removeItem("user");
    }

    const getUser = () => {
        return JSON.parse(localStorage.getItem("user"));
    }

    const authService = {
        signup,
        login,
        logout,
        getUser,
    };
    
    export default authService;
