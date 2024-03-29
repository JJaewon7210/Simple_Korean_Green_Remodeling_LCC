// 개선기준은 형광등만 적용 (즉, 100% 모든 전구를 교체)
// Linear Regression model을 만들어서 사용하기 때문에, 밑에 데이터베이스에서는 [용도, 수선율, 수선주기, 교체주기]만 가져와짐
// 산출식: A(기울기) * unit + B(절편)
export const lightDB = [
    {
        "용도": "비주거",
        "부위": "조명기기",
        "전용면적": "",
        "개선기준": "형광등",
        "개선시나리오": "LED 전면 교체",
        "시공비": 12400,
        "견적연도": 2020,
        "단위": "바닥면적",
        "수선율": 0,
        "수선주기": 0,
        "교체주기": 14,
        "재료비비율": 0.24218674
    },
    {
        "용도": "비주거",
        "부위": "조명기기",
        "전용면적": "",
        "개선기준": "LED 약 20% 이상 50% 미만 설치",
        "개선시나리오": "LED 전면 교체",
        "시공비": 9920,
        "견적연도": 2020,
        "단위": "바닥면적",
        "수선율": 0,
        "수선주기": 0,
        "교체주기": 14,
        "재료비비율": 0.24218674
    },
    {
        "용도": "비주거",
        "부위": "조명기기",
        "전용면적": "",
        "개선기준": "LED 약 50% 이상 설치",
        "개선시나리오": "LED 전면 교체",
        "시공비": 6200,
        "견적연도": 2020,
        "단위": "바닥면적",
        "수선율": 0,
        "수선주기": 0,
        "교체주기": 14,
        "재료비비율": 0.24218674
    },
    {
        "용도": "주거",
        "부위": "조명기기",
        "전용면적": 36,
        "개선기준": "형광등",
        "개선시나리오": "LED 전면 교체",
        "시공비": 545000,
        "견적연도": 2020,
        "단위": "바닥면적",
        "수선율": 0,
        "수선주기": 0,
        "교체주기": 14,
        "재료비비율": 0.24218674
    },
    {
        "용도": "주거",
        "부위": "조명기기",
        "전용면적": 36,
        "개선기준": "LED 약 20% 이상 50% 미만 설치",
        "개선시나리오": "LED 전면 교체",
        "시공비": 436000,
        "견적연도": 2020,
        "단위": "바닥면적",
        "수선율": 0,
        "수선주기": 0,
        "교체주기": 14,
        "재료비비율": 0.24218674
    },
    {
        "용도": "주거",
        "부위": "조명기기",
        "전용면적": 36,
        "개선기준": "LED 약 50% 이상 설치",
        "개선시나리오": "LED 전면 교체",
        "시공비": 272500,
        "견적연도": 2020,
        "단위": "바닥면적",
        "수선율": 0,
        "수선주기": 0,
        "교체주기": 14,
        "재료비비율": 0.24218674
    },
    {
        "용도": "주거",
        "부위": "조명기기",
        "전용면적": 46,
        "개선기준": "형광등",
        "개선시나리오": "LED 전면 교체",
        "시공비": 654000,
        "견적연도": 2020,
        "단위": "바닥면적",
        "수선율": 0,
        "수선주기": 0,
        "교체주기": 14,
        "재료비비율": 0.24218674
    },
    {
        "용도": "주거",
        "부위": "조명기기",
        "전용면적": 46,
        "개선기준": "LED 약 20% 이상 50% 미만 설치",
        "개선시나리오": "LED 전면 교체",
        "시공비": 523200,
        "견적연도": 2020,
        "단위": "바닥면적",
        "수선율": 0,
        "수선주기": 0,
        "교체주기": 14,
        "재료비비율": 0.24218674
    },
    {
        "용도": "주거",
        "부위": "조명기기",
        "전용면적": 46,
        "개선기준": "LED 약 50% 이상 설치",
        "개선시나리오": "LED 전면 교체",
        "시공비": 327000,
        "견적연도": 2020,
        "단위": "바닥면적",
        "수선율": 0,
        "수선주기": 0,
        "교체주기": 14,
        "재료비비율": 0.24218674
    },
    {
        "용도": "주거",
        "부위": "조명기기",
        "전용면적": 59,
        "개선기준": "형광등",
        "개선시나리오": "LED 전면 교체",
        "시공비": 763000,
        "견적연도": 2020,
        "단위": "바닥면적",
        "수선율": 0,
        "수선주기": 0,
        "교체주기": 14,
        "재료비비율": 0.24218674
    },
    {
        "용도": "주거",
        "부위": "조명기기",
        "전용면적": 59,
        "개선기준": "LED 약 20% 이상 50% 미만 설치",
        "개선시나리오": "LED 전면 교체",
        "시공비": 610400,
        "견적연도": 2020,
        "단위": "바닥면적",
        "수선율": 0,
        "수선주기": 0,
        "교체주기": 14,
        "재료비비율": 0.24218674
    },
    {
        "용도": "주거",
        "부위": "조명기기",
        "전용면적": 59,
        "개선기준": "LED 약 50% 이상 설치",
        "개선시나리오": "LED 전면 교체",
        "시공비": 381500,
        "견적연도": 2020,
        "단위": "바닥면적",
        "수선율": 0,
        "수선주기": 0,
        "교체주기": 14,
        "재료비비율": 0.24218674
    },
    {
        "용도": "주거",
        "부위": "조명기기",
        "전용면적": 84,
        "개선기준": "형광등",
        "개선시나리오": "LED 전면 교체",
        "시공비": 1090000,
        "견적연도": 2020,
        "단위": "바닥면적",
        "수선율": 0,
        "수선주기": 0,
        "교체주기": 14,
        "재료비비율": 0.24218674
    },
    {
        "용도": "주거",
        "부위": "조명기기",
        "전용면적": 84,
        "개선기준": "LED 약 20% 이상 50% 미만 설치",
        "개선시나리오": "LED 전면 교체",
        "시공비": 872000,
        "견적연도": 2020,
        "단위": "바닥면적",
        "수선율": 0,
        "수선주기": 0,
        "교체주기": 14,
        "재료비비율": 0.24218674
    },
    {
        "용도": "주거",
        "부위": "조명기기",
        "전용면적": 84,
        "개선기준": "LED 약 50% 이상 설치",
        "개선시나리오": "LED 전면 교체",
        "시공비": 545000,
        "견적연도": 2020,
        "단위": "바닥면적",
        "수선율": 0,
        "수선주기": 0,
        "교체주기": 14,
        "재료비비율": 0.24218674
    },
    {
        "용도": "주거",
        "부위": "조명기기",
        "전용면적": 125,
        "개선기준": "형광등",
        "개선시나리오": "LED 전면 교체",
        "시공비": 1635000,
        "견적연도": 2020,
        "단위": "바닥면적",
        "수선율": 0,
        "수선주기": 0,
        "교체주기": 14,
        "재료비비율": 0.24218674
    },
    {
        "용도": "주거",
        "부위": "조명기기",
        "전용면적": 125,
        "개선기준": "LED 약 20% 이상 50% 미만 설치",
        "개선시나리오": "LED 전면 교체",
        "시공비": 1308000,
        "견적연도": 2020,
        "단위": "바닥면적",
        "수선율": 0,
        "수선주기": 0,
        "교체주기": 14,
        "재료비비율": 0.24218674
    },
    {
        "용도": "주거",
        "부위": "조명기기",
        "전용면적": 125,
        "개선기준": "LED 약 50% 이상 설치",
        "개선시나리오": "LED 전면 교체",
        "시공비": 817500,
        "견적연도": 2020,
        "단위": "바닥면적",
        "수선율": 0,
        "수선주기": 0,
        "교체주기": 14,
        "재료비비율": 0.24218674
    }
]