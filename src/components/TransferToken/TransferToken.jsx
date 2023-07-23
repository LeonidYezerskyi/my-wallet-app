import { useState } from 'react';
import { ethers } from 'ethers';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './transferToken.module.css';
import Loader from '../Loader/Loader';

const TransferToken = ({ signer }) => {
    const [recipientAddress, setRecipientAddress] = useState('');
    const [amount, setAmount] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleTransfer = async (e) => {
        e.preventDefault();

        try {
            if (!signer || !recipientAddress || !amount) {
                showErrorMessage('Please make sure you are connected to MetaMask and have entered both recipient address and amount.');
                return;
            }
            setIsLoading(true);

            const amountInWei = ethers.parseEther(amount);

            const tx = await signer.sendTransaction({
                to: recipientAddress,
                value: amountInWei,
            });

            const receipt = await tx.wait();
            console.log(receipt)
            showSuccessMessage('Transaction sent successfully!');
            resetForm()
        } catch (error) {
            console.error('Error transferring tokens:', error);
            showErrorMessage('Error transferring tokens. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    const showErrorMessage = (message) => {
        toast.error(message, {
            position: "top-center",
            autoClose: 4000,
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
                <button
                    className={css.formBtn}
                    disabled={isLoading}
                    onClick={handleTransfer}
                    type='submit'>
                    Transfer {isLoading && <Loader />}
                </button>
            </div>
        </div>
    );
};

TransferToken.propTypes = {
    signer: PropTypes.object,
}

export default TransferToken;
