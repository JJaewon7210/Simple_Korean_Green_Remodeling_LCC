import { wallDB } from '../configs/wallDB.js'
import { roofDB } from '../configs/roofDB.js'
import { floorDB } from '../configs/floorDB.js'
import { windowDB } from '../configs/windowDB.js'
import { lightDB } from '../configs/lightDB.js'
import { interiorBlindDB } from '../configs/interiorBlindDB.js'
import { exteriorBlindDB } from '../configs/exteriorBlindDB.js'
import { renewableDB } from '../configs/renewableDB.js'
import { doorDB } from '../configs/doorDB.js'
import { freezerDB } from '../configs/freezerDB.js'
import { boilerDB } from '../configs/boilerDB.js'
import { AHUDB } from '../configs/AHUDB.js'
import { heatpumpDB } from '../configs/heatpumpDB.js'
import { PPI } from '../configs/PPI.js'
// 1. 벽체
function getAnnualCashFlowsOfWall(techName, size, userInput, analysisPeriod, materialCost) {

	if (
		techName === "외단열 하이패브시스템 (복합보드)" ||
		techName === "외단열 하이패브시스템 (세라믹사이딩)" ||
		techName === "외단열 하이패브시스템 (무늬목강판)" ||
		techName === "외단열 하이패브시스템 (유리패널)"
	) {
		let filteredInfos = wallDB.filter(
			obj => obj["개선시나리오"] == techName
				&& obj["개선기준"] == "군자동 내역서")[0];
			
		let repairRatio = filteredInfos['수선율']
		let repairCycle = filteredInfos['수선주기']
		let replacementCycle = filteredInfos['교체주기']
		let estimatedYear = filteredInfos['견적연도']
		let unitCost = filteredInfos['가격'] * reflectInflation(estimatedYear)
		let initialCost = unitCost * size 
	
		return getAnnualCashFlows(repairRatio, repairCycle, replacementCycle, analysisPeriod, initialCost)
		
	} else {
		let filteredInfos = wallDB.filter(
			obj => obj["용도"] == userInput.buildingTypeBigCategory
			&& obj["개선기준"] == userInput.buildingAge
			&& obj["개선재료"] == "일반"
			&& obj["개선시나리오"] == techName
			&& obj["개선목표"] == "법적수준")[0];
	
		let repairRatio = filteredInfos['수선율']
		let repairCycle = filteredInfos['수선주기']
		let replacementCycle = filteredInfos['교체주기']
		let materialRatio = filteredInfos['재료비비율']
		let estimatedYear = filteredInfos['견적연도']
		let unitCost = filteredInfos[userInput.areaCateogry] * reflectInflation(estimatedYear) * (1 - materialRatio) + materialCost
		let initialCost = unitCost * size 
	
		return getAnnualCashFlows(repairRatio, repairCycle, replacementCycle, analysisPeriod, initialCost)
	}

}
// 2. 지붕
function getAnnualCashFlowsOfRoof(techName, size, userInput, analysisPeriod, materialCost) {
	if (
		techName === "옥상 외단열외방수"
	) {
		let filteredInfos = roofDB.filter(
			obj => obj["개선시나리오"] == techName
				&& obj["개선기준"] == "군자동 내역서")[0];

		let repairRatio = filteredInfos['수선율']
		let repairCycle = filteredInfos['수선주기']
		let replacementCycle = filteredInfos['교체주기']
		let estimatedYear = filteredInfos['견적연도']
		let unitCost = filteredInfos['가격'] * reflectInflation(estimatedYear)
		let initialCost = unitCost * size

		return getAnnualCashFlows(repairRatio, repairCycle, replacementCycle, analysisPeriod, initialCost)

	} else {
		let filteredInfos = roofDB.filter(
			obj => obj["용도"] === userInput.buildingTypeBigCategory
				&& obj["개선기준"] === userInput.buildingAge
				&& obj["개선재료"] === '일반'
				&& obj["개선시나리오"] === techName
				&& obj["개선목표"] === '법적수준')[0];

		let repairRatio = filteredInfos['수선율']
		let repairCycle = filteredInfos['수선주기']
		let replacementCycle = filteredInfos['교체주기']
		let materialRatio = filteredInfos['재료비비율']
		let estimatedYear = filteredInfos['견적연도']
		let unitCost = filteredInfos[userInput.areaCateogry] * reflectInflation(estimatedYear) * (1 - materialRatio) + materialCost
		let initialCost = unitCost * size

		return getAnnualCashFlows(repairRatio, repairCycle, replacementCycle, analysisPeriod, initialCost)
	}
}
// 3. 바닥
function getAnnualCashFlowsOfFloor(techName, size, userInput, analysisPeriod, materialCost) {

	let filteredInfos = floorDB.filter(
		obj => obj["개선기준"] === userInput.buildingAge
		&& obj["개선재료"] === '일반'
		&& obj["개선시나리오"] === techName
		&& obj["개선목표"] === '법적수준')[0];

	let repairRatio = filteredInfos['수선율']
	let repairCycle = filteredInfos['수선주기']
	let replacementCycle = filteredInfos['교체주기']
	let materialRatio = filteredInfos['재료비비율']
	let estimatedYear = filteredInfos['견적연도']
	let unitCost = filteredInfos[userInput.areaCateogry] * reflectInflation(estimatedYear) * (1 - materialRatio) + materialCost
	let initialCost = unitCost * size

	return getAnnualCashFlows(repairRatio, repairCycle, replacementCycle, analysisPeriod, initialCost)
}
// 4. 창문
function getAnnualCashFlowsOfWindow(techName, size, userInput, analysisPeriod, materialCost) {
	if (
		techName === "고단열고기밀 창호"
	) {
		let filteredInfos = windowDB.filter(
			obj => obj["개선시나리오"] == techName
				&& obj["개선기준"] == "군자동 내역서")[0];
			
		let repairRatio = filteredInfos['수선율']
		let repairCycle = filteredInfos['수선주기']
		let replacementCycle = filteredInfos['교체주기']
		let estimatedYear = filteredInfos['견적연도']
		let unitCost = filteredInfos['가격'] * reflectInflation(estimatedYear)
		let initialCost = unitCost * size

		return getAnnualCashFlows(repairRatio, repairCycle, replacementCycle, analysisPeriod, initialCost)

	} else {
		let filteredInfos = windowDB.filter(
			obj => obj["용도"] === userInput.buildingTypeBigCategory
				&& obj["개선기준"] === userInput.buildingAge
				&& obj["개선시나리오"] === techName
				&& obj["개선목표"] === '법적수준')[0];

		let repairRatio = filteredInfos['수선율']
		let repairCycle = filteredInfos['수선주기']
		let replacementCycle = filteredInfos['교체주기']
		let materialRatio = filteredInfos['재료비비율']
		let estimatedYear = filteredInfos['견적연도']
		let unitCost = filteredInfos[userInput.areaCateogry] * reflectInflation(estimatedYear) * (1 - materialRatio) + materialCost
		let initialCost = unitCost * size

		return getAnnualCashFlows(repairRatio, repairCycle, replacementCycle, analysisPeriod, initialCost)
	}
}
// 5. 조명
function getAnnualCashFlowsOfLight(size, analysisPeriod) {
	let _costLinearRegession;
	if (size <= 46) {
		_costLinearRegession = [10900, 152600]
	} else if (size > 46 && size <= 59) {
		_costLinearRegession = [8384.615, 268307.7]
	} else if (size > 59 && size <= 84) {
		_costLinearRegession = [13080, -8720]
	} else if (size > 84) {
		_costLinearRegession = [13292.68, -26585.4]
	}

	let filteredInfos = lightDB.filter(
		obj => obj["개선기준"] === '형광등'
			&& obj["개선시나리오"] === 'LED 전면 교체')[0];
	
	let _cost = _costLinearRegession[0] * size + _costLinearRegession[1]

	let repairRatio = filteredInfos['수선율']
	let repairCycle = filteredInfos['수선주기']
	let replacementCycle = filteredInfos['교체주기']
	let estimatedYear = filteredInfos['견적연도']
	let initialCost = _cost * reflectInflation(estimatedYear)
	
	return getAnnualCashFlows(repairRatio, repairCycle, replacementCycle, analysisPeriod, initialCost)
}
// 6. 내부차장
function getAnnualCashFlowsOfInteriorBlind(techName, size, analysisPeriod, materialCost) {

	let filteredInfos = interiorBlindDB.filter(
		obj => obj["개선시나리오"] === techName)[0];

	let repairRatio = filteredInfos['수선율']
	let repairCycle = filteredInfos['수선주기']
	let replacementCycle = filteredInfos['교체주기']
	let estimatedYear = filteredInfos['견적연도']
	let unitCost = filteredInfos['노무비'] * reflectInflation(estimatedYear) + materialCost
	let initialCost = unitCost * size
	
	return getAnnualCashFlows(repairRatio, repairCycle, replacementCycle, analysisPeriod, initialCost)
}
// 7. 외부차양
function getAnnualCashFlowsOfExteriorBlind(techName, size, analysisPeriod) {

	let filteredInfos = exteriorBlindDB.filter(
		obj => obj["개선시나리오"] === techName)[0];

	let repairRatio = filteredInfos['수선율']
	let repairCycle = filteredInfos['수선주기']
	let replacementCycle = filteredInfos['교체주기']
	let estimatedYear = filteredInfos['견적연도']
	let unitCost = filteredInfos['시공비'] * reflectInflation(estimatedYear)
	let incidentalCost = filteredInfos['개소당 시공비'] * reflectInflation(estimatedYear)
	let initialCost = unitCost * size + incidentalCost
	
	return getAnnualCashFlows(repairRatio, repairCycle, replacementCycle, analysisPeriod, initialCost)
}
// 8. 태양광
function getAnnualCashFlowsOfRenewable(techName, size, analysisPeriod) {

	let filteredInfos = renewableDB.filter(
		obj => obj["개선시나리오"] === techName)[0];

	let repairRatio = filteredInfos['수선율']
	let repairCycle = filteredInfos['수선주기']
	let replacementCycle = filteredInfos['교체주기']
	let materialRatio = filteredInfos['재료비비율']
	let estimatedYear = filteredInfos['견적연도']
	let unitCost = filteredInfos['시공비'] * reflectInflation(estimatedYear)
	let initialCost = unitCost * size

	return getAnnualCashFlows(repairRatio, repairCycle, replacementCycle, analysisPeriod, initialCost)
}
// 9. 출입문
function getAnnualCashFlowsOfDoor(techName, size, analysisPeriod, materialCost) {
	if (
		techName === "단열방화도어"
	) {
		let filteredInfos = doorDB.filter(
			obj => obj["개선시나리오"] == techName
				&& obj["개선기준"] == "군자동 내역서")[0];

		let repairRatio = filteredInfos['수선율']
		let repairCycle = filteredInfos['수선주기']
		let replacementCycle = filteredInfos['교체주기']
		let estimatedYear = filteredInfos['견적연도']
		let unitCost = filteredInfos['가격'] * reflectInflation(estimatedYear)
		let initialCost = unitCost * size

		return getAnnualCashFlows(repairRatio, repairCycle, replacementCycle, analysisPeriod, initialCost)

	} else {

		let filteredInfos = doorDB.filter(
			obj => obj["개선시나리오"] === techName)[0];

		let repairRatio = filteredInfos['수선율']
		let repairCycle = filteredInfos['수선주기']
		let replacementCycle = filteredInfos['교체주기']
		let estimatedYear = filteredInfos['견적연도']
		let unitCost = (filteredInfos['노무비'] + filteredInfos['단가배수'] * materialCost) * reflectInflation(estimatedYear)
		let initialCost = unitCost * size

		return getAnnualCashFlows(repairRatio, repairCycle, replacementCycle, analysisPeriod, initialCost)
	}
}
// 10. 냉동기
function getAnnualCashFlowsOfFreezer(size, analysisPeriod) {

	let filteredInfos = freezerDB.filter(
		obj => obj["개선시나리오"] === "상업용 냉동기")[0];

	let repairRatio = filteredInfos['수선율']
	let repairCycle = filteredInfos['수선주기']
	let replacementCycle = filteredInfos['교체주기']
	let materialRatio = filteredInfos['재료비비율']
	let estimatedYear = filteredInfos['견적연도']
	let unitCost = filteredInfos['시공비'] * reflectInflation(estimatedYear)
	let initialCost = unitCost * size

	return getAnnualCashFlows(repairRatio, repairCycle, replacementCycle, analysisPeriod, initialCost)
}
// 11. 보일러
function getAnnualCashFlowsOfBoiler(techName, size, analysisPeriod, materialCost) {

	let filteredInfos = boilerDB.filter(
		obj => obj["모델명"] === techName)[0];
	
	if (Object.keys(filteredInfos).length === 0) {
		let filteredInfos = boilerDB.filter(
			obj => obj["상업용 보일러"] === techName)[0];

		let repairRatio = filteredInfos['수선율']
		let repairCycle = filteredInfos['수선주기']
		let replacementCycle = filteredInfos['교체주기']
		let materialRatio = filteredInfos['재료비비율']
		let estimatedYear = filteredInfos['견적연도']
		
		let initialCost;
		if (Number.isInteger(materialCost)) {
			initialCost = materialCost * (1 / materialRatio)
		} else if (Number.isFinite(materialCost)) {
			initialCost = materialCost * (1 / materialRatio)
		} else {
			initialCost = filteredInfos['시공비'] * reflectInflation(estimatedYear) * size
		}

		return getAnnualCashFlows(repairRatio, repairCycle, replacementCycle, analysisPeriod, initialCost)
		
	} else {
		let repairRatio = filteredInfos['수선율']
		let repairCycle = filteredInfos['수선주기']
		let replacementCycle = filteredInfos['교체주기']
		let estimatedYear = filteredInfos['견적연도']
		let initialCost = filteredInfos['시공비'] * reflectInflation(estimatedYear)
		
		return getAnnualCashFlows(repairRatio, repairCycle, replacementCycle, analysisPeriod, initialCost)
	}
}
// 12. 공조기
function getAnnualCashFlowsOfAHU(size, analysisPeriod, materialCost) {

	let filteredInfos = AHUDB.filter(
		obj => obj["개선시나리오"] === "상업용 공조기")[0];

	let repairRatio = filteredInfos['수선율']
	let repairCycle = filteredInfos['수선주기']
	let replacementCycle = filteredInfos['교체주기']
	let materialRatio = filteredInfos['재료비비율']
	let estimatedYear = filteredInfos['견적연도']
	let unitCost = materialCost * (1/materialRatio) * reflectInflation(estimatedYear)
	let initialCost = unitCost * size

	return getAnnualCashFlows(repairRatio, repairCycle, replacementCycle, analysisPeriod, initialCost)
}
// 13. 히트펌프
function getAnnualCashFlowsOfHeatpump(size, analysisPeriod, materialCost) {

	let filteredInfos = heatpumpDB.filter(
		obj => obj["개선시나리오"] === "상업용 히트펌프")[0];
	
	let repairRatio = filteredInfos['수선율']
	let repairCycle = filteredInfos['수선주기']
	let replacementCycle = filteredInfos['교체주기']
	let estimatedYear = filteredInfos['견적연도']
	let unitCost = (materialCost + filteredInfos['노무비']) * reflectInflation(estimatedYear)
	let initialCost = unitCost * size

	return getAnnualCashFlows(repairRatio, repairCycle, replacementCycle, analysisPeriod, initialCost)
}

