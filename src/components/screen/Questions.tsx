import SelectItem from "@/components/common/SelectItem";
import { useState } from "react";
import Button from "../common/Button";
import Banner from "../common/banner";

type QuestionsProps = {
    title?: string;
    questions: string[];
    isDuplicate?: boolean;
    onSubmit: (value: string | string[]) => void;
};

const Questions = ({
    questions,
    title,
    isDuplicate = false,
    onSubmit,
}: QuestionsProps) => {
    const [selectedQuestion, setSelectedQuestion] = useState<string>("");
    const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);

    return (
        <div>
            <article className="w-full flex flex-col gap-[15px]">
                <div>
                    <p className=" ">{title}</p>
                </div>
                <div className="w-full flex flex-col items-center justify-center gap-[10px] my-[10px]">
                    {questions.map((question, index) => (
                        <SelectItem
                            key={index}
                            isSelected={
                                isDuplicate
                                    ? selectedQuestions.includes(question)
                                    : selectedQuestion === question
                            }
                            value={question}
                            label={question}
                            onClick={(value) => {
                                if (
                                    isDuplicate &&
                                    !selectedQuestions.includes(value)
                                ) {
                                    setSelectedQuestions([
                                        ...selectedQuestions,
                                        value,
                                    ]);
                                } else if (isDuplicate && selectedQuestions.includes(value))  {
                                    setSelectedQuestions(selectedQuestions.filter(item => item !== value));
                                } else {
                                    setSelectedQuestion(value);
                                }
                            }}
                        />
                    ))}
                </div>

                <Button
                    label="다음"
                    onClick={() => {
                        if (isDuplicate && selectedQuestions.length > 0) {
                            onSubmit(selectedQuestions);
                        } else if (selectedQuestion) {
                            onSubmit(selectedQuestion);
                        } else {
                            alert("선택해주세요");
                        }
                    }}
                />
            </article>
        </div>
    );
};

export default Questions;

