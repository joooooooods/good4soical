type AnswerProps = {
  answer: string;
};

const AnswerBox = ({ answer = "" }: AnswerProps) => {
  return (
    <div className="bg-blue-500 rounded-md mt-[20px] h-[40px] px-[20px] flex items-center">
      {answer}
    </div>
  );
};

export default AnswerBox;
