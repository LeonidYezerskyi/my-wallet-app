import { useState } from 'react';
import { ethers } from 'ethers';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from "./connectWallet.module.css";

const ConnectWallet = ({ setWalletAddress, setWalletBalance, setWalletBalanceInEther, setSigner }) => {
    const [connected, setConnected] = useState(false);

    const connectWallet = async () => {
        let signer = null;
        let provider;

        try {
            if (window.ethereum !== "undefined" && window.ethereum.isMetaMask) {

                const [address] = await window.ethereum.request(
                    { method: 'eth_requestAccounts' });

                provider = new ethers.BrowserProvider(window.ethereum);

                signer = await provider.getSigner();
                // const address = await signer.getAddress();

                getBalance(address, provider)

                const formattedAddress = formatAddress(address);
                setWalletAddress(formattedAddress);
                setSigner(signer)
                setConnected(true);
                showSuccessMessage('You are connected!');
            } else {
                showErrorMessage('MetaMask extension not found. Please install the MetaMask extension on your browser or download the app on your mobile device.');
                return;
            }
        } catch (error) {
            console.error('Error connecting wallet:', error);
            showErrorMessage('Error connecting wallet. Please make sure you have MetaMask installed or try again later.');
        }
    };

    const getBalance = async (address, signer) => {
        try {
            const balance = await signer.getBalance(address)
            const balanceInEther = ethers.formatEther(balance)
            const formattedBalance = parseFloat(balanceInEther).toFixed(3);

            setWalletBalance(formattedBalance);
            setWalletBalanceInEther(balanceInEther)
        } catch (balanceError) {
            console.error('Error getting balance:', balanceError);
            showErrorMessage('Error getting balance. Please try again later.');
        }
    }

    const formatAddress = (address) => {
        const firstFive = address.slice(0, 5);
        const lastFour = address.slice(-4);
        return `${firstFive}...${lastFour}`;
    }

    const showErrorMessage = (message) => {
        toast.error(message, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    };

    const showSuccessMessage = (message) => {
        toast.success(message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    };

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
    setWalletBalanceInEther: PropTypes.func.isRequired,
    setSigner: PropTypes.func.isRequired,
};

export default ConnectWallet;