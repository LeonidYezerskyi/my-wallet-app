import PropTypes from 'prop-types';
import css from "./walletInfo.module.css"

const WalletInfo = ({ walletBalance, walletAddress }) => {
    return (
        <div className={css.walletInfo}>
            <p className={css.walletText}>{walletBalance}</p>
            <p className={css.walletText}>{walletAddress}</p>
        </div>
    )
}

WalletInfo.propTypes = {
    walletBalance: PropTypes.string.isRequired,
    walletAddress: PropTypes.string.isRequired,
}

export default WalletInfo