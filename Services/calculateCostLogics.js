
export function loanCalculate(loanAmount, interestRatio, interestSupportRatio, repaymentPeriod, holdPeriod) {
	
	if (interestRatio > interestSupportRatio) {
		var interest = interestRatio - interestSupportRatio
	} else {
		var interest = 0
		var yearPayment = 0
		var yearPayments = []
		for (var i = 0; i < repaymentPeriod; i++){
			var monthPayment = loanAmount/repaymentPeriod
			yearPayment += monthPayment
			if (i == 0) { continue }
			if (i % 12 == 11 ) { 
				yearPayments.push(yearPayment)
				yearPayment = 0 
			}
		}
		return yearPayments
	}

	var yearPayment  = 0
	var yearPayments = []
	var loanRemain = loanAmount
	var interestAmount = 0
	var monthPayment = 0
	for (var i = 0; i < repaymentPeriod; i++) {
		interestAmount = loanRemain * (interest / 12)
		if (holdPeriod > i) {
			monthPayment = interestAmount
		} else {
			monthPayment = loanAmount * (interest / 12) * ((1 + (interest / 12)) ** (repaymentPeriod - holdPeriod)) / ((1 + (interest / 12)) ** (repaymentPeriod - holdPeriod) - 1)
		}
		loanRemain = loanRemain + interestAmount - monthPayment
		yearPayment += monthPayment
		if (i == 0) { continue }
		if (i % 12 == 11 ) { 
			yearPayments.push(yearPayment)
			yearPayment = 0 }
	}
	return yearPayments
}

export function NPVcalculate (yearPayments, realInterest , year){
	if (typeof (yearPayments) == 'number') {
		var NPV = 0
		for (var i = 0; i < year; i++) {
			var presentValue = yearPayments / ((1 + realInterest) ** i)
			NPV += presentValue
		}
		return NPV

	} else {
		var NPV = 0
		for (var i = 0; i < yearPayments.length; i++) {
			var presentValue = yearPayments[i] / ((1 + realInterest) ** i)
			NPV += presentValue
		}
		return NPV
	}
}

export function electricityCostCalculate(buildingType, monthElectricities, E_distinct, E_pressure, E_select ) {
	if (buildingType == '비주거') {
		var yearPayments = nonResidentialElectricityCalculate(monthElectricities, E_distinct, E_pressure, E_select)
	} else {
		var yearPayments = residentialElectricityCalculate(monthElectricities, E_distinct, E_pressure, E_select)
	}
	return yearPayments
}

export function residentialElectricityCalculate(monthElectricities, E_distinct, E_pressure, E_select) {
	const FILE = ElectricityJSON[E_distinct][E_pressure]

	var yearElectricityPayment = 0
	for (var i = 0; i<12; i++){
		var E = monthElectricities[i]

		// different step kWH for summer
		if ([6,8].includes(i) ) {
			var step01_kWH = 300
			var step02_kWH = 450
		} else {
			var step01_kWH = 200
			var step02_kWH = 400
		}
		
		// step price
		if (E <= step01_kWH) {
			var ElecPrice = E * FILE['stage1']
			var basicPrice = FILE['basic1']
			
		} else if (E > step01_kWH & E <= step01_kWH ) {
			var ElecPrice = step01_kWH * FILE['stage1'] + (E-step01_kWH) * FILE['stage2']
			var basicPrice = FILE['basic2']
			
		} else {
			var ElecPrice = step01_kWH * FILE['stage1'] + (step02_kWH-step01_kWH) * FILE['stage2'] + (E-step02_kWH) * FILE['stage3']
			var basicPrice = FILE['basic3']
		}

		// additional price for super user
		if ([6,8].includes(i)) {
			if (E > 1000) {
				ElecPrice += (E-step02_kWH) * (FILE['super_summer']-FILE['stage3'])
			}
		}
		
		if ([0,1,11].includes(i)){
			if (E > 1000) {
				ElecPrice += (E-step02_kWH) * (FILE['super_winter']-FILE['stage3'])
			}
		}
		
		// final price including VAT ect
		var climatePrice = E * 7.3
		var fuelControlPrice = E * 5
		var billMeter = basicPrice + ElecPrice + climatePrice + fuelControlPrice
		var VAT = billMeter * 0.1
		var foundationFund = billMeter * 0.037
		yearElectricityPayment += Math.floor(billMeter + VAT + foundationFund)
	}
	return yearElectricityPayment
}

