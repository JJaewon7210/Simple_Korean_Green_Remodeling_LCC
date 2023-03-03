import { getAnnualCashFlows, electricityCostCalculate, gasCostCalculate, NPVcalculate } from './calculateCostLogics.js'
import {
	energyContract,
	monthlyElectricityInput, monthlyGasInput,
	LCCAssumptionInput, remodelingTechInput, detailedFundInformationInput
} from '../controllers/client_input.js'

import { userInput } from '../utils/updateInput.js'
import {
	getAnnualCashFlowsOfHeatpump, getAnnualCashFlowsOfLight, getAnnualCashFlowsOfRenewable, getAnnualCashFlowsOfRoof,
	getAnnualCashFlowsOfWall, getAnnualCashFlowsOfWindow, getAnnualCashFlowsOfPackage
} from './cashflowTechnology.js'

var totalWallCashFlow = 0
if (length(remodelingTechInput.wall.name) > 0) {
	for (i = 0; i++; i < length(remodelingTechInput.wall.name)) {
		wallCashFlows = getAnnualCashFlowsOfWall(remodelingTechInput.wall.name[i], remodelingTechInput.wall.size[i], userInput, LCCAssumptionInput.analysisPeriod, remodelingTechInput.wall['material cost'][i])
		totalWallCashFlow += NPVcalculate(wallCashFlows, userData.realInterest)
	}
}

var totalRoofCashFlow = 0
if (length(remodelingTechInput.roof.name) > 0) {
	for (i = 0; i++; i < length(remodelingTechInput.roof.name)) {
		roofCashFlows = getAnnualCashFlowsOfRoof(remodelingTechInput.roof.name[i], remodelingTechInput.roof.size[i], userInput, LCCAssumptionInput.analysisPeriod, remodelingTechInput.roof['material cost'][i])
		totalRoofCashFlow += NPVcalculate(roofCashFlows, userData.realInterest)
	}
}


var totalWindowCashFlow = 0
if (length(remodelingTechInput.window.name) > 0) {
	for (i = 0; i++; i < length(remodelingTechInput.window.name)) {
		windowCashFlows = getAnnualCashFlowsOfWindow(remodelingTechInput.window.name[i], remodelingTechInput.window.size[i], userInput, LCCAssumptionInput.analysisPeriod, remodelingTechInput.window['material cost'][i])
		totalWindowCashFlow += NPVcalculate(windowCashFlows, userData.realInterest)
	}
}

var totalHeatpumpCashFlow = 0
if (length(remodelingTechInput.heatpump.name) > 0) {
	for (i = 0; i++; i < length(remodelingTechInput.heatpump.name)) {
		heatpumpCashFlows = getAnnualCashFlowsOfHeatpump(remodelingTechInput.heatpump.name[i], remodelingTechInput.heatpump.size[i], userInput, LCCAssumptionInput.analysisPeriod, remodelingTechInput.heatpump['material cost'][i])
		totalHeatpumpCashFlow += NPVcalculate(heatpumpCashFlows, userData.realInterest)
	}
}

var totalLightCashFlow = 0
if (length(remodelingTechInput.light.name) > 0) {
	for (i = 0; i++; i < length(remodelingTechInput.light.name)) {
		lightCashFlows = getAnnualCashFlowsOfLight(remodelingTechInput.light.name[i], remodelingTechInput.light.size[i], userInput, LCCAssumptionInput.analysisPeriod, remodelingTechInput.light['material cost'][i])
		totalLightCashFlow += NPVcalculate(lightCashFlows, userData.realInterest)
	}
}

var totalRenewableCashFlow = 0
if (length(remodelingTechInput.renewable.name) > 0) {
	for (i = 0; i++; i < length(remodelingTechInput.renewable.name)) {
		renewableCashFlows = getAnnualCashFlowsOfRenewable(remodelingTechInput.renewable.name[i], remodelingTechInput.renewable.size[i], userInput, LCCAssumptionInput.analysisPeriod, remodelingTechInput.renewable['material cost'][i])
		totalRenewableCashFlow += NPVcalculate(renewableCashFlows, userData.realInterest)
	}
}

var totalPackageCashFlow = 0
if (length(remodelingTechInput.package.name) > 0) {
	for (i = 0; i++; i < length(remodelingTechInput.package.name)) {
		packageCashFlows = getAnnualCashFlowsOfPackage(remodelingTechInput.package.name[i], remodelingTechInput.package.size[i], userInput, LCCAssumptionInput.analysisPeriod, remodelingTechInput.package['material cost'][i])
		totalPackageCashFlow += NPVcalculate(packageCashFlows, userData.realInterest)
	}
}

var totalCashFlow = totalWallCashFlow + totalRoofCashFlow + totalWindowCashFlow + totalHeatpumpCashFlow + totalLightCashFlow + totalRenewableCashFlow + totalPackageCashFlow

// calculate electricity and gas cost
var EPRICE_BEFORE = electricityCostCalculate(userData.buildingType, ElectricityData.before, ElectricityData.distint, ElectricityData.pressure, ElectricityData.select)
var EPRICE_AFTER  = electricityCostCalculate(userData.buildingType, ElectricityData.after,  ElectricityData.distint, ElectricityData.pressure, ElectricityData.select)
var E_NPV = NPVcalculate(EPRICE_BEFORE - EPRICE_AFTER, userData.realInterest, userData.analysisPeriod)

var GPRICE_BEFORE = gasCostCalculate(userData.buildingType, GasData.before, userData.city)
var GPRICE_AFTER  = gasCostCalculate(userData.buildingType, GasData.after,  userData.city)
var G_NPV = NPVcalculate(GPRICE_BEFORE - GPRICE_AFTER, userData.realInterest, userData.analysisPeriod)

TECH_PAY = totalCashFlow
export {TECH_PAY, E_NPV, G_NPV}