import { wallDB } from '../configs/wallDB.js'
import { roofDB } from '../configs/roofDB.js'
import { windowDB } from '../configs/windowDB.js'
import { lightDB } from '../configs/lightDB.js'
import { renewableDB } from '../configs/renewableDB.js'
import { heatpumpDB } from '../configs/heatpumpDB.js'
import { packageDB } from '../configs/packageDB.js'

function getAnnualCashFlowsOfWall(techName, size, userInput, analysisPeriod) {

	const filteredInfos = wallDB.filter(
		obj => obj["용도"] === userInput.buildingTypeBigCategory
		&& obj["개선기준"] === userInput.buildingAge
		&& obj["개선재료"] === '일반'
		&& obj["개선시나리오"] === techName
		&& obj["개선목표"] === '법적수준');

	let repairRatio = filteredInfos['수선율']
	let repairCycle = filteredInfos['수선주기']
	let replacementCycle = filteredInfos['교체주기']
	let materialRatio = filteredInfos['재료비비율']
	let estimatedYear = filteredInfos['견적연도']
	let unitCost = filteredInfos[userInput.areaCateogry] * reflectInflation(estimatedYear) * (1 - materialRatio) + materialCost
	let initalCost = unitCost * size 

	return getAnnualCashFlows(repairRatio, repairCycle, replacementCycle, analysisPeriod, initialCost)
}

function getAnnualCashFlowsOfRoof(techName, size, userInput, analysisPeriod) {

	const filteredInfos = roofDB.filter(
		obj => obj["용도"] === userInput.buildingTypeBigCategory
		&& obj["개선기준"] === userInput.buildingAge
		&& obj["개선재료"] === '일반'
		&& obj["개선시나리오"] === techName
		&& obj["개선목표"] === '법적수준');

	let repairRatio = filteredInfos['수선율']
	let repairCycle = filteredInfos['수선주기']
	let replacementCycle = filteredInfos['교체주기']
	let materialRatio = filteredInfos['재료비비율']
	let estimatedYear = filteredInfos['견적연도']
	let unitCost = filteredInfos[userInput.areaCateogry] * reflectInflation(estimatedYear) * (1 - materialRatio) + materialCost
	let initialCost = unitCost * size

	return getAnnualCashFlows(repairRatio, repairCycle, replacementCycle, analysisPeriod, initialCost)
}

function getAnnualCashFlowsOfWindow(techName, size, userInput, analysisPeriod, materialCost) {
	let filteredInfos = windowDB.filter(
		obj => obj["용도"] === userInput.buildingTypeBigCategory
		&& obj["개선기준"] === userInput.buildingAge
		&& obj["개선시나리오"] === techName
		&& obj["개선목표"] === '법적수준');

	let repairRatio = filteredInfos['수선율']
	let repairCycle = filteredInfos['수선주기']
	let replacementCycle = filteredInfos['교체주기']
	let materialRatio = filteredInfos['재료비비율']
	let estimatedYear = filteredInfos['견적연도']
	let unitCost = filteredInfos[userInput.areaCateogry] * reflectInflation(estimatedYear) * (1-materialRatio) + materialCost
	let initialCost = unitCost * size
	
	return getAnnualCashFlows(repairRatio, repairCycle, replacementCycle, analysisPeriod, initialCost)
}

function getAnnualCashFlowsOfLight(techName, size, userInput, analysisPeriod, materialCost) {
	if (size <= 46) {
		let _costLinearRegession = [10900, 152600]
	} else if (size > 46 && size <= 59) {
		let _costLinearRegession = [8384.615, 268307.7]
	} else if (size > 59 && size <= 84) {
		let _costLinearRegession = [13080, -8720]
	} else if (size > 84) {
		let _costLinearRegession = [13292.68, -26585.4]
	}

	let filteredInfos = lightDB.filter(
		obj => obj["용도"] === userInput.buildingTypeBigCategory
		&& obj["개선기준"] === '형광등'
		&& obj["개선시나리오"] === techName);

	if (buildingTypeBigCategory === '주거') { 
		let _cost = filteredInfos['가격']
	} else {
		let _cost = _costLinearRegession[0] * size + _costLinearRegession[1]
	}

	let repairRatio = filteredInfos['수선율']
	let repairCycle = filteredInfos['수선주기']
	let replacementCycle = filteredInfos['교체주기']
	let materialRatio = filteredInfos['재료비비율']
	let estimatedYear = filteredInfos['견적연도']
	let initialCost = _cost * (1 - materialRatio) * reflectInflation(estimatedYear) + materialCost * size
	
	return getAnnualCashFlows(repairRatio, repairCycle, replacementCycle, analysisPeriod, initialCost)
}

