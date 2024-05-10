import axios from 'axios';  
import { getCookie} from "./cookieService";
const BaseUrl = 'http://localhost:5000' 
const instance = axios.create({ 
  baseURL: BaseUrl, 
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  (config) => { 
    const accessToken = getCookie('myCookieAccessToken');
    // const accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyIiwianRpIjoiNjkyMzg0ZjdlYjgwNDNjNDNiOGY0YTk4MmMwMWY1MGRlMGE0MTEwYjAyNDkzYmVmZWI1N2NjMzM2NTllMjg0NmJkMDcyNDZlNGVhNzI1OGMiLCJpYXQiOjE2ODkyMzI1ODUuNzQ4MjgxLCJuYmYiOjE2ODkyMzI1ODUuNzQ4Mjg1LCJleHAiOjE3MjA4NTQ5ODUuNzI3MzI0LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.kcHFFb_sJjRroArP2B3tSkUMJPv_Vn2fZIe0vOE0TXwNuGYlv1ZklOX8ccQxy4e8shZ2Y5LtPCsy7EUt2XNDaSc5fAPQjLjw36_wI45JPNKtugyl_hPqeJ_2VrAAyd_QvBrdqHBxYerXZFd3jZQK7latyO2Vh52Ph3bjdxj28eDTGlvwR180u--EeQUql3ZXRQ4UQrXv7CupdBh3ACZWu8ge6yQne2zmDJgx0R-khg4jwK69TOpdDFzXkgcvrYyqqp3qg_LeDIt21rErjENau0Keqf0Lo8Afzl4k6xAL3iIlW3DCzaD5gPY8wmm3j53jaAr-I3Nwwm12Gt7hLAUVxX88J89G8jsXq8JWDj1iFcbrjZAl_K922D-2_YO_Jzvbt9QZWna0DY4ve3XRWbN6XObFrYNTMAHlApQpBl-URntA3ycdYj2QHiF6-WX_cfzPlP8Q5ClinY96ePxQvYl1AgFgQJjIEsbEq1GKnszbGUxE3rGEJ1175BwiY4wZyppPpupwil3tg31xH3QdRroTUvFynsPuFAUXrGIkhTryiy2bwfuL67Sem-aqs7lFqubEG9ZjO_T9cMH8y2BZRlIEGR5j0rTVBaLQ-mDZGd_alISEJz43k8EurEsgyg-NVHtDDRjlxeKcNoi2Ei7oqixcNrlfd6Vhpdq5AGLaFGoJWMg';
    config.headers['Authorization'] = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;