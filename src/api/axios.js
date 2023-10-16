import axios from 'axios'

const instance = axios.create({
    baseURL:'https://jac-ptearanda2023.onrender.com',
    withCredentials:true,

})

export default instance