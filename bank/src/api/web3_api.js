import Web3 from 'web3';
import Token from '../abis/Token.json'
import dBank from '../abis/dBank.json'

const Web3API = {
  loadBlockchainData: async (dispatch, contract) => {
    
    if(typeof window.ethereum !== 'undefined') {
      const web3 = new Web3(window.ethereum);
      const netId = await web3.eth.net.getId();
      const accounts = await web3.eth.getAccounts();
  
      // load balance
      if(typeof accounts[0] !== "undefined") {
        const balance = await web3.eth.getBalance(accounts[0]);
        contract.setAccount(accounts[0]);
        contract.setBalance(balance);
        contract.setWeb3(web3);
        // setState({account: accounts[0], balance: balance, web3: web3});
      } else {
        window.alert("Please login with Metamask");
      }
  
      // Token
  
      //Bank
  
      try {
        const token = new web3.eth.Contract(Token.abi, Token.networks[netId].address);
        const dbank = new web3.eth.Contract(dBank.abi, dBank.networks[netId].address);
        const dBankAddress = dBank.networks[netId].address;
        const tokenBalance = await token.methods.balanceOf(accounts[0]).call();
        console.log(web3.utils.fromWei(tokenBalance));
        contract.setToken(token);
        contract.setDbank(dbank);
        contract.setDBankAddress(dBankAddress);

        // this.setState({token: token, dbank: dbank, dBankAddress: dBankAddress});
      } catch(ex) {
        console.log("Error", ex);
        window.alert("Contracts not deployed to the current network");
      }
      
    } else {
      window.alert("Please install MetaMask");
    }
  }
}

export default Web3API;