import Timer from "./Timer";

const Question = ({
  question,
  selectedOption,
  handleOptionSelect,
  timeLeft,
  setTimeLeft,
  handleNextQuestion,
}) => {
  return (
    <div>
      <h3>{question.question}</h3>
      <ul className="option-container">
        {question.options.map((option, index) => (
          <li
            key={index}
            onClick={() => handleOptionSelect(option)}
            className={`option ${
              selectedOption === option
                ? option === question.answer
                  ? "correct"
                  : "incorrect"
                : ""
            }`}
          >
            {option}
          </li>
        ))}
      </ul>
      <Timer
        timeLeft={timeLeft}
        setTimeLeft={setTimeLeft}
        handleNextQuestion={handleNextQuestion}
      />
    </div>
  );
};

export default Question;
