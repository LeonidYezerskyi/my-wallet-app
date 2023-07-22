import { useState } from 'react';
import { ethers } from 'ethers';

import css from './transferToken.module.css';

const TransferToken = () => {
    const [recipientAddress, setRecipientAddress] = useState('');
    const [amount, setAmount] = useState('');

    const handleTransfer = async (e) => {
        e.preventDefault();
        try {
            if (!window.ethereum || !recipientAddress || !amount) {
                alert('Please make sure you are connected to MetaMask and have entered both recipient address and amount.');
                return;
            }

            const amountInWei = ethers.utils.parseUnits(amount, 'ether');

            const tx = {
                to: recipientAddress,
                value: amountInWei.toHexString(),
            };

            const txHash = await window.ethereum.request({
                method: 'eth_sendTransaction',
                params: [tx],
            });

            alert(`Transaction sent! Transaction hash: ${txHash}`);
        } catch (error) {
            console.error('Error transferring tokens:', error);
            // alert('Error transferring tokens. Please try again later.');
        }
    };

    return (
        <div className={css.formWrapper}>
            <div className={css.transferForm}>
                <input
                    className={css.transferInput}
                    type="text"
                    placeholder="Recipient's address"
                    value={recipientAddress}
                    onChange={(e) => setRecipientAddress(e.target.value)}
                />
                <input
                    className={css.transferInput}
                    type="number"
                    placeholder="Number of tokens"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <button className={css.formBtn} onClick={handleTransfer} type='submit'>Transfer</button>
            </div>
        </div>
    );
};

export default TransferToken;