export function nonResidentialElectricityCalculate(monthElectricities, E_distinct, E_pressure, E_select) {
	if (E_distinct == 'Basic GAB 1') {
		if (E_pressure == 'low pressure') {
			const FILE = ElectricityJSON[E_distinct][E_pressure]
		} else {
			const FILE = ElectricityJSON[E_distinct][E_pressure][E_select]
		}
	} else {
		const FILE = ElectricityJSON[E_distinct][E_pressure][E_select]['medium']
	}

	var yearElectricityPayment = 0
	for (i = 0; i<12; i++){
		var E = monthElectricities[i]

		// different price for each season
		if ([6,8].includes(i)) {
			var ElecPrice = E * FILE['summer']
		} else if ([0,1,11]/includes(i)) {
			var ElecPrice = E * FILE['winter']
		} else {
			var ElecPrice = E * FILE['spring']
		}
		
		// final price including VAT ect
		var climatePrice = E * 7.3
		var fuelControlPrice = E * 5
		var billMeter = basicPrice + ElecPrice + climatePrice + fuelControlPrice
		var VAT = billMeter * 0.1
		var foundationFund = billMeter * 0.037
		yearElectricityPayment += Math.floor(billMeter + VAT + foundationFund)
	}
	return yearElectricityPayment
}

export function gasCostCalculate(buildingType,monthGas,city ) {
	
	const FILE = GasJSON[city]
	const UnitHeat = GasJSON['unit heat']
	const BasicPrice = GasJSON[city]['basic']
	const Factor = 0.998
	
	var yearGasPayment = 0
	for (let i = 0; i < 12; i++) {
		var G = monthGas[i]
		
		// Basic 1. different price for each season
		if (buildingType == '비주거') {
			if ([5, 6, 7, 8].includes(i)) {
				var GasPrice = G * FILE['Basic 1']['summer'] * Factor * UnitHeat[i] + BasicPrice
			} else if ([0, 1, 2, 11] / includes(i)) {
				var GasPrice = G * FILE['Basic 1']['winter'] * Factor * UnitHeat[i] + BasicPrice
			} else {
				var GasPrice = G * FILE['Basic 1']['spring'] * Factor * UnitHeat[i] + BasicPrice
			}
			
			// Residential. same price for each season
		} else {
			var GasPrice = G * FILE['Residential'] * Factor * UnitHeat[i] + BasicPrice
		}
		
		var VAT = GasPrice * 0.1
		yearGasPayment += Math.floor(GasPrice + VAT)
	}
	
	return yearGasPayment
}

import {} from '../configs/greenyPriceDB.js'
export function getAnnualCashFlowsOfWallRoofWindow(techName, size, userInput, analysisPeriod) {

	if (cls === 'wall' || 'roof') {
		const filteredInfos = GreenyDB.filter(
			obj => obj["용도"] === buildingTypeBigCategory
			&& obj["부위"] === techClass
			&& obj["개선기준"] === buildingAge
			&& obj["개선시나리오"] === techName
			&& obj["개선목표"] === '법적수준');
	} else if (cls === 'window') {
		const filteredInfos = GreenyDB.filter(
			obj => obj["용도"] === buildingTypeBigCategory
			&& obj["부위"] === techClass
			&& obj["개선기준"] === buildingAge
			&& obj["개선시나리오"] === techName
			&& obj["개선목표"] === '법적수준');
	} else {
		throw new Error('Could not find the information from database. This is due to set wrong filter or set wrong cls.')
	}

	let repairRatio = filteredInfos['수선율']
	let repairCycle = filteredInfos['수선주기']
	let replacementCycle = filteredInfos['교체주기']
	let materialRatio = filteredInfos['재료비비율']
	let initialCost = filteredInfos[userInput.areaCateogry] * size * (1 - materialRatio) + materialCost

	return getAnnualCashFlows(repairRatio, repairCycle, replacementCycle, analysisPeriod, initialCost)
}

export function getAnnualCashFlowsOfWallRoof(techName, size, userInput, analysisPeriod, materialCost) {
	let filteredInfos = GreenyDB.filter(
		obj => obj["용도"] === buildingTypeBigCategory
		&& obj["부위"] === techClass
		&& obj["개선재료"] === '일반'
		&& obj["개선기준"] === buildingAge
		&& obj["개선시나리오"] === techName
		&& obj["개선목표"] === '법적수준');

	let repairRatio = filteredInfos['수선율']
	let repairCycle = filteredInfos['수선주기']
	let replacementCycle = filteredInfos['교체주기']
	let materialRatio = filteredInfos['재료비비율']
	let initialCost = filteredInfos[userInput.areaCateogry] * size * (1-materialRatio) + materialCost
	
	return getAnnualCashFlows(repairRatio, repairCycle, replacementCycle, analysisPeriod, initialCost)
}

