import { React, useState , useEffect } from "react";

export default function QuestionTimer({ timeout, onTimeout }) {
  //remaining time bar
  const [remainingTime, setremainingTime] = useState(timeout);

 useEffect(() =>{
    console.log("SETTING TIMEOUT")
    const timer = setTimeout(onTimeout, timeout);
    return () => {
      clearTimeout(timer);
    }
 } , [onTimeout, timeout])

  useEffect(() => { //if wont use useeffect to this always this interval will startover as component renders
    console.log("SETTING INTERVAL")
    const interval =  setInterval(()=>{
      setremainingTime(prevremainingTime=>
          prevremainingTime-100
      );
    },100);
    return () =>{};
    clearInterval(interval);

  } , []);
  

  return (
    
      <progress id="question-timer" max={timeout} value = {remainingTime}/>
    
  );
}
