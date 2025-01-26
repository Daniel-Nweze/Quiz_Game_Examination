const Score = ({ score, questionsLength}) => {
  return (
    <p>
      Score: {score} / {questionsLength}
    </p>
  );
};

export default Score;
