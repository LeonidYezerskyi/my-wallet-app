import { useState } from 'react';
import { ethers } from 'ethers';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import css from './transferToken.module.css';

const TransferToken = ({ signer }) => {
    const [recipientAddress, setRecipientAddress] = useState('');
    const [amount, setAmount] = useState('');

    const handleTransfer = async (e) => {
        e.preventDefault();

        try {
            if (!signer || !recipientAddress || !amount) {
                toast.error('Please make sure you are connected to MetaMask and have entered both recipient address and amount.', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });

                return;
            }

            const amountInWei = ethers.parseEther(amount);

            const tx = await signer.sendTransaction({
                to: recipientAddress,
                value: amountInWei,
            });

            const receipt = await tx.wait();
            console.log(receipt)
            toast.success('Transaction sent successfully!', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            resetForm()
        } catch (error) {
            console.error('Error transferring tokens:', error);
            toast.error('Error transferring tokens. Please try again later.', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    };

    const resetForm = () => {
        setRecipientAddress("");
        setAmount("")
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

TransferToken.propTypes = {
    signer: PropTypes.object,
}

export default TransferToken;