function getAnnualCashFlows(repairRatio, repairCycle, replacementCycle, analysisPeriod, initialCost) {
	var annualCashFlow = 0
	var annualCashFlows = []
	for (var i = 0; i < analysisPeriod; i++) {
		if (i == 0) { annualCashFlow += initialCost }
		if (repairCycle == 0) {
			if (i == replacementCycle - 1) {
				annualCashFlow += initialCost
			}
		} else {
			if (i == replacementCycle - 1) {
				annualCashFlow += initialCost
			} else if (i == repairCycle - 1) {
				annualCashFlow += initialCost * repairRatio
			} else {
				annualCashFlow += 0
			}
		}
		annualCashFlows.push(annualCashFlow)
		annualCashFlow = 0
	}
	return annualCashFlows
}

function reflectInflation (estimatedYear) {
	let ppi2022 = PPI.find(item => item.year === 2022);
	let ppi20xx = PPI.find(item => item.year === estimatedYear);
	let inflationRatio = ppi2022.value / ppi20xx.value
	return inflationRatio
}

export {
	getAnnualCashFlowsOfWall, 
	getAnnualCashFlowsOfRoof, 
	getAnnualCashFlowsOfFloor,
	getAnnualCashFlowsOfWindow, 
	getAnnualCashFlowsOfLight, 
	getAnnualCashFlowsOfInteriorBlind,
	getAnnualCashFlowsOfExteriorBlind,
	getAnnualCashFlowsOfRenewable,
	getAnnualCashFlowsOfDoor,
	getAnnualCashFlowsOfFreezer,
	getAnnualCashFlowsOfBoiler,
	getAnnualCashFlowsOfAHU,
	getAnnualCashFlowsOfHeatpump
}