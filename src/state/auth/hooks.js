import axios from 'axios'
import Querystring from "query-string"
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { loggedIn, loggedOut, setError, setLoading, setUser } from '.';
import { useActiveWeb3React } from '../../hooks';
import { useAuthState } from '../hooks';

export const fetchUser = async (address) => {
  try {
    const res = axios.get(`/api/user/${address}`)
    return (await res).data.user
  } catch(error) {
    return null
  }
}

export const useSignIn = async () => {
  const dispatch = useDispatch()

  const { account, library } = useActiveWeb3React()
	const { user, token } = useAuthState();
  const [signing, setSigning] = useState(false)
  
  useEffect(() => {
    if(!account || !library) {
      console.log('not connected to wallet')
      return;
    }

    if(user && !token) {
      if(!user?.nonce) {
        console.log('nonce is invalid')
        return;
      }

      if(signing) {
        console.log('already signing')
        return
      }

      setSigning(true)
      dispatch(loginUser(account, user.nonce, library.getSigner()))
    }
  }, [user, account, token])
}

export const loginUser = (account, nonce, signer) => async (dispatch) => {
  try {
		dispatch(setLoading(true))
    try {
      const signature = await signer.signMessage(
        `I am signing my one-time nonce: ${nonce}`
      );
      
      if(signature) {
          const { data } = await axios.post(`/api/login`, Querystring.stringify({address: account, signature: signature}))
          const token = data.token;
          if(token) {
              dispatch(loggedIn(token))
              localStorage.setItem('nftologyToken', token);
              const user = await fetchUser(account)
              dispatch(setUser(user))
          }
      }
    } catch (err) {
      dispatch(setError(err))
      console.log(err);
    }

	} catch (error) {
    dispatch(setError(error))
		console.log(error);
	}
}

export const logout = () => async (dispatch) => {
  dispatch(loggedOut())
	localStorage.removeItem('nftologyToken');
}