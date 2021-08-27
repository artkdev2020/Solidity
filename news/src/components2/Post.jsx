import React from "react";
import Identicon from "identicon.js";

const Post = props => {
  return (
    <div className="card mb-4" key={props.postKey}>
      <div className="card-header">
        <img
          className="mr-2"
          width="30"
          height="30"
          alt="icon"
          src={`data:image/png;base64,${new Identicon(
            props.post.author,
            30
          ).toString()}`}
        />
        <small className="text-muted">{props.post.author}</small>
      </div>
      <ul id="postList" className="list-group list-group-flush">
        <li className="list-group-item">
          <p>{props.post.content}</p>
        </li>
        <li key={props.postKey} className="list-group-item py-2">
          <small className="float-left mt-1 text-muted">
            TIPS:{" "}
            {window.web3.utils.fromWei(
              props.post.tipAmount.toString(),
              "Ether"
            )}{" "}
            ETH
          </small>
          <button
            className="btn btn-link btn-sm float-right pt-0"
            name={props.post.id}
            onClick={event => {
              let tipAmount = window.web3.utils.toWei("0.1", "Ether");
              props.tipPost(event.target.name, tipAmount);
            }}
          >
            TIP 0.1 ETH
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Post;
