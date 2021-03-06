import { useCallback } from 'react'
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import { NoBscProviderError } from '@binance-chain/bsc-connector'
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector'
import {
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
  WalletConnectConnector,
} from '@web3-react/walletconnect-connector'

import { connectorLocalStorageKey } from '.'
import { connectorsByName } from '../utils/web3React'
import { setupNetwork } from '../utils/wallet'
import { toast } from 'react-toastify'

const useAuth = () => {
  const { activate, deactivate } = useWeb3React()

  const login = useCallback((connectorID) => {
    console.log('attempt login using ', connectorID)
    const connector = connectorsByName[connectorID]
    if (connector) {
      activate(connector, async (error) => {
        if (error instanceof UnsupportedChainIdError) {
          const hasSetup = await setupNetwork()
          if (hasSetup) {
            activate(connector)
          }
        } else {
          window.localStorage.removeItem(connectorLocalStorageKey)
          if (error instanceof NoEthereumProviderError || error instanceof NoBscProviderError) {
            toast.error('No provider was found')
          } else if (
            error instanceof UserRejectedRequestErrorInjected ||
            error instanceof UserRejectedRequestErrorWalletConnect
          ) {
            if (connector instanceof WalletConnectConnector) {
              const walletConnector = connector
              walletConnector.walletConnectProvider = null
            }
            toast.error('Please authorize to access your account')
          } else {
            toast.error(error.message)
          }
        }
      })
    } else {
      console.log({ text: "Can't find connector, The connector config is wrong", type: 'error' })
      console.log("Can't find connector", 'The connector config is wrong')
    }
  }, [activate])

  const logout = useCallback(() => {
    deactivate()
    // This localStorage key is set by @web3-react/walletconnect-connector
    if (window.localStorage.getItem('walletconnect')) {
      connectorsByName.WalletConnect.close()
      connectorsByName.WalletConnect.walletConnectProvider = null
    }
    window.localStorage.removeItem(connectorLocalStorageKey)
  }, [deactivate])

  return { login, logout }
}

export default useAuth
