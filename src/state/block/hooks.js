import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import useIsWindowVisible from '../../hooks/useIsWindowVisible'
import { simpleRpcProvider } from '../../utils/providers'

import { setBlock } from '.'

export const usePollBlockNumber = (refreshTime = 6000) => {
  const timer = useRef(null)
  const dispatch = useDispatch()
  const isWindowVisible = useIsWindowVisible()

  useEffect(() => {
    if (isWindowVisible) {
      timer.current = setInterval(async () => {
        const blockNumber = await simpleRpcProvider.getBlockNumber()
        dispatch(setBlock(blockNumber))
      }, refreshTime)
    } else {
      clearInterval(timer.current)
    }

    return () => clearInterval(timer.current)
  }, [dispatch, timer, isWindowVisible, refreshTime])
}

export const useBlock = () => useSelector((state) => state.block)

export const useInitialBlock = () => useSelector((state) => state.block.initialBlock)