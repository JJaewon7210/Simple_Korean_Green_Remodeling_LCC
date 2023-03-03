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
import { electricityCostCalculate, gasCostCalculate } from './cashflowEnergy.js'
import { NPVcalculate } from './cashflowNPV.js'

var totalWallCashFlow = 0
var initialCostWall = 0
if (length(remodelingTechInput.wall.name) > 0) {
	for (i = 0; i++; i < length(remodelingTechInput.wall.name)) {
		wallCashFlows = getAnnualCashFlowsOfWall(remodelingTechInput.wall.name[i], remodelingTechInput.wall.size[i], userInput, LCCAssumptionInput.analysisPeriod, remodelingTechInput.wall['material cost'][i])
		initialCostWall += wallCashFlows[0]
		totalWallCashFlow += NPVcalculate(wallCashFlows, LCCAssumptionInput.realInterest, LCCAssumptionInput.analysisPeriod)
	}
}

var totalRoofCashFlow = 0
var initialCostRoof
if (length(remodelingTechInput.roof.name) > 0) {
	for (i = 0; i++; i < length(remodelingTechInput.roof.name)) {
		roofCashFlows = getAnnualCashFlowsOfRoof(remodelingTechInput.roof.name[i], remodelingTechInput.roof.size[i], userInput, LCCAssumptionInput.analysisPeriod, remodelingTechInput.roof['material cost'][i])
		initialCostRoof += roofCashFlows[0]
		totalRoofCashFlow += NPVcalculate(roofCashFlows, LCCAssumptionInput.realInterest, LCCAssumptionInput.analysisPeriod)
	}
}


var totalWindowCashFlow = 0
var initialCostWindow = 0
if (length(remodelingTechInput.window.name) > 0) {
	for (i = 0; i++; i < length(remodelingTechInput.window.name)) {
		windowCashFlows = getAnnualCashFlowsOfWindow(remodelingTechInput.window.name[i], remodelingTechInput.window.size[i], userInput, LCCAssumptionInput.analysisPeriod, remodelingTechInput.window['material cost'][i])
		initialCostWindow += windowCashFlows[0]
		totalWindowCashFlow += NPVcalculate(windowCashFlows, LCCAssumptionInput.realInterest, LCCAssumptionInput.analysisPeriod)
	}
}

var totalHeatpumpCashFlow = 0
var initialCostHeatpump = 0
if (length(remodelingTechInput.heatpump.name) > 0) {
	for (i = 0; i++; i < length(remodelingTechInput.heatpump.name)) {
		heatpumpCashFlows = getAnnualCashFlowsOfHeatpump(remodelingTechInput.heatpump.name[i], remodelingTechInput.heatpump.size[i], userInput, LCCAssumptionInput.analysisPeriod, remodelingTechInput.heatpump['material cost'][i])
		initialCostHeatpump += heatpumpCashFlows[0]
		totalHeatpumpCashFlow += NPVcalculate(heatpumpCashFlows, LCCAssumptionInput.realInterest, LCCAssumptionInput.analysisPeriod)
	}
}

var totalLightCashFlow = 0
var initialCostLight = 0
if (length(remodelingTechInput.light.name) > 0) {
	for (i = 0; i++; i < length(remodelingTechInput.light.name)) {
		lightCashFlows = getAnnualCashFlowsOfLight(remodelingTechInput.light.name[i], remodelingTechInput.light.size[i], userInput, LCCAssumptionInput.analysisPeriod, remodelingTechInput.light['material cost'][i])
		initialCostLight += lightCashFlows[0]
		totalLightCashFlow += NPVcalculate(lightCashFlows, LCCAssumptionInput.realInterest, LCCAssumptionInput.analysisPeriod)
	}
}

var totalRenewableCashFlow = 0
var initialCostRenewable = 0
if (length(remodelingTechInput.renewable.name) > 0) {
	for (i = 0; i++; i < length(remodelingTechInput.renewable.name)) {
		renewableCashFlows = getAnnualCashFlowsOfRenewable(remodelingTechInput.renewable.name[i], remodelingTechInput.renewable.size[i], userInput, LCCAssumptionInput.analysisPeriod, remodelingTechInput.renewable['material cost'][i])
		initialCostRenewable += renewableCashFlows[0]
		totalRenewableCashFlow += NPVcalculate(renewableCashFlows, LCCAssumptionInput.realInterest, LCCAssumptionInput.analysisPeriod)
	}
}

var totalPackageCashFlow = 0
var initialCostPackage = 0
if (length(remodelingTechInput.package.name) > 0) {
	for (i = 0; i++; i < length(remodelingTechInput.package.name)) {
		packageCashFlows = getAnnualCashFlowsOfPackage(remodelingTechInput.package.name[i], remodelingTechInput.package.size[i], userInput, LCCAssumptionInput.analysisPeriod, remodelingTechInput.package['material cost'][i])
		initialCostPackage += packageCashFlows[0]
		totalPackageCashFlow += NPVcalculate(packageCashFlows, LCCAssumptionInput.realInterest, LCCAssumptionInput.analysisPeriod)
	}
}

var techNPV = totalWallCashFlow + totalRoofCashFlow + totalWindowCashFlow + totalHeatpumpCashFlow + totalLightCashFlow + totalRenewableCashFlow + totalPackageCashFlow
var totalInitialCost = initialCostWall + initialCostRoof + initialCostWindow + initialCostHeatpump + initialCostLight + initialCostRenewable + initialCostPackage

// calculate electricity and gas cost
var EPRICE_BEFORE = electricityCostCalculate(monthlyElectricityInput.before, userInput, energyContract)
var EPRICE_AFTER = electricityCostCalculate(monthlyElectricityInput.after, userInput, energyContract)
var electricityNPV = NPVcalculate(EPRICE_BEFORE - EPRICE_AFTER, LCCAssumptionInput.realInterest, LCCAssumptionInput.analysisPeriod) 

var GPRICE_BEFORE = gasCostCalculate(monthlyGasInput.before, userInput)
var GPRICE_AFTER = gasCostCalculate(monthlyGasInput.after, userInput)
var gasNPV = NPVcalculate(GPRICE_BEFORE - GPRICE_AFTER, LCCAssumptionInput.realInterest, LCCAssumptionInput.analysisPeriod)

export {totalInitialCost, techNPV, electricityNPV, gasNPV}