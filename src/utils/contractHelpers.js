import { ethers } from "ethers"
import MulticallABI from '../config/abi/Multicall.json';
import ERC20ABI from '../config/abi/erc20.json';

import { getMulticallAddress } from "./addressHelpers";

export const simpleRpcProvider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_NODE_1)

export const getContract = (address, abi, signer) => {
  const signerOrProvider = signer ? signer : simpleRpcProvider
  return new ethers.Contract(address, abi, signerOrProvider)
}

export const getMulticallContract = (provider) => {
  return getContract(getMulticallAddress(), MulticallABI, provider)
}


export const getTokenContract = (currency, provider) => {
  return getContract(
    currency,
    ERC20ABI,
    provider
  )
}
