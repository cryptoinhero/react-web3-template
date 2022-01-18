import { useMemo } from 'react'
import { useActiveWeb3React } from './index'
import NFTABI from '../config/abi/NftologyNFT.json'
import NFTFactoryABI from '../config/abi/NftologyFactory.json'
import NFTMarketPlaceABI from '../config/abi/NftologyMarketPlace.json'
import erc20ABI from '../config/abi/erc20.json'
import { getMarketplaceAddress, getNFTFactoryAddress, } from '../utils/addressHelpers'
import { getContract, getTokenContract } from '../utils/contractHelpers'
import { zeroAddress } from '../config/constants'

// returns null on errors
function useContract(address, ABI) {
  const { library, account } = useActiveWeb3React()

  return useMemo(() => {
    if (!address || !ABI || !library) return null
    try {
      return getContract(address, ABI, library.getSigner())
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [address, ABI, library, account])
}

export function useNftContract(address) {
  return useContract(address, NFTABI)
}

export function useFactoryContract() {
  return useContract(getNFTFactoryAddress(), NFTFactoryABI)
}

export function useMarketPlaceContract() {
  return useContract(getMarketplaceAddress(), NFTMarketPlaceABI)
}

export function useTokenContract(tokenAddress) {
  return useContract(tokenAddress, erc20ABI)
}

export const checkCanBid = async(currency, amount, account, signer) => {
  let balance = 0
  if(currency === zeroAddress) {
    balance = await signer.getBalance()
  } else {
    const tokenContract = getTokenContract(currency, signer)
    balance = await tokenContract.balanceOf(account)
  }
 
  if(balance.lt(amount)) {
    return {
      can: false,
      error: 'Low Balance'
    }
  }

  return {
    can: true
  }
}
