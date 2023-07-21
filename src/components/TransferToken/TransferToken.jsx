import { useState } from 'react';
import css from './transferToken.module.css';

const TransferToken = () => {
    const [recipientAddress, setRecipientAddress] = useState('');
    const [amount, setAmount] = useState('');

    const handleTransfer = () => {
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
                <button className={css.formBtn} onClick={handleTransfer}>Transfer</button>
            </div>
        </div>
    );
};

export default TransferToken