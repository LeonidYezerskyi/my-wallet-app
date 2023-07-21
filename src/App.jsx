import './App.css'
import ConnectWallet from './components/ConnectWallet/ConnectWallet'
import Logo from './components/Logo/Logo'
import TransferToken from './components/TransferToken/TransferToken'
import WalletInfo from './components/WalletInfo/WalletInfo'

function App() {

  return (
    <>
      <Logo />
      <ConnectWallet />
      <WalletInfo />
      <TransferToken />
    </>
  )
}

export default App
