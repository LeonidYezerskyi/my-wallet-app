import PropTypes from 'prop-types';
import css from "./walletInfo.module.css"

const WalletInfo = ({ balance, address }) => {
    return (
        <div className={css.walletInfo}>
            <p className={css.walletText}>{balance}</p>
            <p className={css.walletText}>{address}</p>
        </div>
    )
}

WalletInfo.propTypes = {
    balance: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
}

export default WalletInfo