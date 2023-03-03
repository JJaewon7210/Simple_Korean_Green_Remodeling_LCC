import {
	energyContract,
	monthlyElectricityInput, monthlyGasInput,
	LCCAssumptionInput, remodelingTechInput, detailedFundInformationInput
} from '../controllers/client_input.js'
import { updatedUserInput  } from '../utils/updateInput.js'
import {
	getAnnualCashFlowsOfHeatpump, getAnnualCashFlowsOfLight, getAnnualCashFlowsOfRenewable, getAnnualCashFlowsOfRoof,
	getAnnualCashFlowsOfWall, getAnnualCashFlowsOfWindow, getAnnualCashFlowsOfPackage
} from './cashflowTechnology.js'
import { electricityCostCalculate, gasCostCalculate } from './cashflowEnergy.js'
import { NPVcalculate } from './cashflowNPV.js'

var totalWallCashFlow = 0
var initialCostWall = 0
if (remodelingTechInput.wall.name.length > 0) {
	for (let i=0; i < remodelingTechInput.wall.name.length; i++) {
		let wallCashFlows = getAnnualCashFlowsOfWall(remodelingTechInput.wall.name[i], remodelingTechInput.wall.size[i], updatedUserInput , LCCAssumptionInput.analysisPeriod, remodelingTechInput.wall['material cost'][i])
		initialCostWall += wallCashFlows[0]
		totalWallCashFlow += NPVcalculate(wallCashFlows, LCCAssumptionInput.realInterest, LCCAssumptionInput.analysisPeriod)
	}
}

var totalRoofCashFlow = 0
var initialCostRoof = 0
if (remodelingTechInput.roof.name.length > 0) {
	for (let i = 0; i < remodelingTechInput.roof.name.length; i++) {
		let roofCashFlows = getAnnualCashFlowsOfRoof(remodelingTechInput.roof.name[i], remodelingTechInput.roof.size[i], updatedUserInput , LCCAssumptionInput.analysisPeriod, remodelingTechInput.roof['material cost'][i])
		initialCostRoof += roofCashFlows[0]
		totalRoofCashFlow += NPVcalculate(roofCashFlows, LCCAssumptionInput.realInterest, LCCAssumptionInput.analysisPeriod)
	}
}


var totalWindowCashFlow = 0
var initialCostWindow = 0
if (remodelingTechInput.window.name.length > 0) {
	for (let i = 0; i < remodelingTechInput.window.name.length; i++) {
		let windowCashFlows = getAnnualCashFlowsOfWindow(remodelingTechInput.window.name[i], remodelingTechInput.window.size[i], updatedUserInput , LCCAssumptionInput.analysisPeriod, remodelingTechInput.window['material cost'][i])
		initialCostWindow += windowCashFlows[0]
		totalWindowCashFlow += NPVcalculate(windowCashFlows, LCCAssumptionInput.realInterest, LCCAssumptionInput.analysisPeriod)
	}
}

var totalHeatpumpCashFlow = 0
var initialCostHeatpump = 0
if (remodelingTechInput.heatpump.name.length > 0) {
	for (let i = 0; i < remodelingTechInput.heatpump.name.length; i++) {
		let heatpumpCashFlows = getAnnualCashFlowsOfHeatpump(remodelingTechInput.heatpump.name[i], remodelingTechInput.heatpump.size[i], updatedUserInput , LCCAssumptionInput.analysisPeriod, remodelingTechInput.heatpump['material cost'][i])
		initialCostHeatpump += heatpumpCashFlows[0]
		totalHeatpumpCashFlow += NPVcalculate(heatpumpCashFlows, LCCAssumptionInput.realInterest, LCCAssumptionInput.analysisPeriod)
	}
}

var totalLightCashFlow = 0
var initialCostLight = 0
if (remodelingTechInput.light.name.length > 0) {
	for (let i = 0; i < remodelingTechInput.light.name.length; i++) {
		let lightCashFlows = getAnnualCashFlowsOfLight(remodelingTechInput.light.name[i], remodelingTechInput.light.size[i], updatedUserInput , LCCAssumptionInput.analysisPeriod, remodelingTechInput.light['material cost'][i])
		initialCostLight += lightCashFlows[0]
		totalLightCashFlow += NPVcalculate(lightCashFlows, LCCAssumptionInput.realInterest, LCCAssumptionInput.analysisPeriod)
	}
}

