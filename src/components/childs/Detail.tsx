import { QuestionType } from "@/service/fetch";

type Props = {
    selectedUniversities: QuestionType[];
    onClicKStep: (step: "a" | "b" | "details") => void;
};

const DetailItem = ({ item }: { item: QuestionType }) => {
    const competitionRates = [
        113, 98, 102, 91, 111, 91, 93, 105, 71, 73, 68, 57, 56, 85, 78, 57, 51,
    ];
    const minGrades = ["2합 5", "2합 4", "3합 6", "3합 7"];

    const {
        university,
        division,
        major,
        date,
        subject,
        rating,
        competition_rate,
    } = item;

    return (
        <div className="w-full max-w-[300px] bg-white border border-gray-300 rounded-md mt-[10px] p-[10px]">
            <p>
                <strong>대학:</strong> {university} {division} {major}
            </p>
            <p>
                <strong>논술 일정:</strong> {date}
            </p>
            <p>
                <strong>경쟁률:</strong> {competition_rate} 대 1
            </p>
            <p>
                <strong>최저등급:</strong>
                {subject} 합: {rating}
            </p>
        </div>
    );
};

const Detail = ({ selectedUniversities = [], onClicKStep }: Props) => {
    return (
        <div className="flex flex-col items-center w-full">
            <p className="text font-bold text-[18px] text-purple-700 mt-12">
                최종 선택하신 대학 정보에요.
                <br />
                <br />
            </p>

            {selectedUniversities.map((university, index) => (
                <DetailItem key={index} item={university} />
            ))}

            <div className="flex mt-[10px] space-x-4 w-full max-w-[300px]">
                <button
                    className="my-2 w-1/2 h-[40px] flex items-center justify-center bg-purple-700 text-white rounded-[10px]"
                    onClick={() => onClicKStep("a")}
                >
                    돌아가기
                </button>
                <button
                    className="my-2 w-1/2 h-[40px] flex items-center justify-center bg-purple-700 text-white rounded-[10px]"
                    onClick={() => onClicKStep("a")}
                >
                    선택 대학 기출 풀기
                </button>
            </div>
        </div>
    );
};

export default Detail;