function getAnnualCashFlowsOfRenewable(techName, size, userInput, analysisPeriod, materialCost) {

	let filteredInfos = renewableDB.filter(
		obj => obj["개선시나리오"] === techName);

	let repairRatio = filteredInfos['수선율']
	let repairCycle = filteredInfos['수선주기']
	let replacementCycle = filteredInfos['교체주기']
	let materialRatio = filteredInfos['재료비비율']
	let estimatedYear = filteredInfos['견적연도']
	let unitCost = filteredInfos['가격'] * reflectInflation(estimatedYear) * (1 - materialRatio) + materialCost
	let initialCost = unitCost * size

	return getAnnualCashFlows(repairRatio, repairCycle, replacementCycle, analysisPeriod, initialCost)
}

function getAnnualCashFlowsOfHeatpump(techName, size, userInput, analysisPeriod, materialCost) {

	let filteredInfos = heatpumpDB.filter(
		obj => obj["개선시나리오"] === techName);

	let repairRatio = filteredInfos['수선율']
	let repairCycle = filteredInfos['수선주기']
	let replacementCycle = filteredInfos['교체주기']
	let materialRatio = filteredInfos['재료비비율']
	let estimatedYear = filteredInfos['견적연도']
	let _cost = filteredInfos['기울기'] * size + filteredInfos['절편값']
	let initialCost = _cost * reflectInflation(estimatedYear) * (1 - materialRatio) + materialCost * size

	return getAnnualCashFlows(repairRatio, repairCycle, replacementCycle, analysisPeriod, initialCost)
}

function getAnnualCashFlowsOfPackage(techName, size, userInput, analysisPeriod) {
				
	if (techName === '외단열 하이패브시스템') {
		let filteredInfos = packageDB.filter(
			obj => obj["개선시나리오"] === techName
				&& obj["개선기준"] === '군자동 내역서'
				&& obj["개선재료"] === '복합보드');

	} else if (techName === '옥상 외단열외방수') {
		let filteredInfos = packageDB.filter(
			obj => obj["개선시나리오"] === techName
				&& obj["개선기준"] === '군자동 내역서');

	} else if (techName === '단열방화도어') {
		let filteredInfos = packageDB.filter(
			obj => obj["개선시나리오"] === techName
				&& obj["개선기준"] === '군자동 내역서');
	
	} else if (techName === '고단열고기밀 창호') {
		let filteredInfos = packageDB.filter(
			obj => obj["개선시나리오"] === techName
				&& obj["개선기준"] === '군자동 내역서');

	} else if (techName === '스마트배선시스템 (PC 공법)') {
		let filteredInfos = packageDB.filter(
			obj => obj["개선시나리오"] === techName);
	} else {
		throw new Error('Could not find the information from database. This may be due to define wrong techName.')
	}

	let repairRatio = filteredInfos['수선율']
	let repairCycle = filteredInfos['수선주기']
	let replacementCycle = filteredInfos['교체주기']
	let estimatedYear = filteredInfos['견적연도']
	let initialCost = filteredInfos['가격'] * reflectInflation(estimatedYear) * size

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
	// production price index 2013 ~ 2022
	PPI = {
		2013: 104.74,
		2014: 104.18,
		2015: 100.00,
		2016: 98.18,
		2017: 101.57,
		2018: 103.48,
		2019: 103.50,
		2020: 103.03,
		2021: 109.60,
		2022: 118.78,
	}

	inflationRatio = PPI[2022]/PPI[estiamtedYear]

	return inflationRatio
}

export {
	getAnnualCashFlowsOfWall, getAnnualCashFlowsOfRoof, getAnnualCashFlowsOfWindow, getAnnualCashFlowsOfRenewable,
	getAnnualCashFlowsOfHeatpump, getAnnualCashFlowsOfLight, getAnnualCashFlowsOfPackage
}