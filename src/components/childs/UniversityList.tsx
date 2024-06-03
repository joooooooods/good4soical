import { QuestionFetchProps, QuestionType } from "@/service/fetch";
import { useMemo, useState } from "react";

type Props = {
    universities: QuestionFetchProps;
    selectedUniversity: string[];
    onItemClick: (item: QuestionType[]) => void;
    onCompleteClick: () => void;
};

const UniversityList = ({
    universities = [],
    selectedUniversity,
    onItemClick,
    onCompleteClick,
}: Props) => {
    const allUniversities = useMemo(() => {
        const names = universities.map((item) => item.university);
        return [...new Set(names)];
    }, [universities]);

    const getButtonClassForStepA = (university: string) => {
        let isAllSelctable = true;
        if (selectedUniversity.length === 0)
            return "bg-white border border-black";

        // 현재 선택된 대학의 날짜들
        const disabledDates = universities
            .filter((item) => item.university === university)
            .map((mapItem) => mapItem.date);

        // 사용자가 선택한 대학들
        const filteredDates = universities.filter((item) =>
            selectedUniversity.includes(item.university),
        );

        filteredDates.forEach((allItem) => {
            if (disabledDates.includes(allItem.date)) {
                isAllSelctable = false;
            }
        });

        if (selectedUniversity.includes(university))
            return "bg-violet-400 bg-opacity-30 border-purple-700";
        if (!isAllSelctable) return "bg-gray-500 opacity-50 cursor-not-allowed";
        return "bg-white border border-black";
    };

    const handleClickItem = (uniersity: string) => {
        const filterItem = universities.filter(
            (item) => uniersity === item.university,
        );
        if (!filterItem) return;
        onItemClick(filterItem);
    };

    return (
        <>
            <p className="text font-bold text-[18px] text-purple-700 mt-12">
                지원할 수 있는 대학 목록이에요.
            </p>
            <p className="text-center font-bold text-[14px] text-gray-400 mt-5">
                대학을 선택하면 학과를 고를 수 있어요.
                <br />
                중복 지원이 어려운 일정은 자동으로 제외돼요.
            </p>

            {allUniversities.map((item, index) => {
                const buttonClass = getButtonClassForStepA(item);

                return (
                    <button
                        key={index}
                        className={`w-full h-[40px] max-w-[300px] rounded-md mt-[10px] px-[20px] flex items-center justify-center ${buttonClass}`}
                        onClick={() => handleClickItem(item)}
                        disabled={buttonClass.includes("cursor-not-allowed")}
                    >
                        {item}
                    </button>
                );
            })}
            <button
                className="w-full h-[40px] max-w-[300px] bg-purple-700 text-white rounded-md mt-[10px] px-[20px] flex items-center justify-center"
                onClick={onCompleteClick}
            >
                원하는 대학을 모두 선택했어요.
            </button>
        </>
    );
};

export default UniversityList;
