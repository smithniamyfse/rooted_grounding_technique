import React, { useState, useEffect } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import "./BreathingTimer.css";

function BreathingTimer() {
  const [isExhaling, setIsExhaling] = useState(false);
  const [key, setKey] = useState(0);

  const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      if (isExhaling) {
        // Render 0 when the exercise is complete
        return (
          <div className="time-container">
            <h1>Done</h1>
            <div className="time">0</div>
          </div>
        );
      } else {
        setTimeout(() => {
          setIsExhaling(true);
          setKey((prevKey) => prevKey + 1);
        }, 2000);
      }
    }

    return (
      <div className="time-container">
        <h1>{isExhaling ? "Exhale" : "Inhale"}</h1>
        <div className="time">{remainingTime}</div>
      </div>
    );
  };

  return (
    <div>
      <CountdownCircleTimer
        key={key}
        isPlaying
        duration={isExhaling ? 6 : 3}
        colors={["#004777", "#F7B801"]}
        colorsTime={[3, 6]}
        // colors={[isExhaling ? "#A30000" : "#004777"]} // Enclose the color in an array to keep it static
        // trailColor="#d9d9d9"
      >
        {renderTime}
      </CountdownCircleTimer>
    </div>
  );
}

export default BreathingTimer;





// import React, { useState, useEffect } from "react";
// import { CountdownCircleTimer } from "react-countdown-circle-timer";
// import "./BreathingTimer.css";

// function BreathingTimer() {
//   const [isExhaling, setIsExhaling] = useState(false);
//   const [isComplete, setIsComplete] = useState(false);
//   const [key, setKey] = useState(0); // To reset the timer

//   const renderTime = ({ remainingTime }) => {
//     if (remainingTime === 0) {
//       if (isExhaling) {
//         setIsComplete(true);
//       } else {
//         // Add a delay before transitioning to exhaling
//         setTimeout(() => {
//           setIsExhaling(true);
//           setKey((prevKey) => prevKey + 1); // Increment key to reset the timer
//         }, 2000); // 2-second delay
//       }
//     }

//     return (
//       <div>
//         <h1>{isComplete ? "Done" : isExhaling ? "Exhale" : "Inhale"}</h1>
//         <div>{isComplete ? 0 : remainingTime}</div>
//       </div>
//     );
//   };

//   return (
//     <div>
//       {!isComplete && (
//         <CountdownCircleTimer
//           key={key} // Reset the timer when the key changes
//           isPlaying
//           duration={isExhaling ? 6 : 3} // Exhale for 6 seconds, inhale for 3 seconds
//           colors={isExhaling ? ["#A30000"] : ["#004777"]}
//         >
//           {renderTime}
//         </CountdownCircleTimer>
//       )}
//     </div>
//   );
// }

// export default BreathingTimer;



// import React, { useState } from "react";
// import { CountdownCircleTimer } from "react-countdown-circle-timer";
// import "./BreathingTimer.css";

// function BreathingTimer() {
//   const [isExhaling, setIsExhaling] = useState(false);
//   const [key, setKey] = useState(0); // To reset the timer

//   const renderTime = ({ remainingTime }) => {
//     if (remainingTime === 0) {
//       setIsExhaling(!isExhaling);
//       setKey((prevKey) => prevKey + 1); // Increment key to reset the timer
//     }

//     return (
//       <div>
//         <h1>{isExhaling ? "Exhale" : "Inhale"}</h1>
//         <div>{remainingTime}</div>
//       </div>
//     );
//   };

//   return (
//     <div>
//       <CountdownCircleTimer
//         key={key} // Reset the timer when the key changes
//         isPlaying
//         duration={isExhaling ? 6 : 3} // Exhale for 6 seconds, inhale for 3 seconds
//         colors={isExhaling ? ["#A30000"] : ["#004777"]}
//       >
//         {renderTime}
//       </CountdownCircleTimer>
//     </div>
//   );
// }

// export default BreathingTimer;


// function startBreathingExercise() {
//     let inhaleTime = 3;
//     let exhaleTime = 6;
  
//     // Inhale Counter
//     let inhaleCounter = setInterval(function () {
//       document.getElementById('inhale-counter').innerText = inhaleTime;
//       inhaleTime--;
//       if (inhaleTime < 0) {
//         clearInterval(inhaleCounter);
//         document.getElementById('inhale-counter').innerText = '';
  
//         // Exhale Counter
//         let exhaleCounter = setInterval(function () {
//           document.getElementById('exhale-counter').innerText = exhaleTime;
//           exhaleTime--;
//           if (exhaleTime < 0) {
//             clearInterval(exhaleCounter);
//             document.getElementById('exhale-counter').innerText = '';
//           }
//         }, 1000);
//       }
//     }, 1000);
//   }
  
//   // Call the function to start the exercise
//   startBreathingExercise();
  