var userInput = {
    "buildingType": "비주거", "city": "서울", "approvalYear": 1980, "card": "국민은행"
}

var energyContract = {
    "distinct": "주택용", "pressure": "저압", "select": ""
}

var monthlyElectricityInput = {
    "before": [1342491.37, 2592031.42, 4374800.84, 4878682.48, 18653556.12, 8132083.84, 8122883.53, 8853728.44, 7877182.19, 10024720.03, 2178006.65, 2576629.01],
    "after":  [1474292.89, 2751146.03, 4539161.18, 5008195.66, 18990461.66, 8301061.89, 8342586.22, 9040043.01, 8042343.56, 10418558.25, 2271153.43, 2766382.10]
}

var monthlyGasInput = {
    "before": [13541812.07, 7241688.64, 4488764.35, 13665186.41, 2801910.81, 27027.78, 0.00, 0.00, 64322.33, 7610423.64, 23320935.77, 9757131.60],
    "after":  [13295387.51, 7093413.72, 4414090.64, 13289293.15, 2740095.21, 30753.48, 0.00, 0.00, 67367.12, 7464320.92, 22679755.76, 9599105.77]
}

var LCCAssumptionInput = {
    'analysisPeriod': 20, //분석기간 (years)
    'realInterest': 0.0087, // 실질할인율
    'electricityRealInterest': -0.0083,
    'gasRealInterest': -0.0434
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

var customizedRatio = {
    'ratioGreen'  : 0.2, // 총 공사비 대비 그린리모델링 이자지원 사업을 이용해 대출한 금액
    'ratioSeoul'  : 0.3, // 총 공사비 대비 서울시 집수리 융자사업을 이용해 대출한 금액
    'ratioRural'  : 0,   // 총 공사비 대비 농어촌 주택개량사업을 이용해 대출한 금액
    'ratioMortage': 0.5, // 총 공사비 대비 주택담보대출을 이용해 대출한 금액
    'ratioCredit' : 0.4, // 총 공사비 대비 신용대출을 이용해 대출한 금액    
}


export {userInput, energyContract, 
    monthlyElectricityInput, monthlyGasInput, 
    LCCAssumptionInput, remodelingTechInput, detailedFundInformationInput, customizedRatio}