import React from 'react';

const Banner = () => {
    return (
        <div className="text-purple-700 flex items-center justify-between mb-[10px]">
            {/* 홈으로 가는 화살표 버튼 */}
            <button className="flex items-center w-1/3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
                <span className='font-bold text-xl text-[18px]'>Home</span>
            </button>
            
            {/* "대학찾아줘" 문구 */}
            <h1 className="font-bold text-[20px] w-1/3 text-center">대학찾아줘!</h1>

            {/* 빈 공간 */}
            <p className='w-1/3 text-[#f2f2f2]'>bb</p>
        </div>
    );
};

export default Banner;
