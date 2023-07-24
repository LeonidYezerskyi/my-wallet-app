import { useState } from 'react';
import PropTypes from 'prop-types';
import WalletInfo from '../WalletInfo/WalletInfo'
import Logo from '../Logo/Logo'
import ConnectWallet from '../ConnectWallet/ConnectWallet'
import css from './header.module.css'

const Header = ({ setWalletBalanceInEther, setSigner }) => {
    const [walletAddress, setWalletAddress] = useState('');
    const [walletBalance, setWalletBalance] = useState('');

    return (
        <div className={css.headerWrapper}>
            <Logo />
            {walletAddress ?
                (<WalletInfo walletBalance={walletBalance} walletAddress={walletAddress} />) :
                (<ConnectWallet
                    setWalletAddress={setWalletAddress}
                    setWalletBalance={setWalletBalance}
                    setWalletBalanceInEther={setWalletBalanceInEther}
                    setSigner={setSigner}
                />)
            }
        </div>
    )
}

Header.propTypes = {
    setWalletBalanceInEther: PropTypes.func.isRequired,
    setSigner: PropTypes.func.isRequired,
};

export default Header