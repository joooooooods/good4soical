import { useState } from "react";
type ResultProps = {
    result: string[];
};

const ResultBox = ({ result = [""] }: ResultProps) => {
    const [clickedDate, setClickedDate] = useState(-1);
    const [disabledDates, setDisabledDates] = useState<string[]>([]);

    const handleClick = (date: string, index: number) => {
        // 이미 선택된 날짜인지 확인
        const newDisabledDates = result
            .filter((item) => item.includes(date))
            .map((item) => item.split("_")[1]);
        console.log("newDisabledDates>>", newDisabledDates);
        setDisabledDates(newDisabledDates);
        setClickedDate(index);
    };

    return (
        <div className="flex flex-col items-end">
            {result.map((item, index) => {
                const currentDate = item.split("_")[1];
                return (
                    <button
                        key={index}
                        className={`${
                            clickedDate === index
                                ? "bg-yellow-300"
                                : disabledDates.includes(currentDate)
                                ? "bg-gray-500"
                                : "bg-blue-500"
                        } rounded-md mt-[10px] h-[40px] px-[20px] flex items-center ${
                            disabledDates.includes(item.split("_")[1])
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                        }`}
                        onClick={() => handleClick(item.split("_")[1], index)}
                        disabled={disabledDates.includes(item.split("_")[1])}
                    >
                        {item.split("_")[0]}
                    </button>
                );
            })}
        </div>
    );
};

export default ResultBox;
