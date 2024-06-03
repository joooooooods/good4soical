# -*- coding: utf-8 -*-
import pandas as pd
from typing import List
from fastapi import FastAPI, Query
from pydantic import BaseModel
import uvicorn

# 엑셀 파일에서 데이터 불러오기
# df = pd.read_excel(r"/Users/yun-yunhoyeong/Desktop/UniversityRecommendation/server_gaurontee/list_0520.xlsx")
df = pd.read_excel(r"/Users/joodongseong/Desktop/UniversityRecommendation/server_gaurontee/list_0520.xlsx")




# 날짜 형식이 "YYYY.MM.DD"인 문자열을 datetime 객체로 변환
df['date'] = pd.to_datetime(df['date'], format='%Y.%m.%d')

# NaN 값 처리: NaN 값을 적절한 기본값으로 채웁니다.
df = df.fillna({
    'competition_rate': 0,
    'subject': 0,
    'rating': 0
})

app = FastAPI()

@app.get('/')
async def handle_request(
    q1: List[str] = Query(..., title="q1 (과목)", description="국어, 수학, 영어, 탐구1, 탐구2"),
    q2: str = Query(..., title="q2 (질문2)", description="예, 아니오, 무관"),
    q3: str = Query(..., title="q3 (질문3)", description="예, 아니오, 무관"),
    q4: str = Query(..., title="q4 (질문4)", description="예, 아니오, 무관"),
    q5: str = Query(..., title="q5 (질문5)", description="예, 아니오")
):
    # 받은 데이터를 api 딕셔너리에 저장
    api = {
        'q1': q1,
        'q2': q2,
        'q3': q3,
        'q4': q4,
        'q5': q5
    }

    # 필터링 1 
    user_count = len(api['q1'])
    filtering = df[df['subject'] >= 0]
    
    # 필터링 2
    math_user = api['q2']
    if math_user == '예':
        math_user = 1
        filtering = filtering[filtering['math_essay'] == math_user]
    elif math_user == '아니오':
        math_user = 0
        filtering = filtering[filtering['math_essay'] == math_user]

    # 필터링 3
    user_record = api['q3']
    if user_record == '예':
        user_record = 1
        filtering = filtering[filtering['school_record'] == user_record]
    elif user_record == '아니오':
        user_record = 0
        filtering = filtering[filtering['school_record'] == user_record]

    # 필터링 4
    user_attendence = api['q4']
    if user_attendence == '예':
        user_attendence = 1
        filtering = filtering[filtering['attendence'] == user_attendence]
    elif user_attendence == '아니오':
        user_attendence = 0
        filtering = filtering[filtering['attendence'] == user_attendence]

    # 필터링 5
    user_style = api['q5']
    if user_style == '예':
        user_style = 0
        filtering = filtering[filtering['index'] == user_style]
    elif user_style == '아니오':
        user_style = 0
        filtering = filtering[filtering['index'] == user_style]

    # 데이터 포맷팅
    response = []
    for _, row in filtering.iterrows():
        university_data = {
            "university": row['university'],
            "division": row['division'],
            "major": row['major'],
            "date": row['date'].strftime('%Y-%m-%d'),
            "competition_rate": row['competition_rate'],
            "subject": row['subject'],
            "rating": row['rating']
        }        
        
        response.append(university_data)

    return response

if __name__ == '__main__':
    uvicorn.run(app, host="0.0.0.0", port=8000)
