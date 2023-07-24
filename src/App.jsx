import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './App.module.css'
import ConnectWallet from './components/ConnectWallet/ConnectWallet'
import Logo from './components/Logo/Logo'
import TransferToken from './components/TransferToken/TransferToken'
import WalletInfo from './components/WalletInfo/WalletInfo'
import Footer from './components/footer/Footer';

function App() {
  const [walletAddress, setWalletAddress] = useState('');
  const [walletBalance, setWalletBalance] = useState('');
  const [balanceInEther, setWalletBalanceInEther] = useState('');
  const [signer, setSigner] = useState(null);

  return (
    <>
      <div className={css.headerWrapper}>
        <Logo />
        <div>
          {walletAddress !== "" ?
            (<WalletInfo balance={walletBalance} address={walletAddress} />) :
            (<ConnectWallet
              setWalletAddress={setWalletAddress}
              setWalletBalance={setWalletBalance}
              setWalletBalanceInEther={setWalletBalanceInEther}
              setSigner={setSigner}
            />)}

        </div>
      </div>
      <TransferToken signer={signer} balanceInEther={balanceInEther} />
      <Footer />
      <ToastContainer />
    </>
  )
}

export default App
