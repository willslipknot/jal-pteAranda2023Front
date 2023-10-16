import axios from 'axios'

const instance = axios.create({
    baseURL:'http://containers-us-west-101.railway.app:5877',
    withCredentials:true,

})

export default instance