var userData = {
    'buildingType': '주거-다중', //건물유형
    'card': '국민은행', //주거래은행
    'realInterest': 0.0087, // 실질할인율
    'approvalYear': 2004, // 건물 승인 년도
    'mortageLoanMaxLimit': 100000000, // 주택담보대출 최대한도
    'mortageLoanInterest': 0.0443, // 주택담보대출 이자율
    'mortageLoanRepaymentMonth': 25*12, // 주택담보대출상환기간 (월)
    'mortageLoanHoldMonth': 0, // 주택담보대출 거치기간 (기본값 = 0)-
    'creditLoanMaxLimit': 100000000, // 신용대출 최대한도
    'creditLoanInterest': 0.0662, // 신용대출 이자율
    'creditLoanRepaymentMonth': 10*12, //신용대출 상환기간 (월)
    'creditLoanHoldMonth': 0, //신용대출 거치기간 (기본값 = 0)
    'analysisPeriod': 20, //분석기간 (years)
    'city': '서울', //위치 (서울, 경기도, 인천, ... )
    'applyGreen': true, // 그린리모델링 이자지원 사업을 적용하는 경우 true, 아닌 경우 false
    'applySeoul': false, // 서울시 집수리 융자사업을 적용하는 경우 true, 아닌 경우 false
    'applyRural': false, // 농어촌 주택개량사업을 적용하는 경우 true, 아닌 경우 false
    'applyMorage': true, // 주택담보대출을 적용하는 경우 true, 아닌 경우 false
    'applyCredit': true, // 신용대출을 적용하는 경우 true, 아닌 경우 false
    'initialUserCapital': 0 // 개인자본 (B6)
}

var TechnologyData = {
    "외벽": {
        "name": "외단열", // 기술명
        "size": 84//726 //m2 값
    },
    "창호": {
        "name": "창호교체",// 기술명
        "size": 21//236.590504 //m2 값
    },
    "공조":
    {
        "name": "고효율 공조시스템",// 기술명
        "size": 0 //m2 값
    },
    "냉난방": {
        "name": "개별 EHP",// 기술명
        "size": 0 //m2 값
    },
    "조명": {
        "name": "고효율 조명",// 기술명
        "size": 0 //EA 값
    },
    "전기": {
        "name": "고효율 전력회생시스템",// 기술명
        "size": 0 //값
    },
    "신재생": {
        "name": "BIPV+PV+ESS 하이브리드 시스템",// 기술명
        "size": 0 // kW 값
    }
}

var ElectricityData = {
    'before': [87.36, 73.08, 85.68, 88.20, 83.16, 85.68, 105.84, 109.20, 76.44, 89.88, 85.68, 90.72], // 리모델링 전 월간 전기 에너지 소모량 (12개)
    'after':  [87.36, 73.08, 85.68, 88.20, 83.16, 85.68, 115.08, 130.02, 76.44, 89.88, 85.68, 90.72], // 리모델링 후 월간 전기 에너지 소모량 (12개)
    'distint': 'Residential',
    'pressure': 'low pressure',
    'select': ''
}

var GasData = {
    'before': [6750.24, 5607, 4458.72, 2708.16, 0, 0, 0, 0, 248.64, 1654.8, 3352.36, 5810.28],// 리모델링 전 월간 가스 에너지 소모량 (12개)
    'after':  [2615.76, 2107.56, 1558.2, 730.8, 0, 0, 0, 0, 12.6, 303.24, 1098.72, 2215.08] // 리모델링 후 월간 가스 에너지 소모량 (12개)
}

// calculate totalRemodelingCost
import { totalRemodelingCost } from "../services/calculateCostLogics.js"
userData.totalRemodelingCost = totalRemodelingCost(TechnologyData)

export { userData, TechnologyData, ElectricityData, GasData }