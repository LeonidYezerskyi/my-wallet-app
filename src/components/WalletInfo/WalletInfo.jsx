import css from "./walletInfo.module.css"

const WalletInfo = ({ balance, address }) => {
    return (
        <div className={css.walletInfo}>
            <p className={css.walletText}>Balance: {balance} ETH</p>
            <p className={css.walletText}>Wallet address: {address}</p>
        </div>
    )
}

export default WalletInfo