function updateUserInput(userInput) {
    // filter 01. Get Big Cateogry of building Type 
    if (userInput.buildingType == '비주거') {
        userInput.buildingTypeBigCategory = '비주거'
    } else {
        userInput.buildingTypeBigCategory = '주거'
    }

    // filter 02. Get Building Age cateogry
    if (userInput.approvalYear <= 1980) {
        userInput.buildingAge = '~1980년'
    } else if (userInput.approvalYear > 1980 && userInput.approvalYear <= 1987) {
        userInput.buildingAge = '~1987년'
    } else if (userInput.approvalYear > 1987 && userInput.approvalYear <= 2001) {
        userInput.buildingAge = '~2001년'
    } else if (userInput.approvalYear > 2001) {
        userInput.buildingAge = '~2009년'
    } else {
        throw new Error('Wrong approvalYear was entered to userInput.')
    }

    // filter 03. Get area category from cities 
    let middle01Cities = [
        '강원 춘천', '강원 원주', '강원 평창',
        '경기(연천, 포천, 가평, 남양주, 의정부, 양주, 동두천, 파주)']

    let middle02Cities = [
        '서울', '경기', '인천', '세종', '강원 영동지역', '경기',
        '충북 청주', '충북 충주', '충남 천안', '충남 서산',
        '전북 전주', '전북 군산', '전북 익산', '경북 구미', '경북 안동',
    ]
    let southernCities = [
        '부산', '대구', '울산', '광주',
        '전남 목포', '전남 순천', '전남 여수', '전남 나주',
        '경북 포항', '경북 경주',
        '경남 창원', '경남 진주', '경남 양산']

    if (middle01Cities.includes(userInput.city)) {
        userInput.areaCateogry = '중부1'
    } else if (middle02Cities.includes(userInput.city)) {
        userInput.areaCateogry = '중부2'
    } else if (southernCities.includes(userInput.city)) {
        userInput.areaCateogry = '남부'
    } else {
        throw new Error('Wrong area (or city name) was entered to userInput.')
    }

    return userInput
}

function changeApplyBuisness(userInput, detailedFundInformationInput) {
    //1. green
    if (userInput.buildingType == '비주거') {
        if (['신한은행','제주은행','기업은행','국민은행','농협은행'].includes(userInput.card)){
        } else {
            detailedFundInformationInput.applyGreen = false
        }
    } else if (userInput.buildingType == '주거-단독') {
        if (['신한은행','우리은행','국민은행','농협은행','신한카드'].includes(userInput.card)){
        } else {
            detailedFundInformationInput.applyGreen = false
        }
    } else {
        if (['신한은행','우리은행','국민은행','농협은행','롯데카드','신한카드','삼성카드'].includes(userInput.card)){
        } else {
            detailedFundInformationInput.applyGreen = false
        }
    }
    // 2. seoul
    if (['주거-단독','주거-다중', '주거-다가구', '주거-다세대', '주거-연립'].includes(userInput.buildingType)) {
    } else {
        detailedFundInformationInput.applySeoul = false
    }

    if (2022-userInput.approvalYear >= 20) {
    } else if (2022-userInput.approvalYear >=10) {
    } else {
        detailedFundInformationInput.applySeoul = false
    }

    return detailedFundInformationInput
}

import { greenRemodelingInterestSupportProject } from "../configs/fund.js"
import { userInput } from "../controllers/client_input.js";
var updatedUserInput = updateUserInput(userInput)

export { updatedUserInput, updateUserInput , changeApplyBuisness}
