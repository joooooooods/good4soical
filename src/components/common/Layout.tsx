"use client";
import { use, useCallback, useState, useEffect } from "react";
import RangeBar from "@/components/common/RangeBar";
import Questions from "@/components/screen/Questions";
import AnswerBox from "@/components/screen/AnswerBox";
import useFunnel from "@/hooks/useFunnel";
import { QUESTIONS, TITLES } from "@/constant/question";
import { fetchQuestion } from "@/service/fetch";
import ResultBox from "@/components/screen/ResultBox";

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
    const [result, setResult] = useState<string[]>([]);

    useEffect(() => {}, []);

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

    const handleClickRequest2 = () => {
        setAnswer((prevAnswer) => ({ ...prevAnswer }));
        fetchQuestion(answer).then((res) => {
            console.log("res>>", res);
            setResult(res);
        });
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
            <RangeBar {...calRangeBarProps()} />

            {questions.map((question, idx) => {
                return curStep === question ? (
                    <Questions
                        key={idx}
                        title={TITLES[question as keyof typeof TITLES]} // Explicitly define the type of TITLES
                        questions={QUESTIONS[question as keyof typeof TITLES]}
                        isDuplicate={question === "q1" ? true : false}
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
                            } else
                                setCurStep(
                                    `q${parseInt(curStep[1]) + 1}` as AnswerKey,
                                );

                            if (curStep === "q5") {
                                handleClickRequest2();
                            }
                        }}
                    ></Questions>
                ) : answer[question as keyof AnswerType] ? (
                    <div className="flex flex-col items-end" key={idx}>
                        <AnswerBox
                            answer={answer[question as keyof typeof TITLES]}
                        />
                        <button
                            onClick={() => {
                                setCurStep(question as keyof AnswerType);
                                setLastStep(curStep as keyof AnswerType);
                            }}
                        >
                            수정
                        </button>
                    </div>
                ) : null;
            })}

            {result.length > 0 ? <ResultBox result={result}></ResultBox> : null}

            {/* <ResultBox
                result={[
                    "대학교 A 학과 B 전공_2024-05-20",
                    "대학교 C 학과 D 전공_2024-05-21",
                    "대학교 E 학과 F 전공_2024-05-22",
                    "대학교 G 학과 H 전공_2024-05-22",
                    "대학교 I 학과 J 전공_2024-05-22",
                    "대학교 K 학과 L 전공_2024-05-23",
                    "대학교 M 학과 N 전공_2024-05-23",
                    "대학교 O 학과 P 전공_2024-05-24",
                    "대학교 Q 학과 R 전공_2024-05-24",
                ]}
            ></ResultBox> */}
        </main>
    );
}
