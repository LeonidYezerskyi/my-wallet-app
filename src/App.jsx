import { useState } from 'react';
import css from './App.module.css'
import ConnectWallet from './components/ConnectWallet/ConnectWallet'
import Logo from './components/Logo/Logo'
import TransferToken from './components/TransferToken/TransferToken'
import WalletInfo from './components/WalletInfo/WalletInfo'
import Footer from './components/footer/Footer';

function App() {
  const [walletAddress, setWalletAddress] = useState('');
  const [walletBalance, setWalletBalance] = useState('');

  return (
    <>
      <div className={css.headerWrapper}>
        <Logo />
        <div className={css.infoWrapper}>
          {walletAddress !== "" ? <WalletInfo balance={walletBalance} address={walletAddress} /> : ""}
          <ConnectWallet
            setWalletAddress={setWalletAddress}
            setWalletBalance={setWalletBalance}
          />
        </div>
      </div>
      <TransferToken />
      <Footer />
    </>
  )
}

export default App
