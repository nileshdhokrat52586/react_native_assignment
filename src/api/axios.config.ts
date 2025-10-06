import axios from 'axios'

const axiosInstance = axios.create(
    {
        baseURL:'https://jsonplaceholder.typicode.com',
        timeout: 5000,
        headers:{
            'Content-Type': 'application/json'
        }
    },
);

axiosInstance.interceptors.request.use(
    (config)=>{
    console.log('Result:', config.url)
    return config
    },
    (error)=>{
        console.log('API Error:', error.message)
        return Promise.reject(error)
    }
)

axiosInstance.interceptors.response.use(
    (response)=>response,
    (error)=>{
        console.error('API Error:', error.message)
        return Promise.reject(error);
    }
)

export default axiosInstance;