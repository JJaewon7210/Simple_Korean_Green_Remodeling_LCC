import { electricityResidentalPriceDB, electricityIndustrialPriceDB } from "../configs/electricityPriceDB.js"
import { gasPriceDB } from "../configs/gasPriceDB.js";

export function electricityCostCalculate( montlyElectricityConsumption, userInput, energyContract) {
	if (userInput.buildingType == '비주거') {
		var annualElectricityCashFlows = nonResidentialElectricityCalculate(montlyElectricityConsumption, energyContract)
	} else {
		var annualElectricityCashFlows = residentialElectricityCalculate(montlyElectricityConsumption, energyContract)
	}
	return annualElectricityCashFlows
}

function residentialElectricityCalculate(montlyElectricityConsumption, energyContract) {
	let FILE = electricityResidentalPriceDB.filter(
		obj => obj["전압"] === energyContract.pressure);

	var yearElectricityPayment = 0
	for (var i = 0; i<12; i++){
		var E = montlyElectricityConsumption[i]

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
			var ElecPrice = E * FILE['구간1']
			var basicPrice = FILE['기본요금1']
			
		} else if (E > step01_kWH & E <= step01_kWH ) {
			var ElecPrice = step01_kWH * FILE['구간1'] + (E-step01_kWH) * FILE['구간2']
			var basicPrice = FILE['기본요금2']
			
		} else {
			var ElecPrice = step01_kWH * FILE['구간1'] + (step02_kWH-step01_kWH) * FILE['구간2'] + (E-step02_kWH) * FILE['구간3']
			var basicPrice = FILE['기본요금3']
		}

		// additional price for super user
		if ([6,8].includes(i)) {
			if (E > 1000) {
				ElecPrice += (E-step02_kWH) * (FILE['슈펴유저_여름']-FILE['구간3'])
			}
		}
		
		if ([0,1,11].includes(i)){
			if (E > 1000) {
				ElecPrice += (E-step02_kWH) * (FILE['슈퍼유저_겨울']-FILE['구간3'])
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

function nonResidentialElectricityCalculate(montlyElectricityConsumption, energyContract) {

	let FILE = electricityIndustrialPriceDB.filter(
		obj => obj["전압"] === energyContract.pressure
			&& obj["용도"] === energyContract.distinct
			&& obj["선택"] === energyContract.select
			&& obj["시간대"] === '중간부하');


	var yearElectricityPayment = 0
	for (i = 0; i<12; i++){
		var E = montlyElectricityConsumption[i]

		// different price for each season
		if ([6,8].includes(i)) {
			var ElecPrice = E * FILE['여름철']
		} else if ([0,1,11]/includes(i)) {
			var ElecPrice = E * FILE['겨울철']
		} else {
			var ElecPrice = E * FILE['봄가을철']
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

export function gasCostCalculate(monthlyGasConsumption, userInput) {
	
	let FILE = gasPriceDB.filter(
		obj => obj["지역"] === userInput.city);

	const UnitHeat = [43.028, 42.398, 42.65, 42.719, 42.681, 42.539, 42.573, 42.413, 42.5, 42.842, 42.802, 42.716]
	const BasicPrice = FILE['주택용_기본요금']
	const Factor = 0.998
	
	var yearGasPayment = 0
	for (let i = 0; i < 12; i++) {
		var G = monthlyGasConsumption[i]
		
		// Basic 1. different price for each season
		if (userInput.buildingType == '비주거') {
			if ([5, 6, 7, 8].includes(i)) {
				var GasPrice = G * FILE['일반용1_하절기'] * Factor * UnitHeat[i] + BasicPrice
			} else if ([0, 1, 2, 11] / includes(i)) {
				var GasPrice = G * FILE['일반용1_동절기'] * Factor * UnitHeat[i] + BasicPrice
			} else {
				var GasPrice = G * FILE['일반용1_기타월'] * Factor * UnitHeat[i] + BasicPrice
			}
			
		// Residential. same price for each season
		} else {
			var GasPrice = G * FILE['주택용_주택난방'] * Factor * UnitHeat[i] + BasicPrice
		}
		
		var VAT = GasPrice * 0.1
		yearGasPayment += Math.floor(GasPrice + VAT)
	}
	
	return yearGasPayment
}