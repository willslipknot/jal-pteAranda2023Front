import axios from 'axios'

const instance = axios.create({
    baseURL:'postgres://postgres:djWhRM6xB8LtrnwRWsbE@containers-us-west-101.railway.app:5877/railway/',
    withCredentials:true,

})

export default instance