import { useState } from 'react';
import { ethers } from 'ethers';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from "./connectWallet.module.css";

const ConnectWallet = ({ setWalletAddress, setWalletBalance, setSigner }) => {
    const [connected, setConnected] = useState(false);

    const connectWallet = async () => {
        let signer = null;
        let provider;

        try {
            if (window.ethereum === "undefined") {
                toast.error('MetaMask extension not found. Please install the MetaMask extension on your browser or download the app on your mobile device.', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                return;
            }

            provider = new ethers.BrowserProvider(window.ethereum)
            signer = await provider.getSigner();
            const address = await signer.getAddress();

            getBalance(address, provider)

            const formattedAddress = formatAddress(address);
            setWalletAddress(formattedAddress);
            setSigner(signer)
            setConnected(true);
            toast.success('You are connected!', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        } catch (error) {
            console.error('Error connecting wallet:', error);
            toast.error('Error connecting wallet. Please make sure you have MetaMask installed or try again later.', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    };

    const getBalance = async (address, provider) => {
        try {
            const balance = await provider.getBalance(address)
            const balanceInEther = ethers.formatEther(balance)
            const formattedBalance = parseFloat(balanceInEther).toFixed(3);

            setWalletBalance(formattedBalance);

        } catch (balanceError) {
            console.error('Error getting balance:', balanceError);
            toast.error('Error getting balance. Please try again later.', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    }

    const formatAddress = (address) => {
        const firstFive = address.slice(0, 5);
        const lastFour = address.slice(-4);
        return `${firstFive}...${lastFour}`;
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
    setSigner: PropTypes.func.isRequired,
};

export default ConnectWallet;