export function getAnnualCashFlowsOfWindow(techName, size, userInput, analysisPeriod, materialCost) {
	let filteredInfos = GreenyDB.filter(
		obj => obj["용도"] === buildingTypeBigCategory
		&& obj["부위"] === techClass
		&& obj["개선기준"] === buildingAge
		&& obj["개선시나리오"] === techName
		&& obj["개선목표"] === '법적수준');

	let repairRatio = filteredInfos['수선율']
	let repairCycle = filteredInfos['수선주기']
	let replacementCycle = filteredInfos['교체주기']
	let materialRatio = filteredInfos['재료비비율']
	let initialCost = filteredInfos[userInput.areaCateogry] * size * (1-materialRatio) + materialCost
	
	return getAnnualCashFlows(repairRatio, repairCycle, replacementCycle, analysisPeriod, initialCost)
}

export function getAnnualCashFlowsOfLight(techName, size, userInput, analysisPeriod, materialCost) {
	if (size <= 46) {
		let _costLinearRegession = [10900, 152600]
	} else if (size > 46 && size <= 59) {
		let _costLinearRegession = [8384.615, 268307.7]
	} else if (size > 59 && size <= 84) {
		let _costLinearRegession = [13080, -8720]
	} else if (size > 84) {
		let _costLinearRegession = [13292.68, -26585.4]
	}

	let filteredInfos = GreenyDB.filter(
		obj => obj["용도"] === buildingTypeBigCategory
		&& obj["부위"] === techClass
		&& obj["개선시나리오"] === techName);

	let repairRatio = filteredInfos['수선율']
	let repairCycle = filteredInfos['수선주기']
	let replacementCycle = filteredInfos['교체주기']
	let materialRatio = filteredInfos['재료비비율']
	if (buildingTypeBigCategory === '주거') { 
		let _cost = filteredInfos['가격']
	} else {
		let _cost = _costLinearRegession[0] * size + _costLinearRegession[1]
	}
	let initialCost = _cost * (1-materialRatio) + materialCost
	
	return getAnnualCashFlows(repairRatio, repairCycle, replacementCycle, analysisPeriod, initialCost)
}

export function getAnnualCashFlowsOfRenewable(techName, size, userInput, analysisPeriod, materialCost) {

	let filteredInfos = GreenyDB.filter(
		obj => obj["부위"] === techClass
			&& obj["개선시나리오"] === techName);

	let repairRatio = filteredInfos['수선율']
	let repairCycle = filteredInfos['수선주기']
	let replacementCycle = filteredInfos['교체주기']
	let materialRatio = filteredInfos['재료비비율']
	let initialCost = filteredInfos['가격'] * size * (1 - materialRatio) + materialCost

	return getAnnualCashFlows(repairRatio, repairCycle, replacementCycle, analysisPeriod, initialCost)
}

export function getAnnualCashFlowsOfHeatpump(techName, size, userInput, analysisPeriod, materialCost) {

	let filteredInfos = GreenyDB.filter(
		obj => obj["부위"] === techClass
			&& obj["개선시나리오"] === techName);

	let repairRatio = filteredInfos['수선율']
	let repairCycle = filteredInfos['수선주기']
	let replacementCycle = filteredInfos['교체주기']
	let materialRatio = filteredInfos['재료비비율']
	let _cost = filteredInfos['기울기'] * size + filteredInfos['절편값']
	let initialCost = _cost * (1 - materialRatio) + materialCost

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

export function totalRemodelingCost(TechnologyData) {
	const technologyClsList = ['외벽', '창호', '공조', '냉난방', '조명', '전기', '신재생']
	var totalRemodelingCost = 0
	for (var i = 0; i < 7; i++) {
		var cls = technologyClsList[i]
		var techName = TechnologyData[cls].name
		var techSize = TechnologyData[cls].size
		var FILE = TechnologyJSON[cls][techName]
		var initialCost = FILE['initial unit price'] * techSize
		totalRemodelingCost += initialCost
	}
	return totalRemodelingCost
}
