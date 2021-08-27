import React from "react";

const Input = props => {
  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        const content = props.postContent.value;
        props.createPost(content);
      }}
    >
      <div className="form-group mr-sm-2">
        <input
          id="postContent"
          type="text"
          ref={input => {
            props.setPostContent(input);
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
  );
};

export default Input;
