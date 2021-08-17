import React, { Component } from "react";
import "./App.css";
import Web3 from "web3";
import Color from "../abis/Color.json";
import Navbar from "./Navbar";
import PageColors from "./page_colors/PageColors";

class App extends Component {
  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlokchainData();
  }

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
  }

  async loadBlokchainData() {
    const web3 = window.web3;

    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });

    const networkId = await web3.eth.net.getId();
    const networkData = Color.networks[networkId];

    if (networkData) {
      const abi = Color.abi;
      const address = networkData.address;
      const contract = new web3.eth.Contract(abi, address);

      this.setState({ contract });
      const totalSupply = await contract.methods.totalSupply().call();
      this.setState({ totalSupply });

      for (let i = 1; i <= totalSupply; i++) {
        const color = await contract.methods.colors(i - 1).call();
        this.setState({
          colors: [...this.state.colors, color]
        });
      }
    } else {
      window.alert("Smart contract not deployed to detected network.");
    }
  }

  mint = color => {
    this.state.contract.methods
      .mint(color)
      .send({ from: this.state.account })
      .once("receipt", receipt => {
        this.setState({
          colors: [...this.state.colors, color]
        });
      });
  };

  constructor(props) {
    super(props);
    this.state = {
      account: "",
      contract: null,
      totalSupply: 0,
      colors: []
    };
  }

  render() {
    return (
      <div className="container-fluid">
        <Navbar account={this.state.account} />
        <PageColors mint={this.mint} colors={this.state.colors} />
      </div>
    );
  }
}

export default App;