var totalRenewableCashFlow = 0
var initialCostRenewable = 0
if (remodelingTechInput.renewable.name.length > 0) {
	for (let i = 0; i < remodelingTechInput.renewable.name.length; i++) {
		let renewableCashFlows = getAnnualCashFlowsOfRenewable(remodelingTechInput.renewable.name[i], remodelingTechInput.renewable.size[i], updatedUserInput , LCCAssumptionInput.analysisPeriod, remodelingTechInput.renewable['material cost'][i])
		initialCostRenewable += renewableCashFlows[0]
		totalRenewableCashFlow += NPVcalculate(renewableCashFlows, LCCAssumptionInput.realInterest, LCCAssumptionInput.analysisPeriod)
	}
}

var totalPackageCashFlow = 0
var initialCostPackage = 0
if (remodelingTechInput.package.name.length > 0) {
	for (let i = 0; i < remodelingTechInput.package.name.length; i++) {
		let packageCashFlows = getAnnualCashFlowsOfPackage(remodelingTechInput.package.name[i], remodelingTechInput.package.size[i], updatedUserInput , LCCAssumptionInput.analysisPeriod)
		initialCostPackage += packageCashFlows[0]
		totalPackageCashFlow += NPVcalculate(packageCashFlows, LCCAssumptionInput.realInterest, LCCAssumptionInput.analysisPeriod)
	}
}

var techNPV = totalWallCashFlow + totalRoofCashFlow + totalWindowCashFlow + totalHeatpumpCashFlow + totalLightCashFlow + totalRenewableCashFlow + totalPackageCashFlow
var totalInitialCost = initialCostWall + initialCostRoof + initialCostWindow + initialCostHeatpump + initialCostLight + initialCostRenewable + initialCostPackage

// calculate electricity and gas cost
var EPRICE_BEFORE = electricityCostCalculate(monthlyElectricityInput.before, updatedUserInput , energyContract)
var EPRICE_AFTER = electricityCostCalculate(monthlyElectricityInput.after, updatedUserInput , energyContract)
var electricityNPV = NPVcalculate(EPRICE_BEFORE - EPRICE_AFTER, LCCAssumptionInput.realInterest, LCCAssumptionInput.analysisPeriod) 

var GPRICE_BEFORE = gasCostCalculate(monthlyGasInput.before, updatedUserInput )
var GPRICE_AFTER = gasCostCalculate(monthlyGasInput.after, updatedUserInput )
var gasNPV = NPVcalculate(GPRICE_BEFORE - GPRICE_AFTER, LCCAssumptionInput.realInterest, LCCAssumptionInput.analysisPeriod)

// round the output 1000 KRW
totalWallCashFlow = Math.round(totalWallCashFlow / 1000) * 1000
totalRoofCashFlow = Math.round(totalRoofCashFlow / 1000) * 1000
totalWindowCashFlow = Math.round(totalWindowCashFlow / 1000) * 1000
totalHeatpumpCashFlow = Math.round(totalHeatpumpCashFlow / 1000) * 1000
totalLightCashFlow = Math.round(totalLightCashFlow / 1000) * 1000
totalRenewableCashFlow = Math.round(totalRenewableCashFlow / 1000) * 1000
totalPackageCashFlow = Math.round(totalPackageCashFlow / 1000) * 1000

initialCostWall = Math.round(initialCostWall / 1000) * 1000
initialCostRoof = Math.round(initialCostRoof / 1000) * 1000
initialCostWindow = Math.round(initialCostWindow / 1000) * 1000
initialCostHeatpump = Math.round(initialCostHeatpump / 1000) * 1000
initialCostLight = Math.round(initialCostLight / 1000) * 1000
initialCostRenewable = Math.round(initialCostRenewable / 1000) * 1000
initialCostPackage = Math.round(initialCostPackage / 1000) * 1000

totalInitialCost = Math.round(totalInitialCost / 1000) * 1000
techNPV = Math.round(techNPV / 1000) * 1000
electricityNPV = Math.round(electricityNPV / 1000) * 1000
gasNPV = Math.round(gasNPV / 1000) * 1000

export {
	totalWallCashFlow, totalRoofCashFlow, totalWindowCashFlow, totalHeatpumpCashFlow, totalLightCashFlow, totalRenewableCashFlow, totalPackageCashFlow,
	initialCostWall, initialCostRoof, initialCostWindow, initialCostHeatpump, initialCostLight, initialCostRenewable, initialCostPackage,
	totalInitialCost, techNPV, electricityNPV, gasNPV}