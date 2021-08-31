import Web3 from "web3";
import Color from "../abis/Color.json";

export const Web3Api = {
  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currrentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  },

  async loadBlockchainData(
    setAccount,
    setContract,
    setTotalSupply,
    setColors,
    setOwner
  ) {
    const web3 = window.web3;

    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);

    const networkId = await web3.eth.net.getId();
    const networkData = Color.networks[networkId];

    if (networkData) {
      const abi = Color.abi;
      console.log(abi);
      const address = networkData.address;
      const contract = new web3.eth.Contract(abi, address);

      setContract(contract);

      const totalSupply = await contract.methods.totalSupply().call();
      setTotalSupply(totalSupply);

      let result = [];
      for (let i = 1; i < totalSupply; i++) {
        // const color = await contract.methods.colors(i).call();
        result.push(await contract.methods.coins(i).call());
      }
      setColors(result);
      setOwner(await contract.methods.owner().call());

      // console.log(result);

      // const resCoins = [];

      // for (let i = 0; i < totalSupply; i++) {
      //   resCoins.push(await contract.methods.coins(i).call());
      // }

      // resCoins.forEach((item) => {
      //   console.log(parseInt(item.id));
      //   console.log(item.name);
      //   console.log(parseInt(item.price));
      // });
    } else {
      window.alert("Smart contract not deployed to detected network.");
    }
  },
};
