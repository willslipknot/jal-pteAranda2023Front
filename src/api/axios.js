import axios from 'axios'

const instance = axios.create({
    baseURL:'http://localhost:5877',
    withCredentials:true,

})

export default instance