import { useEffect } from "react";

const Timer = ({timeLeft, setTimeLeft, handleNextQuestion}) => {
  useEffect(() => {
    if(timeLeft === 0){
      handleNextQuestion();
    }

    const timer = setTimeout(() => {
      setTimeLeft((prevTime) => prevTime -1);
    }, 1000);

    return () => clearTimeout(timer);
    
  }, [timeLeft, handleNextQuestion]);

  return <p className="timer">{timeLeft}</p>;
};

export default Timer;