import axios from 'axios'
import { useDispatch } from 'react-redux';
import { logout } from '../state/auth/hooks';
import { useAuthState } from '../state/hooks';

export function useAxios() {
  const dispatch = useDispatch();
  const token = undefined

  axios.interceptors.request.use(request => {
    if(request.url.indexOf('http') < 0) {
      //if(process.env.NODE_ENV === "production") request.url = process.env.REACT_APP_API_URL + request.url
      
      if (token) {
        request.headers.common['Authorization'] = `Bearer ${token}`
      }
    }
    
    request.timeout = 300000;
    
    return request
  })
  
  axios.interceptors.response.use(response => {
    return Promise.resolve(response);
  }, error => {
    console.log(error)
    const { status, statusText, data } = error.response

    if (status === 401 || status === 403) {
      // dispatch(logout())
      // window.location.reload();
    }
  
    return Promise.reject(error)
  })
}
