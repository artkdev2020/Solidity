import React, { Component } from "react";
import Web3 from "web3";
import "./App.css";
import Meme from "../abis/Meme.json";

const { create } = require("ipfs-http-client");

const ipfs = create({
  host: "ipfs.infura.io",
  port: "5001",
  protocol: "https"
});

class App extends Component {
  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    // Load account
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
    const networkId = await web3.eth.net.getId();
    const networkData = Meme.networks[networkId];
    if (networkData) {
      const contract = web3.eth.Contract(Meme.abi, networkData.address);
      this.setState({ contract });
      const memeHash = await contract.methods.get().call();
      this.setState({ memeHash });
    } else {
      window.alert("Smart contract not deployed to detected network.");
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      memeHash: "",
      contract: null,
      web3: null,
      buffer: null,
      account: null
    };
  }

  captureFile = event => {
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) });
      console.log("buffer", this.state.buffer);
    };
  };

  onSubmit = async event => {
    event.preventDefault();
    console.log("Submitting file to ipfs...");
    let cid = await ipfs.add(this.state.buffer);

    // let hash = cid._baseCache.get("z");
    let hash = cid.path;

    console.log(hash);
    this.state.contract.methods
      .set(hash)
      .send({ from: this.state.account })
      .on("confirmation", () => {
        this.setState({ memeHash: hash });
      });
  };

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="http://www.dappuniversity.com/bootcamp"
            target="_blank"
            rel="noopener noreferrer"
          >
            Dapp University
          </a>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <a
                  href="http://www.dappuniversity.com/bootcamp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={`https://ipfs.infura.io/ipfs/${this.state.memeHash}`}
                    alt="meme for day"
                  />
                </a>
                <p>&nbsp;</p>
                <h2>Change Meme</h2>
                <form onSubmit={this.onSubmit}>
                  <input type="file" onChange={this.captureFile} />
                  <input type="submit" />
                </form>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
