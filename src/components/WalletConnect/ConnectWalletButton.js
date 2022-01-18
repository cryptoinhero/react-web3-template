import React, { useState } from "react"
import { Button } from 'reactstrap'
import { useActiveWeb3React } from '../../hooks'
import useAuth from '../../hooks/useAuth'
import AccountModal from './AccountModal'
import ConnectModal from './ConnectModal'

import 'bootstrap/dist/css/bootstrap.min.css';

const ConnectWalletButton = (props) => {
    const { account } = useActiveWeb3React()
    const { login, logout } = useAuth()
    const [ connectModalOpen, setConnectModalOpen ] = useState(false)
    const [ accountModalOpen, setAccountModalOpen ] = useState(false)

    const shortAddress = account ? `${account.slice(0, 6)}...${account.slice(-6)}` : null
    const onClickConnect = () => {
        if(account) {
            setAccountModalOpen(true);
        }else {
            setConnectModalOpen(true)
        }
    }

    return (
        <>
            <Button onClick={() => onClickConnect()} {...props}>
                {props.isheader ? 'Connect' :account ? shortAddress : 'Connect'}
            </Button>
            <ConnectModal open={connectModalOpen} login={login} onDismiss={() => setConnectModalOpen(false)} />
            <AccountModal open={accountModalOpen} logout={logout} account={account} onDismiss={() => setAccountModalOpen(false)} />
        </>
    )
}

export default ConnectWalletButton;
