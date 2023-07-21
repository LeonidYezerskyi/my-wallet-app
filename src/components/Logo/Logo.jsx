import css from "./logo.module.css"
import wallet from "../../assets/wallet.svg"

const Logo = () => {
    return (
        <div className={css.logoWrapper}>
            <p className={css.logoText}>CryptoWALLET</p>
            <img className={css.logoImg} src={wallet} alt="logo" />
        </div>
    )
}

export default Logo