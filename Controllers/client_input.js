var userInput = {
    'buildingType': '주거-다중', //건물유형
    'city': '서울', //위치 (서울, 경기도, 인천, ... )
    
    'approvalYear': 2004, // 건물 승인 년도
    'card': '국민은행', //주거래은행
}

var energyContract = {
    'distinct': '일반용갑1',
    'pressure': '저압',
    'select': '' // 선택이 안되는경우에는 ''로 남겨놓는다.
}

var monthlyElectricityInput = {
    'before': [97.36, 93.08, 95.68, 98.20, 93.16, 95.68, 125.84, 139.20, 96.44, 99.88, 95.68, 92.72], // 리모델링 전 월간 전기 에너지 소모량 (12개)
    'after':  [87.36, 73.08, 85.68, 88.20, 83.16, 85.68, 115.08, 130.02, 76.44, 89.88, 85.68, 90.72], // 리모델링 후 월간 전기 에너지 소모량 (12개)
}

var monthlyGasInput = {
    'before': [6750.24, 5607, 4458.72, 2708.16, 0, 0, 0, 0, 248.64, 1654.8, 3352.36, 5810.28],// 리모델링 전 월간 가스 에너지 소모량 (12개)
    'after':  [2615.76, 2107.56, 1558.2, 730.8, 0, 0, 0, 0, 12.6, 303.24, 1098.72, 2215.08] // 리모델링 후 월간 가스 에너지 소모량 (12개)
}

var LCCAssumptionInput = {
    'analysisPeriod': 20, //분석기간 (years)
    'realInterest': 0.0087, // 실질할인율
}

var remodelingTechInput = {
    // 1. 벽체
    "wall": {
        "name": ['외단열 덧댐시공', '외단열 덧댐시공', '외단열 덧댐시공', '외단열 덧댐시공'], 
        "size": [80, 120, 80, 120], //m2 벽체면적
        "material cost": [150, 6000, 150, 6000] //원 단가
    },
    // 2. 지붕
    "roof": {
        "name": [], 
        "size": [], //m2 지붕면적
        "material cost": [] //원 단가
    },
    // 3. 바닥
    "floor": {
        "name": ["내단열 덧댐시공"], 
        "size": [120], //m2 바닥면적
        "material cost": [30400] //원 단가
    },
    // 4. 창문
    "window": {
        "name": ["창호 교체"],
        "size": [40], //m2 창호면적
        "material cost": [174500]  //원 단가
    },
    // 5. 조명
    "light": {
        "name": ["LED 전면 교체"],
        "size": [120], //m2 바닥면적

    },
    // 6. 내부차장
    "interiorBlind": {
        "name": ['내부 베네시안 블라인드', '롤 블라인드'],
        "size": [20, 20], //m2
        "material cost": [11400, 14000]
    },
    //7. 외부차양
    "exteriorBlind": {
        "name": ["외부 베네시안 블라인드"],
        "size": [20], //m2
    },
    // 8. 태양광
    "renewable": {
        "name": ["태양광 시스템"],
        "size": [3.3], //kW
    },
    // 9. 출입문
    "door": {
        "name": ["철재문 (양개)"],
        "size": [1], // 짝
        "material cost": [450000]
    },
    // 10. 냉동기
    "freezer": {

        "size": [90], // USRT

    },
    // 11. 보일러
    "boiler": {
        "name": ["NPW-36KD"],
        "size": [36000], // kcal/h
        "material cost": ['']
    },
    // 12. 공조기
    "AHU": {

        "size": [], // 대
        "material cost": []
    },
    // 13. 히트펌프
    "heatpump": {

        "size": [1], // 대
        "material cost": [4860900]
    },
}

var detailedFundInformationInput = {
    'mortageLoanMaxLimit': 100000000, // 주택담보대출 최대한도
    'mortageLoanInterest': 0.0443, // 주택담보대출 이자율
    'mortageLoanRepaymentMonth': 25*12, // 주택담보대출상환기간 (월)
    'mortageLoanHoldMonth': 0, // 주택담보대출 거치기간 (기본값 = 0)

    'creditLoanMaxLimit': 100000000, // 신용대출 최대한도
    'creditLoanInterest': 0.0662, // 신용대출 이자율
    'creditLoanRepaymentMonth': 10*12, //신용대출 상환기간 (월)
    'creditLoanHoldMonth': 0, //신용대출 거치기간 (기본값 = 0)

    'applyGreen': true, // 그린리모델링 이자지원 사업을 적용하는 경우 true, 아닌 경우 false
    'applySeoul': true, // 서울시 집수리 융자사업을 적용하는 경우 true, 아닌 경우 false
    'applyRural': false, // 농어촌 주택개량사업을 적용하는 경우 true, 아닌 경우 false
    'applyMortage': true, // 주택담보대출을 적용하는 경우 true, 아닌 경우 false
    'applyCredit': true, // 신용대출을 적용하는 경우 true, 아닌 경우 false

    'initialUserCapital': 0 // 개인자본 (B6)
}

export {userInput, energyContract, 
    monthlyElectricityInput, monthlyGasInput, 
    LCCAssumptionInput, remodelingTechInput, detailedFundInformationInput}