import React from "react";
import "./style.css";

function Alert(props) {
  return <div className="alert">
    <br/><h1> Game Over</h1>
    <h3> Do you want to play again?</h3><br/>
    <button className="btn btn-danger replay">Replay</button><br/><br/><br/>

    <div className="mGif">
      <img className='mAlert' src='/img/cLL.gif' alt='win' />
    </div>
  </div>;
}

export default Alert;
