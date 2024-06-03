"use client";
import { use, useCallback, useState, useEffect } from "react";
import RangeBar from "@/components/common/RangeBar";
import Questions from "@/components/screen/Questions";
import AnswerBox from "@/components/screen/AnswerBox";
import useFunnel from "@/hooks/useFunnel";
import { QUESTIONS, TITLES } from "@/constant/question";
import { QuestionFetchProps, fetchQuestion } from "@/service/fetch";
import ResultBox from "@/components/screen/ResultBox";
import Banner from "./banner";

type AnswerType = {
    q1: string[];
    q2: string;
    q3: string;
    q4: string;
    q5: string;
    // q6: string;
};

type AnswerKey = keyof AnswerType;

export default function Layout() {
    const [answer, setAnswer] = useState<AnswerType>({
        q1: Array(6).fill(""),
        q2: "",
        q3: "",
        q4: "",
        q5: "",
        // q6: "",
    });

    const { Funnel, Step, setStep, currentStep } = useFunnel("q1");
    const [isShowQuestion, setIsShowQuestion] = useState(Array(6).fill(false));
    const [questions, setQuestions] = useState([
        "q1",
        "q2",
        "q3",
        "q4",
        "q5",
        // "q6",
    ]);
    const [curStep, setCurStep] = useState<AnswerKey>("q1"); // 현재 진행중인 질문
    const [lastStep, setLastStep] = useState<AnswerKey>(); // 가장 최근 질문
    const [result, setResult] = useState<QuestionFetchProps | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleAnswer = (
        value: string | string[],
        key: string,
        step: string,
    ) => {
        setAnswer((prevAnswer) => ({ ...prevAnswer, [key]: value }));
        setStep(step);
        // fetchq1();
    };

    const handleClickRequest = (value: AnswerKey) => {
        // setAnswer({ ...answer, q6: value });
        setAnswer({ ...answer });
        fetchQuestion(answer);
    };

    const handleClickRequest2 = async () => {
        setIsLoading(true);
        try {
            const res = await fetchQuestion(answer);
            console.log("res>>", res);
            setResult(res);
            setIsLoading(false);
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };

    const calRangeBarProps = useCallback(() => {
        const index = Object.keys(QUESTIONS).indexOf(currentStep);
        const maxStep = Object.keys(QUESTIONS).length;
        const step = index + 1;
        return {
            width: (step / maxStep) * 100,
            maxStep,
            step,
        };
    }, [currentStep]);

    return (
        <main className="p-[20px]">
            {/* result가 없을 때만 Banner, RangeBar, 그리고 질문들을 렌더링 */}
            {!result && !isLoading && (
                <>
                    <Banner />
                    <RangeBar {...calRangeBarProps()} />

                    {curStep === "q1" && (
                        <p className="mb-[20px] font-bold">
                            몇 가지 정보를 알려주시면 <br />
                            지원할 수 있는 대학을 추천해드립니다.
                        </p>
                    )}

                    {questions.map((question, idx) => {
                        return curStep === question ? (
                            <Questions
                                key={idx}
                                title={TITLES[question as keyof typeof TITLES]} // Explicitly define the type of TITLES
                                questions={
                                    QUESTIONS[question as keyof typeof TITLES]
                                }
                                isDuplicate={question === "q1"}
                                onSubmit={(value) => {
                                    handleAnswer(
                                        value,
                                        question,
                                        `q${
                                            parseInt(curStep[1]) + 1
                                        }` as keyof AnswerType,
                                    );

                                    if (lastStep) {
                                        setCurStep(lastStep);
                                        setLastStep(undefined);
                                    } else {
                                        setCurStep(
                                            `q${
                                                parseInt(curStep[1]) + 1
                                            }` as AnswerKey,
                                        );
                                    }

                                    if (curStep === "q5") {
                                        handleClickRequest2();
                                    }
                                }}
                            />
                        ) : answer[question as keyof AnswerType] ? (
                            <div className="flex flex-col items-end" key={idx}>
                                <AnswerBox
                                    answer={
                                        answer[question as keyof typeof TITLES]
                                    }
                                />
                                <button
                                    onClick={() => {
                                        setCurStep(
                                            question as keyof AnswerType,
                                        );
                                        setLastStep(
                                            curStep as keyof AnswerType,
                                        );
                                    }}
                                >
                                    수정
                                </button>
                            </div>
                        ) : null;
                    })}
                </>
            )}

            {/* 로딩 상태를 나타내는 컴포넌트 */}
            {isLoading && (
                <div className="flex flex-col items-center justify-center h-screen">
                    <div className="relative w-16 h-16 mb-10">
                        <div className="absolute inset-0 rounded-full border-4 border-t-4 border-t-purple-700 border-gray-200 animate-spin"></div>
                    </div>
                    <p className="text-center text-lg font-bold text-gray-700">
                        당신에게 꼭 맞는 대학을 찾고 있습니다.
                    </p>
                </div>
            )}

            {/* result가 있을 때만 ResultBox를 렌더링 */}
            {result?.length && !isLoading && <ResultBox result={result} />}
        </main>
    );
}
