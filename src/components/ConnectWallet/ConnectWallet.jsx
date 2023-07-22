import { useState } from 'react';
import { ethers } from 'ethers';
import PropTypes from 'prop-types';


import css from "./connectWallet.module.css";

const ConnectWallet = ({ setWalletAddress, setWalletBalance }) => {
    const [connected, setConnected] = useState(false);

    const connectWallet = async () => {

        try {
            if (typeof window.ethereum === 'undefined') {
                alert('MetaMask extension not found. Please install the MetaMask extension on your browser or download the app on your mobile device.');
                return;
            }

            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            if (accounts.length === 0) {
                alert('Wallet connection canceled.');
                return;
            }
            const address = accounts[0];

            getBalance(address)

            setWalletAddress(address);
            setConnected(true);
        } catch (error) {
            console.error('Error connecting wallet:', error);
            alert('Error connecting wallet. Please make sure you have MetaMask installed or try again later.');
        }
    };

    const getBalance = async (address) => {
        try {
            const balance = await window.ethereum.request({ method: 'eth_getBalance', params: [address, 'latest'] });
            const balanceInEther = ethers.formatEther(balance);

            setWalletBalance(balanceInEther);

        } catch (balanceError) {
            console.error('Error getting balance:', balanceError);
            alert('Error getting balance. Please try again later.');
        }
    }

    const disconnectWallet = () => {
        setWalletAddress('');
        setWalletBalance('');
        setConnected(false);
    };

    return (
        <div>
            {connected ? (
                <button className={css.headerBtn} type="button" onClick={disconnectWallet}>Disconnect wallet</button>
            ) : (
                <button className={css.headerBtn} type="button" onClick={connectWallet}>Connect wallet</button>
            )}
        </div>
    )
}

ConnectWallet.propTypes = {
    setWalletAddress: PropTypes.func.isRequired,
    setWalletBalance: PropTypes.func.isRequired,
};

export default ConnectWallet;