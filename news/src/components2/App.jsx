import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Web3Api } from "../api/api";
import PostPage from "./PostsPage";

const App = () => {
  const [account, setAccount] = useState("");
  const [newsNetwork, setNewsNetwork] = useState(null);
  const [postCount, setPostCount] = useState(0);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    Web3Api.loadWeb3();
  }, []);

  useEffect(() => {
    Web3Api.loadBlockchainData(
      setAccount,
      setNewsNetwork,
      setPostCount,
      setPosts
    );
  }, []);

  return (
    <div>
      <Navbar account={account} />
      <PostPage account={account} posts={posts} newsNetwork={newsNetwork} />
    </div>
  );
};

export default App;
