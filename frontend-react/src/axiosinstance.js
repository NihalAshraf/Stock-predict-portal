import axios from "axios";

const baseURL=import.meta.env.VITE_BACKEND_BASE_URL

const axiosInstance = axios.create({
    baseURL:baseURL
})
//Request Interceptors
axiosInstance.interceptors.request.use(
    function(config){
        const accessToken = localStorage.getItem('access');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    function(error) {
        return Promise.reject(error);
    }
)

//Response Interceptors

axiosInstance.interceptors.response.use(
    function(response){
        // If the response is successful, return it
        return response;

    },
    async function (error){
        const originalRequest = error.config;
        // If the error is due to an unauthorized request (401)
        if (error.response && error.response.status === 401 && !originalRequest.retry) {
            originalRequest.retry = true;
            // Attempt to refresh the token or redirect to login
            // For example, you can redirect to the login page
            const refreshToken = localStorage.getItem('refresh');
            try {
                const response=await axiosInstance.post('/token/refresh/',{refresh: refreshToken})
                localStorage.setItem('access', response.data.access);
                originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
                return axiosInstance(originalRequest);
            } catch (error) {
                error.response.data.message = "Session expired, please login again.";
                localStorage.removeItem('access');
                localStorage.removeItem('refresh');
                window.location.href = '/login'; // Redirect to login page
            }
        }
        return Promise.reject(error);

    })

export default axiosInstance;