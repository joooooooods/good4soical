type AnswerProps = {
    answer: string | string[];
};

const AnswerBox = ({ answer = "" }: AnswerProps) => {
    return (
        <div className="bg-violet-400 bg-opacity-30 border-purple-700 rounded-md mt-[20px] h-[40px] px-[20px] flex items-center">
            {typeof answer === "string" ? answer : answer.join(", ")}
        </div>
    );
};

export default AnswerBox;
