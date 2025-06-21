import React, { useEffect, useState } from "react";
import "./Counter.css";

const FlipDigit = ({ current, previous, key }) => {
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    if (current !== previous) {
      setFlip(true);
      const timeout = setTimeout(() => {
        setFlip(false);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [current, previous]);

  return (

    <ul className={`flip ${flip ? "secondPlay" : ""}`}>
      <li className="before">
        <div className="up">
          <div className="shadow"></div>
          <div className="inn">{previous}</div>
        </div>
        <div className="down">
          <div className="shadow"></div>
          <div className="inn">{previous}</div>
        </div>
      </li>
      <li className="active">
        <div className="up">
          <div className="shadow"></div>
          <div className="inn">{current}</div>
        </div>
        <div className="down">
          <div className="shadow"></div>
          <div className="inn">{current}</div>
        </div>
      </li>
    </ul>

  );
};



export default FlipDigit