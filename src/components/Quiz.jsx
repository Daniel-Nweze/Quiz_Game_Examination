import { useState, useEffect } from "react";
import Score from "./Score";
import Question from "./Question";

const Quiz = () => {
  // State variables
  const [questions, setQuestions] = useState([]);
  const [currentQuestionId, setCurrentQuestionId] = useState(1);
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [isAnswering, setIsAnswering] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [slyVisible, setSlyVisible] = useState(false);
  const [slyClass, setSlyClass] = useState("");

  // Fetch questions data from external JSON file
  useEffect(() => {
    fetch("/data/questions.json")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setQuestions(data);
      })
      .catch((error) => {
        console.error("Error when fetching the data:", error);
      });
  }, []);

  // Handle option selection for a question
  const handleOptionSelect = (option) => {
    if (isQuizFinished || isAnswering) return;
    setIsAnswering(true);
    setSelectedOption(option);
    const question = questions.find(
      (question) => question.id === currentQuestionId
    );

    // Check if the selected option is correct
    if (option === question.answer) {
      setFeedback("Correct");
      setScore((prevScore) => prevScore + 1);
      setSlyClass("nod");
    } else {
      setFeedback("Incorrect");
      setSlyClass("shake");
    }

    // After 1 second, move to the next question or finish the quiz
    setTimeout(() => {
      if (currentQuestionId === questions.length) {
        handleFinishQuiz();
      } else {
        handleNextQuestion();
      }

      setSlyClass("");
    }, 1000);
  };

  // Next Question
  const handleNextQuestion = () => {
    setTimeout(() => setTimeLeft(10), 0); 
    setSelectedOption(null);
    setFeedback("");
    setIsAnswering(false);
    
    if (currentQuestionId < questions.length) {
      setCurrentQuestionId((currentQuestion) => currentQuestion + 1);
   
    } else {
      handleFinishQuiz();
    }
  };

  // Start over
  const handleStartOver = () => {
    setCurrentQuestionId(1);
    setSelectedOption(null);
    setFeedback("");
    setScore(0);
    setTimeLeft(10);
    setIsQuizFinished(false);
    setIsAnswering(false);
    setHasStarted(false);
    setSlyVisible(false);
  };

  // Start 
  const handleStartQuiz = () => {
    setHasStarted(true);
    setSlyVisible(true);
  };

  // Finish 
  const handleFinishQuiz = () => {
    setIsQuizFinished(true);
    setFeedback(
      score + 1 === questions.length ? "Full Score!" : "Ouch! You failed.."
    );
  };

  // Rendering
  return (
    <div>
      <h1>Quiz Game</h1>

      {!hasStarted ? (
        <button onClick={handleStartQuiz}>Begin</button>
      ) : (
        <div>
          <span className="sly-container">
            <img
              id="sly-cooper"
              src="/videos/Sly_Cooper_from_Sly_2.webp"
              alt="Sly Cooper"
              className={`sly-cooper ${slyClass} ${slyVisible ? "show" : ""}`}
            />
          </span>
          <h2>
            Question: {currentQuestionId} of {questions.length}
          </h2>

          <div>
            {questions.length === 0 ? (
              <p>Loading questions...</p>
            ) : (
              <div>
                {isQuizFinished ? (
                  <div>
                    <div
                      className={`feedback-box  ${
                        feedback === "Full Score!" ? "full-score" : ""
                      } ${feedback === "Ouch! You failed.." ? "failure" : ""}`}
                    >
                      <p>{feedback}</p>
                      <Score score={score} questionsLength={questions.length} />
                    </div>
                    <button onClick={handleStartOver}>Start over</button>
                  </div>
                ) : (
                  <Question
                    question={questions.find((q) => q.id === currentQuestionId)}
                    handleOptionSelect={handleOptionSelect}
                    selectedOption={selectedOption}
                    timeLeft={timeLeft}
                    setTimeLeft={setTimeLeft}
                    handleNextQuestion={handleNextQuestion}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
