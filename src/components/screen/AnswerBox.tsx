type AnswerProps = {
    answer: string | string[];
};

const AnswerBox = ({ answer = "" }: AnswerProps) => {
    return (
        <div className="bg-blue-500 rounded-md mt-[20px] h-[40px] px-[20px] flex items-center">
            {typeof answer === "string" ? answer : answer.join(", ")}
        </div>
    );
};

export default AnswerBox;
