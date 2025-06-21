// import { useEffect } from 'react';
// import './counter.css'

// function CustomReactFlipCounter({ count }) {
//   console.log(count, "count");

//   const minutes = Math.floor(count / 10);
//   const seconds = count % 10;

//   useEffect(() => {
//     updateDisplay(minutes, 'minutePlay');
//     updateDisplay(seconds, 'secondPlay');
//   }, [minutes, seconds]);
//   const updateDisplay = (digit, className) => {
//     document.body.classList.remove("play");
//     const listItems = document.querySelectorAll(`ul.${className} li`);
//     listItems.forEach(item => {
//       item.classList?.remove("before", "active");
//     });
//     const activeItem = listItems[digit];
//     activeItem?.classList.add("active");
//     if (digit === 9) {
//       listItems[0]?.classList.add("before");
//     } else {
//       listItems[digit + 1]?.classList.add("before");
//     }
//     document.body.classList?.add("play");
//   };

//   return (
//     <>
//       <ul className="flip minutePlay">
//         {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
//           <li key={num}>
//             <a href="#">
//               <div className="up">
//                 <div className="shadow"></div>
//                 <div className="inn">{num}</div>
//               </div>
//               <div className="down">
//                 <div className="shadow"></div>
//                 <div className="inn">{num}</div>
//               </div>
//             </a>
//           </li>
//         ))}
//       </ul>
//       <ul className="flip secondPlay">
//         {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
//           <li key={num}>
//             <a href="#">
//               <div className="up">
//                 <div className="shadow"></div>
//                 <div className="inn">{num}</div>
//               </div>
//               <div className="down">
//                 <div className="shadow"></div>
//                 <div className="inn">{num}</div>
//               </div>
//             </a>
//           </li>
//         ))}
//       </ul>
//     </>
//   );
// }

// export default CustomReactFlipCounter;



// import React, { useEffect, useState } from "react";
// import FlipDigit from "./FlipDigit";

// const CustomReactFlipCounter = ({count}) => {
//   console.log(count, "count");
  
//   const [counter, setCounter] = useState(count);
//   const [prevCount, setPrevCount] = useState(30);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCounter(prev => {
//         const newCount = prev > 0 ? prev - 1 : 0;
//         setPrevCount(prev);
//         return newCount;
//       });
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   const currentDigits = String(counter).padStart(2, "0").split("");
//   const previousDigits = String(prevCount).padStart(2, "0").split("");

//   return (
//     <div className="container">
//       {currentDigits.map((digit, i) => {
//         const prev = previousDigits[i];
//         const key = `${i}-${digit}-${prev}`;
//         return <FlipDigit key={key} current={digit} previous={prev} />;
//       })}
//     </div>
//   );
// };

// export default CustomReactFlipCounter;







import React, { useEffect, useState, useRef } from "react";
import FlipDigit from "./FlipDigit";

const CustomReactFlipCounter = ({ count }) => {
  const [counter, setCounter] = useState(null);
  const [prevCount, setPrevCount] = useState(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (typeof count === "number" && count >= 0) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      setCounter(count);
      setPrevCount(count + 1);

      intervalRef.current = setInterval(() => {
        setCounter(prev => {
          if (prev > 0) {
            setPrevCount(prev);
            return prev - 1;
          } else {
            clearInterval(intervalRef.current);
            setPrevCount(0);
            return 0;
          }
        });
      }, 1000);
    }

    return () => clearInterval(intervalRef.current);
  }, [count]);
  if (typeof counter !== "number") return null;

  const currentDigits = String(counter).padStart(2, "0").split("");
  const previousDigits = String(prevCount).padStart(2, "0").split("");

  return (
    <div className="container">
      {currentDigits.map((digit, i) => {
        const prev = previousDigits[i];
        const key = `${i}-${digit}-${prev}`;
        return <FlipDigit key={key} current={digit} previous={prev} />;
      })}
    </div>
  );
};

export default CustomReactFlipCounter;