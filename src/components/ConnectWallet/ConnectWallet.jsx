import { useState } from 'react';
import { ethers } from 'ethers';
import PropTypes from 'prop-types';


import css from "./connectWallet.module.css";

const ConnectWallet = ({ setWalletAddress, setWalletBalance }) => {
    const [connected, setConnected] = useState(false);

    const connectWallet = async () => {
        let signer = null;
        let provider;

        try {
            if (window.ethereum === "undefined") {
                alert('MetaMask extension not found. Please install the MetaMask extension on your browser or download the app on your mobile device.');
                provider = ethers.getDefaultProvider()
            }

            provider = new ethers.BrowserProvider(window.ethereum)
            signer = await provider.getSigner();
            const address = await signer.getAddress();

            getBalance(address, provider)

            const formattedAddress = formatAddress(address);
            setWalletAddress(formattedAddress);
            setConnected(true);
        } catch (error) {
            console.error('Error connecting wallet:', error);
            alert('Error connecting wallet. Please make sure you have MetaMask installed or try again later.');
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
            alert('Error getting balance. Please try again later.');
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

// const ConnectWallet = ({ setWalletAddress, setWalletBalance }) => {
//     const [connected, setConnected] = useState(false);

//     const connectWallet = async () => {

//         try {
//             if (typeof window.ethereum === 'undefined') {
//                 alert('MetaMask extension not found. Please install the MetaMask extension on your browser or download the app on your mobile device.');
//                 return;
//             }

//             const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
//             if (accounts.length === 0) {
//                 alert('Wallet connection canceled.');
//                 return;
//             }
//             const address = accounts[0];

//             getBalance(address)

//             const formattedAddress = formatAddress(address);
//             setWalletAddress(formattedAddress);
//             setConnected(true);
//         } catch (error) {
//             console.error('Error connecting wallet:', error);
//             alert('Error connecting wallet. Please make sure you have MetaMask installed or try again later.');
//         }
//     };

//     const getBalance = async (address) => {
//         try {
//             const balance = await window.ethereum.request({ method: 'eth_getBalance', params: [address, 'latest'] });
//             const balanceInEther = ethers.formatEther(balance);
//             const formattedBalance = parseFloat(balanceInEther).toFixed(3);

//             setWalletBalance(formattedBalance);

//         } catch (balanceError) {
//             console.error('Error getting balance:', balanceError);
//             alert('Error getting balance. Please try again later.');
//         }
//     }

//     const formatAddress = (address) => {
//         const firstFive = address.slice(0, 5);
//         const lastFour = address.slice(-4);
//         return `${firstFive}...${lastFour}`;
//     }

//     const disconnectWallet = () => {
//         setWalletAddress('');
//         setWalletBalance('');
//         setConnected(false);
//     };

//     return (
//         <div>
//             {connected ? (
//                 <button className={css.headerBtn} type="button" onClick={disconnectWallet}>Disconnect wallet</button>
//             ) : (
//                 <button className={css.headerBtn} type="button" onClick={connectWallet}>Connect wallet</button>
//             )}
//         </div>
//     )
// }

ConnectWallet.propTypes = {
    setWalletAddress: PropTypes.func.isRequired,
    setWalletBalance: PropTypes.func.isRequired,
};

export default ConnectWallet;