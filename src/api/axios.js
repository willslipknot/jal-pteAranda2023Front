import axios from 'axios'

const instance = axios.create({
    baseURL:'containers-us-west-101.railway.app/',
    withCredentials:true,

})

export default instance