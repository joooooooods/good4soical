import { QuestionType } from "@/service/fetch";
import { useState } from "react";

type Props = {
    selectedUniversity: QuestionType[];
    onClickNext: (items: QuestionType[]) => void;
    onClickPrev: () => void;
};

const MajorList = ({ selectedUniversity, onClickNext, onClickPrev }: Props) => {
    const [selectedList, setSelectedList] = useState<QuestionType[]>([]);

    const getResultButtonClass = (
        major: string,
        currentDate: string,
    ): string => {
        if (selectedList.length === 0) return "bg-white border border-black";
        if (selectedList.filter((item) => item?.major === major).length > 0)
            return "border bg-violet-400 bg-opacity-30 border-purple-700";
        if (
            selectedList.filter((item) => item?.date === currentDate).length > 0
        ) {
            return "bg-gray-500 opacity-50 cursor-not-allowed";
        }

        return "bg-white border border-black";
    };

    const handleItemClick = (selected: QuestionType) => {
        setSelectedList((prev) => {
            if (
                prev.filter((item) => item?.major === selected?.major).length >
                0
            )
                return prev.filter((item) => item?.major !== selected?.major);
            return [...prev, selected];
        });
    };

    return (
        <div className="flex flex-col items-center w-full">
            {selectedUniversity.map((item, index) => {
                const { major, date } = item;
                const buttonClass = getResultButtonClass(major, date);
                return (
                    <button
                        key={index}
                        className={`w-full h-[40px] max-w-[300px] border border-transparent rounded-md mt-[10px] px-[20px] flex items-center justify-center ${buttonClass}`}
                        onClick={() => handleItemClick(item)}
                        disabled={buttonClass.includes("cursor-not-allowed")}
                    >
                        {major}
                    </button>
                );
            })}
            <div className="flex mt-[10px] space-x-4 w-full max-w-[300px]">
                <button
                    className="w-1/2 h-[40px] flex items-center justify-center bg-purple-700 text-white rounded-[10px]"
                    onClick={onClickPrev}
                >
                    이전
                </button>
                <button
                    className="w-1/2 h-[40px] flex items-center justify-center bg-purple-700 text-white rounded-[10px]"
                    onClick={() => onClickNext(selectedList)}
                >
                    다음
                </button>
            </div>
        </div>
    );
};

export default MajorList;
