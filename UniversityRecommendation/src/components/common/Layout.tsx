"use client";
import { use, useCallback, useState, useEffect } from "react";
import RangeBar from "@/components/common/RangeBar";
import Questions from "@/components/screen/Questions";
import AnswerBox from "@/components/screen/AnswerBox";
import useFunnel from "@/hooks/useFunnel";
import { QUESTIONS, TITLES } from "@/constant/question";
import { fetchQuestion } from "@/service/fetch";

type AnswerType = {
  q1: string[];
  q2: string;
  q3: string;
  q4: string;
  q5: string;
  q6: string;
};

type AnswerKey = keyof AnswerType;

export default function Layout() {
  const [answer, setAnswer] = useState<AnswerType>({
    q1: Array(6).fill(""),
    q2: "",
    q3: "",
    q4: "",
    q5: "",
    q6: "",
  });
  const [isModifyQuestion, setIsModifyQuestion] = useState(Array(6).fill(true));
  const { Funnel, Step, setStep, currentStep } = useFunnel("q1");
  const [isShowQuestion, setIsShowQuestion] = useState(Array(6).fill(false));
  const [modifyStep, setModifyStep] = useState("");
  const [curStep, setCurStep] = useState("q1");
  const [result, setResult] = useState([]);

  useEffect(() => {}, []);

  const handleAnswer = (
    value: string | string[],
    key: string,
    step: string,
  ) => {
    console.log(value, key, currentStep);
    setAnswer({ ...answer, [key]: value });
    setStep(step);
    // fetchq1();
  };

  const handleClickRequest = (value: AnswerKey) => {
    setAnswer({ ...answer, q6: value });
    fetchQuestion(answer);
  };

  const handleClickRequest2 = () => {
    setAnswer({ ...answer });
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

      {curStep === "q1" || modifyStep === "q1" ? (
        <Questions
          title={TITLES.q1}
          questions={QUESTIONS.q1}
          isDuplicate={true}
          onSubmit={(value) => {
            handleAnswer(value, "q1", "q2");
            isModifyQuestion[0] = false;
            setIsModifyQuestion([...isModifyQuestion]);
            setCurStep("q2");
            isShowQuestion[0] = true;
            setIsShowQuestion([...isShowQuestion]);
          }}
        ></Questions>
      ) : isShowQuestion[0] ? (
        <div className="flex flex-col items-end">
          <AnswerBox answer={answer["q1"].join(", ")} />
          <button
            onClick={() => {
              isModifyQuestion[0] = true;
              setModifyStep("q1");
              setIsModifyQuestion([...isModifyQuestion]);
            }}
          >
            수정
          </button>
        </div>
      ) : null}
      {curStep === "q2" || modifyStep === "q2" ? (
        <Questions
          title={TITLES.q2}
          questions={QUESTIONS.q2}
          onSubmit={(value) => {
            handleAnswer(value, "q2", "q3");
            isModifyQuestion[1] = false;
            setIsModifyQuestion([...isModifyQuestion]);
            setCurStep("q3");
            isShowQuestion[1] = true;
            setIsShowQuestion([...isShowQuestion]);
          }}
        ></Questions>
      ) : isShowQuestion[1] ? (
        <div className="flex flex-col items-end">
          <AnswerBox answer={answer["q2"]} />
          <button
            onClick={() => {
              isModifyQuestion[1] = true;
              setModifyStep("q2");
              setIsModifyQuestion([...isModifyQuestion]);
            }}
          >
            수정
          </button>
        </div>
      ) : null}
      {curStep === "q3" || modifyStep === "q3" ? (
        <Questions
          title={TITLES.q3}
          questions={QUESTIONS.q3}
          onSubmit={(value) => {
            handleAnswer(value, "q3", "q4");
            isModifyQuestion[2] = false;
            isShowQuestion[2] = true;
            setIsShowQuestion([...isShowQuestion]);
            setIsModifyQuestion([...isModifyQuestion]);
            setCurStep("q4");
          }}
        ></Questions>
      ) : isShowQuestion[2] ? (
        <div className="flex flex-col items-end">
          <AnswerBox answer={answer["q3"]} />
          <button
            onClick={() => {
              isModifyQuestion[2] = true;
              setModifyStep("q3");
              setIsModifyQuestion([...isModifyQuestion]);
            }}
          >
            수정
          </button>
        </div>
      ) : null}

      {curStep === "q4" || modifyStep === "q4" ? (
        <Questions
          title={TITLES.q4}
          questions={QUESTIONS.q4}
          onSubmit={(value) => {
            handleAnswer(value, "q4", "q5");
            isModifyQuestion[3] = false;
            setIsModifyQuestion([...isModifyQuestion]);
            setCurStep("q5");
            isShowQuestion[3] = true;
            setIsShowQuestion([...isShowQuestion]);
          }}
        ></Questions>
      ) : isShowQuestion[3] ? (
        <div className="flex flex-col items-end">
          <AnswerBox answer={answer["q4"]} />
          <button
            onClick={() => {
              isModifyQuestion[3] = true;
              setModifyStep("q4");
              setIsModifyQuestion([...isModifyQuestion]);
            }}
          >
            수정
          </button>
        </div>
      ) : null}

      {curStep === "q5" || modifyStep === "q5" ? (
        <Questions
          title={TITLES.q5}
          questions={QUESTIONS.q5}
          onSubmit={(value) => {
            handleAnswer(value, "q5", "q6");
            isModifyQuestion[4] = false;
            setIsModifyQuestion([...isModifyQuestion]);
            setCurStep("q6");
            isShowQuestion[4] = true;
            setIsShowQuestion([...isShowQuestion]);
            handleClickRequest2();
          }}
        ></Questions>
      ) : isShowQuestion[4] ? (
        <div className="flex flex-col items-end">
          <AnswerBox answer={"예"} />
          <button
            onClick={() => {
              isModifyQuestion[4] = true;
              setModifyStep("q5");
              setIsModifyQuestion([...isModifyQuestion]);
              handleClickRequest2();
            }}
          >
            수정
          </button>
        </div>
      ) : null}

      {result.map((item, idx) => {
        return <div key={idx}>{item}</div>;
      })}
      {/* <Funnel>
        <Step name="q1">
          <Questions
            title={TITLES.q1}
            questions={QUESTIONS.q1}
            isDuplicate={true}
            onSubmit={(value) => {
              handleAnswer(value, "q2");
            }}
          ></Questions>
        </Step>
        <Step name="q2">
          <Questions
            title={TITLES.q2}
            questions={QUESTIONS.q2}
            onSubmit={(value) => {
              handleAnswer(value, "q3");
            }}
          />
        </Step>
        <Step name="q3">
          <Questions
            title={TITLES.q3}
            questions={QUESTIONS.q3}
            onSubmit={(value) => {
              handleAnswer(value, "q4");
            }}
          />
        </Step>

        <Step name="q4">
          <Questions
            title={TITLES.q4}
            questions={QUESTIONS.q4}
            onSubmit={(value) => {
              handleAnswer(value, "q6");
            }}
          />
        </Step>

        <Step name="q5">
          <Questions
            title={TITLES.q5}
            questions={QUESTIONS.q5}
            onSubmit={(value) => {
              handleAnswer(value, "q6");
            }}
          />
        </Step>

        <Step name="q6">
          <Questions
            title={TITLES.q6}
            questions={QUESTIONS.q6}
            onSubmit={(value) => {
              handleClickRequest(value as AnswerKey);
            }}
          />
        </Step>
      </Funnel> */}
    </main>
  );
}
