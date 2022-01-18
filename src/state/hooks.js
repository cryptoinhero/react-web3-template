import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useRefresh from '../hooks/useRefresh'

export const usePollPublicData = () => {
  const dispatch = useDispatch()
  const { slowRefresh } = useRefresh()

}


// auth
export const useAuthState = () => useSelector((state) => state.auth)