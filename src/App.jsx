import css from './App.module.css'
import ConnectWallet from './components/ConnectWallet/ConnectWallet'
import Logo from './components/Logo/Logo'
import TransferToken from './components/TransferToken/TransferToken'
// import WalletInfo from './components/WalletInfo/WalletInfo'

function App() {
  // const balance = 10.5;
  // const address = '0xAbCdEfGhIjKlMnOpQrStUvWxYz';

  return (
    <>
      <div className={css.headerWrapper}>
        <Logo />
        <div className={css.infoWrapper}>
          <ConnectWallet />
          {/* <WalletInfo balance={balance} address={address} /> */}
        </div>
      </div>
      <TransferToken />
    </>
  )
}

export default App
