/** 
 * @param {int} loanAmount 한 사업에서 대출한 금액 (그린리모델링 이자지원사업, 서울시 집수리, 농어촌, 주택담보, 신용대출)
 * @param {float} interestRatio 이자율
 * @param {float} interestSupportRatio 이자지원율
 * @param {int} repaymentPeriod 상환기간
 * @param {int} holdPeriod 거치기간
 * @return {Array} 연도별 상환할 금액을 반환
 * **/
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

/** 
 * @param {Array | number} yearPayments 연도별 금액 (Array). 단일 값(number)으로 들어오면 뒤에 year변수를 같이 입력해주세요.
 * @param {number} realInterest 실질할인율
 * @param {number} year yearPayments가 단일 값(number)라면 해당 년도만큼 복사되어서 계산됩니다. 
 * @return {int} 실질할인율을 따져서 순현재가치 (NPV) 로 변환된 금액을 반환
 * **/
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

/** 
 * @param {string} buildingType 건물유형 '비주거', '주거-단독', '주거-다중', '주거-다가구', '주거-다세대', '주거-연립', 
 * @param {Array} monthElectricities 월간 전기사용량이 담겨 있는 12칸 짜리 Array 
 * @param {string} E_distinct 전기계약 구분 'Residential', 'Basic GAB 1', 'Basic GAB 2', 'Basic ULL', 
 * @param {string} E_pressure 전기계약 전압 'high pressure', 'low pressure' , 'high pressure A', 'high pressure B', 'high pressure C'
 * @param {string} E_select 전기계약 선택 'select 1', 'select 2', 'select 3'
 * @return {int} 연간 사용한 전기에 대한 총 금액을 반환
 * **/
export function electricityCostCalculate(buildingType, monthElectricities, E_distinct, E_pressure, E_select ) {
	if (buildingType == '비주거') {
		var yearPayments = nonResidentialElectricityCalculate(monthElectricities, E_distinct, E_pressure, E_select)
	} else {
		var yearPayments = residentialElectricityCalculate(monthElectricities, E_distinct, E_pressure, E_select)
	}
	return yearPayments
}

import { ElectricityJSON } from '../files/Electricity.js'
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

/** 
 * @param {string} buildingType 건물유형 '비주거', '주거-단독', '주거-다중', '주거-다가구', '주거-다세대', '주거-연립' 
 * @param {Array} monthGas 월간 가스사용량이 담겨 있는 12칸 짜리 Array 
 * @param {string} city 거주중인 도시 및 지역 
 * @return {int} 연간 사용한 가스에 대한 총 금액을 반환
 * **/
 import { GasJSON } from '../files/Gas.js'
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

/** 
 * @param {string} cls 기술유형 [외벽, 창호, 공조, 냉난방, 조명, 전기 ,신재생] 
 * @param {string} techName 기술명칭 ex.고효율 단열 복합시스템, 외단열 등 
 * @param {float} size 면적 및 수량. 기술의 금액을 구할 때는 단위기준금액 x(면적 또는 수량)으로 계산된다.
 * @param {int} period 해당 기술이 적용되는 총 연도
 * @return {int} 해당 기술을 설치했을 때 소모되는 연간 금액을 반환
 * **/
import { TechnologyJSON } from '../files/Technology.js'
export function technologyAmount(cls, techName, size, period) {
	const FILE = TechnologyJSON[cls][techName]
	const initialCost = FILE['initial unit price'] * size
	const repairRatio = FILE['repair ratio']
	const repairCycle = FILE['repair cycle']
	const replacementCycle = FILE['replacementCycle']

	var yearPayment = 0
	var yearPayments = []
	for (var i = 0; i < period; i++) {
		if (i == 0) { yearPayment += initialCost }
		if (repairCycle == 0) {
			if (i == replacementCycle - 1) {
				yearPayment += initialCost
			}
		} else {
			if (i == replacementCycle - 1) {
				yearPayment += initialCost
			} else if (i == repairCycle - 1) {
				yearPayment += initialCost * repairRatio
			} else {
				yearPayment += 0
			}
		}
		yearPayments.push(yearPayment)
		yearPayment = 0
	}
	return yearPayments
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
