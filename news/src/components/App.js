import React, { Component } from "react";
import Web3 from "web3";
import "./App.css";
import Navbar from "./Navbar";
import News from "../abis/News.json";
import Main from "./Main";

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
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
    // Network Id
    const networkId = await web3.eth.net.getId();
    const networkData = News.networks[networkId];
    if (networkData) {
      const newsNetwork = new web3.eth.Contract(News.abi, networkData.address);
      this.setState({ newsNetwork });
      const postCount = await newsNetwork.methods.postCount().call();
      this.setState({ postCount });
      // Load Posts
      for (let i = 0; i <= postCount; i++) {
        const post = await newsNetwork.methods.posts(i).call();
        this.setState({
          posts: [...this.state.posts, post]
        });
      }
      this.setState({
        posts: this.state.posts.sort((a, b) => b.tipAmount - a.tipAmount)
      });
      this.setState({ loading: false });
    } else {
      window.alert("NewsNetwork contract not deployed to detected network.");
    }

    // Address

    // ABI
  }

  createPost(content) {
    this.setState({ loading: true });
    this.state.newsNetwork.methods
      .createPost(content)
      .send({ from: this.state.account })
      .once("receipt", receipt => {
        this.setState({ loading: false });
      });
  }

  tipPost(id, tipAmount) {
    this.setState({ loading: true });
    this.state.newsNetwork.methods
      .tipPost(id)
      .send({ from: this.state.account, value: tipAmount })
      .once("receipt", receipt => {
        this.setState({ loading: false });
      });
  }

  constructor(props) {
    super(props);
    this.state = {
      account: "",
      newsNetwork: null,
      postCount: 0,
      posts: [],
      loading: true
    };
    this.createPost = this.createPost.bind(this);
    this.tipPost = this.tipPost.bind(this);
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        {this.state.loading ? (
          <div id="loader" className="text-center mt-5">
            <p>Loading...</p>
          </div>
        ) : (
          <Main
            posts={this.state.posts}
            createPost={this.createPost}
            tipPost={this.tipPost}
          />
        )}
      </div>
    );
  }
}

export default App;
