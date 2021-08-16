import React, { useState } from "react";

import Post from "./Post";

const Main = props => {
  const [postContent, setPostContent] = useState(null);

  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <main
          role="main"
          className="col-lg-12 ml-auto mr-auto"
          style={{ maxWidth: "1000px" }}
        >
          <div className="content mr-auto ml-auto">
            <p>&nbsp;</p>
            <form
              onSubmit={event => {
                event.preventDefault();
                const content = postContent.value;
                props.createPost(content);
              }}
            >
              <div className="form-group mr-sm-2">
                <input
                  id="postContent"
                  type="text"
                  ref={input => {
                    setPostContent(input);
                  }}
                  className="form-control"
                  placeholder="What's on your mind?"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary btn-block">
                Share
              </button>
            </form>
            <p>&nbsp;</p>
            {props.posts.map((post, key) => (
              <Post post={post} postKey={key} tipPost={props.tipPost} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Main;
