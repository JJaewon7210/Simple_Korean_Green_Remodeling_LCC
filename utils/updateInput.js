function updateUserInput(userInput) {
    // filter 01. Get Big Cateogry of building Type 
    if (userInput.buildingType == '비주거') {
        userInput.buildingTypeBigCategory = '비주거'
    } else {
        userInput.buildiygTypeBigCategory = '주거'
    }

    // filter 02. class (or category?) of the remodeling technology
    switch (cls) {
        case 'wall':
            userInput.techClass = '벽체'
            break;
        case 'roof':
            userInput.techClass = '지붕'
            break;
        case 'window':
            userInput.techClass = '창호'
            break;
        case 'heatpump':
            userInput.techClass = '냉난방'
            break;
        case 'light':
            userInput.techClass = '조명기기'
            break;
        case 'renewable':
            userInput.techClass = '신재생'
            break;
        case 'package':
            userInput.techClass = '기술패키지'
            break;
        default:
            break;
    }

    // filter 03. Get Building Age cateogry
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

    // filter 04. Get area category from cities 
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

import { userInput } from "../controllers/client_input.js";
userInput = updateUserInput(userInput)

// calculate totalRemodelingCost [DO]
// import { totalRemodelingCost } from "../services/calculateCostLogics.js"
// userData.totalRemodelingCost = totalRemodelingCost(TechnologyData)

export { userInput }
