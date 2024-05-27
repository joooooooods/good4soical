type RangeBarProps = {
    width: number;
    maxStep: number;
    step: number;
};

const RangeBar = ({ width, maxStep, step }: RangeBarProps) => {
    return (
        <div className='w-full h-[10px] flex items-center justify-start'>
            <div className='w-full h-[10px] bg-line1 rounded-[20px] relative'>
                <div
                    style={{ width: `${width}%` }}
                    className='h-full bg-blue-500 rounded-[10px]'></div>
            </div>
            <div className='ml-[15px] text-blue-200'>
                {step}/{maxStep}
            </div>
        </div>
    );
};

export default RangeBar;
