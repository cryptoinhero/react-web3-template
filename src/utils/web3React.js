import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { BscConnector } from '@binance-chain/bsc-connector'
import { ethers } from 'ethers'
import getNodeUrl from './getRpcUrl'
import Metamask from "../components/WalletConnect/icons/Metamask";
import TrustWallet from "../components/WalletConnect/icons/TrustWallet";
import WalletConnect from "../components/WalletConnect/icons/WalletConnect";
import BinanceChain from "../components/WalletConnect/icons/BinanceChain";

const POLLING_INTERVAL = 12000
const rpcUrl = getNodeUrl()
const chainId = parseInt(process.env.REACT_APP_NETWORK_ID, 10)

export const injected = new InjectedConnector({ supportedChainIds: [chainId] })

export const walletconnect = new WalletConnectConnector({
  rpc: { [chainId]: rpcUrl },
  bridge: 'https://pancakeswap.bridge.walletconnect.org/',
  qrcode: true,
  pollingInterval: POLLING_INTERVAL,
})

export const bscConnector = new BscConnector({ supportedChainIds: [chainId] })

export const connectorsByName = {
  'Injected': injected,
  'WalletConnect': walletconnect,
  'BinanceChainWallet': bscConnector
}

export const connectors = +chainId == 56 ? [
  {
    title: "Metamask",
    icon: Metamask,
    connectorId: 'Injected',
  },
  {
    title: "TrustWallet",
    icon: TrustWallet,
    connectorId: 'Injected',
  },
  {
    title: "WalletConnect",
    icon: WalletConnect,
    connectorId: 'WalletConnect',
  },
  {
    title: "Binance Chain Wallet",
    icon: BinanceChain,
    connectorId: 'BinanceChainWallet',
  },
]: [
  {
    title: "Metamask",
    icon: Metamask,
    connectorId: 'Injected',
  },
  {
    title: "TrustWallet",
    icon: TrustWallet,
    connectorId: 'Injected',
  },
  {
    title: "WalletConnect",
    icon: WalletConnect,
    connectorId: 'WalletConnect',
  },
  {
    title: "Binance Chain Wallet",
    icon: BinanceChain,
    connectorId: 'BinanceChainWallet',
  },
]

export const getLibrary = (provider) => {
  const library = new ethers.providers.Web3Provider(provider)
  library.pollingInterval = POLLING_INTERVAL
  return library
}

/**
 * BSC Wallet requires a different sign method
 * @see https://docs.binance.org/smart-chain/wallet/wallet_api.html#binancechainbnbsignaddress-string-message-string-promisepublickey-string-signature-string
 */
export const signMessage = async (provider, account, message) => {
  if (window.BinanceChain) {
    const { signature } = await window.BinanceChain.bnbSign(account, message)
    return signature
  }

  /**
   * Wallet Connect does not sign the message correctly unless you use their method
   * @see https://github.com/WalletConnect/walletconnect-monorepo/issues/462
   */
  if (provider.provider.wc) {
    const wcMessage = ethers.utils.hexlify(ethers.utils.toUtf8Bytes(message))
    const signature = await provider.provider.wc.signPersonalMessage([wcMessage, account])
    return signature
  }

  return provider.getSigner(account).signMessage(message)
}
