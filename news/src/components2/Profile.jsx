import React from "react";

function Profile(props) {
  return (
    <div className="text-center">
      Id : {props.state.id} / Name : {props.state.userName}
      <button onClick={() => props.dispatch({ type: "setNastya" })}>
        setNastya
      </button>
      <button onClick={() => props.dispatch({ type: "setVaha" })}>
        setVaha
      </button>
      <button onClick={() => props.dispatch({ type: "setMasha" })}>
        setMasha
      </button>
      <button onClick={() => props.dispatch({ type: "setGoga" })}>
        setGoga
      </button>
    </div>
  );
}

export default Profile;
