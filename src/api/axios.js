import axios from 'axios'

const instance = axios.create({
    baseURL:'https://containers-us-west-101.railway.app:5877',
    withCredentials:true,

})

export default instance