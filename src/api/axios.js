import axios from 'axios'

const instance = axios.create({
    baseURL:'https://containers-us-west-88.railway.app',
    withCredentials:true,

})

export default instance