import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TransferToken from './components/TransferToken/TransferToken'
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';

function App() {
  const [balanceInEther, setWalletBalanceInEther] = useState('');
  const [signer, setSigner] = useState(null);

  return (
    <>
      <Header setSigner={setSigner} setWalletBalanceInEther={setWalletBalanceInEther} />
      <TransferToken signer={signer} balanceInEther={balanceInEther} />
      <Footer />
      <ToastContainer />
    </>
  )
}

export default App
