import React, { useState, useEffect, useMemo } from "react";
import UniversityList from "../childs/UniversityList";
import MajorList from "../childs/MajorList";
import Detail from "../childs/Detail";
import { QuestionFetchProps, QuestionType } from "@/service/fetch";

type ResultProps = {
    result: QuestionFetchProps | null;
};

const ResultBox = ({ result = [] }: ResultProps) => {
    const [tempalry, setTempalry] = useState<QuestionType[]>([]);
    const [selectedUniversities, setSelectedUniversities] = useState<string[]>(
        [],
    );
    const [selectedReslut, setSelectedReslut] = useState<QuestionType[]>([]);
    const [currentStep, setCurrentStep] = useState<"a" | "b" | "details">("a");

    const handleCompleteUniversity = () => {
        if (selectedUniversities.length === 0) {
            alert("대학을 선택해주세요.");
            return;
        }
        setCurrentStep("details");
    };

    const handleUniversityItemClick = (item: QuestionType[]) => {
        setTempalry(item);
        setCurrentStep("b");
    };

    const handlePrevClick = () => {
        setSelectedReslut([]);
        setCurrentStep("a");
    };

    const handleNextClick = (univertisie: QuestionType[]) => {
        setSelectedUniversities([
            ...selectedUniversities,
            univertisie?.[0]?.university,
        ]);
        setSelectedReslut([...selectedReslut, ...univertisie]);
        setTempalry([]);
        setCurrentStep("a");
    };

    return (
        <div className="flex flex-col items-center w-full">
            {currentStep === "a" && (
                <UniversityList
                    universities={result || []}
                    selectedUniversity={selectedUniversities}
                    onItemClick={(item) => {
                        handleUniversityItemClick(item);
                    }}
                    onCompleteClick={handleCompleteUniversity}
                />
            )}

            {currentStep === "b" && setTempalry.length > 0 && (
                <MajorList
                    selectedUniversity={tempalry}
                    onClickNext={handleNextClick}
                    onClickPrev={handlePrevClick}
                ></MajorList>
            )}

            {currentStep === "details" && selectedReslut.length > 0 && (
                <Detail
                    selectedUniversities={selectedReslut}
                    onClicKStep={setCurrentStep}
                />
            )}
        </div>
    );
};

export default ResultBox;
