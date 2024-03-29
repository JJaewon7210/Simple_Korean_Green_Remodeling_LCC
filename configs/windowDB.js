// 국토부 표준시장단가 기준을 반영한 집수리 예시 견적서 반영 (서울시 집수리 견적 2019)
// 산출식: ( 재료비단가( user input ) + 시공비 * ( 1 - 재료비비율 ) ) * unit
export const windowDB = [

    {
        "용도": "비주거",
        "부위": "벽체",
        "개선기준": "신현동 내역서",
        "개선시나리오": "고단열고기밀 창호",
        "개선재료": "",
        "가격": 641910,
        "견적연도": 2021,
        "단위": "창호면적",
        "수선율": 0.1,
        "수선주기": 10,
        "교체주기": 25
    },
    {
        "용도": "비주거",
        "부위": "벽체",
        "개선기준": "군자동 내역서",
        "개선시나리오": "고단열고기밀 창호",
        "개선재료": "",
        "가격": 621501,
        "견적연도": 2022,
        "단위": "창호면적",
        "수선율": 0.1,
        "수선주기": 10,
        "교체주기": 25,
    },

    {
        "용도": "비주거",
        "부위": "창호",
        "전용면적": "",
        "개선기준": "~1980년",
        "개선시나리오": "창호 교체",
        "개선목표": "법적수준",
        "중부1": 377707,
        "중부2": 377707,
        "남부": 377707,
        "제주": 377707,
        "견적연도": 2020,
        "단위": "창호면적",
        "수선율": 0.1,
        "수선주기": 10,
        "교체주기": 25,
        "재료비비율": 0.869852633
    },
    {
        "용도": "주거",
        "부위": "창호",
        "전용면적": "",
        "개선기준": "~1980년",
        "개선시나리오": "창호 교체",
        "개선목표": "법적수준",
        "중부1": 472388,
        "중부2": 472388,
        "남부": 472388,
        "제주": 472388,
        "견적연도": 2020,
        "단위": "창호면적",
        "수선율": 0.1,
        "수선주기": 10,
        "교체주기": 25,
        "재료비비율": 0.869852633
    },
    {
        "용도": "주거",
        "부위": "창호",
        "전용면적": "",
        "개선기준": "~1987년",
        "개선시나리오": "창호 교체",
        "개선목표": "법적수준",
        "중부1": 472388,
        "중부2": 472388,
        "남부": 472388,
        "제주": 472388,
        "견적연도": 2020,
        "단위": "창호면적",
        "수선율": 0.1,
        "수선주기": 10,
        "교체주기": 25,
        "재료비비율": 0.869852633
    },
    {
        "용도": "주거",
        "부위": "창호",
        "전용면적": "",
        "개선기준": "~2001년",
        "개선시나리오": "창호 교체",
        "개선목표": "법적수준",
        "중부1": 472388,
        "중부2": 472388,
        "남부": 472388,
        "제주": 472388,
        "견적연도": 2020,
        "단위": "창호면적",
        "수선율": 0.1,
        "수선주기": 10,
        "교체주기": 25,
        "재료비비율": 0.869852633
    },
    {
        "용도": "주거",
        "부위": "창호",
        "전용면적": "",
        "개선기준": "~2009년",
        "개선시나리오": "창호 교체",
        "개선목표": "법적수준",
        "중부1": 472388,
        "중부2": 472388,
        "남부": 472388,
        "제주": 472388,
        "견적연도": 2020,
        "단위": "창호면적",
        "수선율": 0.1,
        "수선주기": 10,
        "교체주기": 25,
        "재료비비율": 0.869852633
    }
]