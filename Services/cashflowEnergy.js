
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