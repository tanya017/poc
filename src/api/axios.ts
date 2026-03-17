import axios from "axios";
import { getHeaders, timeStampGenerator} from "../utils/api";


const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: getHeaders(),
});

api.interceptors.request.use((config) => {
    const current_timestamp = timeStampGenerator();
    // config.headers['timestamp'] = `${current_timestamp}`;
    // config.headers['xRequestId'] = `2abe6bee-768f-4714-ab8d-2da64540bda8-${current_timestamp}`;
    config.headers.set('timestamp', `${current_timestamp}`);
    config.headers.set('xRequestId', `2abe6bee-768f-4714-ab8d-2da64540bda8-${current_timestamp}`);
    return config;
},
)

export default api;