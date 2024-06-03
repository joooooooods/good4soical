type RangeBarProps = {
    width: number;
    maxStep: number;
    step: number;
};

const RangeBar = ({ width, maxStep, step }: RangeBarProps) => {
    return (
        <div className='w-full h-[10px] flex items-center justify-start mb-[50px]'>
            <div className='w-full h-[10px] bg-white rounded-[20px] relative'>
                <div
                    style={{ width: `${width}%` }}
                    className='h-full bg-purple-700 rounded-[10px]'></div>
            </div>
            <div className='ml-[15px] text-purple-700'>
                {step}/{maxStep}
            </div>
        </div>
    );
};

export default RangeBar;
