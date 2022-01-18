
import { ethers } from 'ethers'
import { zeroAddress } from '../config/constants'
import { getMarketplaceAddress } from '../utils/addressHelpers'
import { getNFTContract, getTokenContract } from '../utils/contractHelpers'

export const isTokenApproval = async (token, amount, account, provider) => {
  if(token === zeroAddress) return true

  const tokenContract = getTokenContract(token, provider)
  const res = await tokenContract.allowance(account, getMarketplaceAddress())
  return res.gt(amount)
}

export const approveToken = async (token, provider) => {
  const tokenContract = getTokenContract(token, provider)
  const tx = await tokenContract.approve(getMarketplaceAddress(), ethers.constants.MaxUint256)
  const receipt = await tx.wait(2)

  return receipt.status
}

export const isNFTApproval = async (collection, account, provider) => {
  
  const nftContract = getNFTContract(collection, provider)

  return await nftContract.isApprovedForAll(account, getMarketplaceAddress())
}

export const approveNFT = async (collection, provider) => {
  const nftContract = getNFTContract(collection, provider)
  
  const tx = await nftContract.setApprovalForAll(getMarketplaceAddress(), true)
  const receipt = await tx.wait(2)

  return receipt.status
}
