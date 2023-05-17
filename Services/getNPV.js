import {
	energyContract,
	monthlyElectricityInput, monthlyGasInput,
	LCCAssumptionInput, remodelingTechInput, detailedFundInformationInput
} from '../controllers/client_input.js'
import { updatedUserInput  } from '../utils/updateInput.js'
import {
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
} from './cashflowTechnology.js'
import { electricityCostCalculate, gasCostCalculate } from './cashflowEnergy.js'
import { NPVcalculate } from './cashflowNPV.js'
// 1. 벽체
var totalWallCashFlow = 0
var initialCostWall = 0
if (remodelingTechInput.wall.size.length > 0) {
	for (let i=0; i < remodelingTechInput.wall.size.length; i++) {
		let wallCashFlows = getAnnualCashFlowsOfWall(remodelingTechInput.wall.name[i], remodelingTechInput.wall.size[i], updatedUserInput , LCCAssumptionInput.analysisPeriod, remodelingTechInput.wall['material cost'][i])
		initialCostWall += wallCashFlows[0]
		totalWallCashFlow += NPVcalculate(wallCashFlows, LCCAssumptionInput.realInterest, LCCAssumptionInput.analysisPeriod)
	}
}
// 2. 지붕
var totalRoofCashFlow = 0
var initialCostRoof = 0
if (remodelingTechInput.roof.size.length > 0) {
	for (let i = 0; i < remodelingTechInput.roof.size.length; i++) {
		let roofCashFlows = getAnnualCashFlowsOfRoof(remodelingTechInput.roof.name[i], remodelingTechInput.roof.size[i], updatedUserInput , LCCAssumptionInput.analysisPeriod, remodelingTechInput.roof['material cost'][i])
		initialCostRoof += roofCashFlows[0]
		totalRoofCashFlow += NPVcalculate(roofCashFlows, LCCAssumptionInput.realInterest, LCCAssumptionInput.analysisPeriod)
	}
}
// 3. 바닥
var totalFloorCashFlow = 0
var initialCostFloor = 0
if (remodelingTechInput.floor.size.length > 0) {
	for (let i = 0; i < remodelingTechInput.floor.size.length; i++) {
		let floorCashFlows = getAnnualCashFlowsOfFloor(remodelingTechInput.floor.name[i], remodelingTechInput.floor.size[i], updatedUserInput , LCCAssumptionInput.analysisPeriod, remodelingTechInput.floor['material cost'][i])
		initialCostFloor += floorCashFlows[0]
		totalFloorCashFlow += NPVcalculate(floorCashFlows, LCCAssumptionInput.realInterest, LCCAssumptionInput.analysisPeriod)
	}
}
// 4. 창문
var totalWindowCashFlow = 0
var initialCostWindow = 0
if (remodelingTechInput.window.size.length > 0) {
	for (let i = 0; i < remodelingTechInput.window.size.length; i++) {
		let windowCashFlows = getAnnualCashFlowsOfWindow(remodelingTechInput.window.name[i], remodelingTechInput.window.size[i], updatedUserInput , LCCAssumptionInput.analysisPeriod, remodelingTechInput.window['material cost'][i])
		initialCostWindow += windowCashFlows[0]
		totalWindowCashFlow += NPVcalculate(windowCashFlows, LCCAssumptionInput.realInterest, LCCAssumptionInput.analysisPeriod)
	}
}
// 5. 조명
var totalLightCashFlow = 0
var initialCostLight = 0
if (remodelingTechInput.light.size.length > 0) {
	for (let i = 0; i < remodelingTechInput.light.size.length; i++) {
		let lightCashFlows = getAnnualCashFlowsOfLight(remodelingTechInput.light.size[i], LCCAssumptionInput.analysisPeriod)
		initialCostLight += lightCashFlows[0]
		totalLightCashFlow += NPVcalculate(lightCashFlows, LCCAssumptionInput.realInterest, LCCAssumptionInput.analysisPeriod)
	}
}
// 6. 내부차장
var totalInteriorBlindCashFlow = 0
var initialCostInteriorBlind = 0
if (remodelingTechInput.interiorBlind.size.length > 0) {
	for (let i = 0; i < remodelingTechInput.interiorBlind.size.length; i++) {
		let interiorBlindCashFlows = getAnnualCashFlowsOfInteriorBlind(remodelingTechInput.interiorBlind.name[i], remodelingTechInput.interiorBlind.size[i], LCCAssumptionInput.analysisPeriod, remodelingTechInput.interiorBlind['material cost'][i])
		initialCostInteriorBlind += interiorBlindCashFlows[0]
		totalInteriorBlindCashFlow += NPVcalculate(interiorBlindCashFlows, LCCAssumptionInput.realInterest, LCCAssumptionInput.analysisPeriod)
	}
}
//7. 외부차양
var totalExteriorBlindCashFlow = 0
var initialCostExteriorBlind = 0
if (remodelingTechInput.exteriorBlind.size.length > 0) {
	for (let i = 0; i < remodelingTechInput.exteriorBlind.size.length; i++) {
		let exteriorBlindCashFlows = getAnnualCashFlowsOfExteriorBlind(remodelingTechInput.exteriorBlind.name[i], remodelingTechInput.exteriorBlind.size[i], LCCAssumptionInput.analysisPeriod)
		initialCostExteriorBlind += exteriorBlindCashFlows[0]
		totalExteriorBlindCashFlow += NPVcalculate(exteriorBlindCashFlows, LCCAssumptionInput.realInterest, LCCAssumptionInput.analysisPeriod)
	}
}
// 8. 태양광
var totalRenewableCashFlow = 0
var initialCostRenewable = 0
if (remodelingTechInput.renewable.size.length > 0) {
	for (let i = 0; i < remodelingTechInput.renewable.size.length; i++) {
		let renewableCashFlows = getAnnualCashFlowsOfRenewable(remodelingTechInput.renewable.name[i], remodelingTechInput.renewable.size[i],  LCCAssumptionInput.analysisPeriod)
		initialCostRenewable += renewableCashFlows[0]
		totalRenewableCashFlow += NPVcalculate(renewableCashFlows, LCCAssumptionInput.realInterest, LCCAssumptionInput.analysisPeriod)
	}
}
// 9. 출입문
var totalDoorCashFlow = 0
var initialCostDoor = 0
if (remodelingTechInput.door.size.length > 0) {
	for (let i = 0; i < remodelingTechInput.door.size.length; i++) {
		let doorCashFlows = getAnnualCashFlowsOfDoor(remodelingTechInput.door.name[i], remodelingTechInput.door.size[i], LCCAssumptionInput.analysisPeriod, remodelingTechInput.door['material cost'][i])
		initialCostDoor += doorCashFlows[0]
		totalDoorCashFlow += NPVcalculate(doorCashFlows, LCCAssumptionInput.realInterest, LCCAssumptionInput.analysisPeriod)
	}
}
// 10. 냉동기
var totalFreezerCashFlow = 0
var initialCostFreezer = 0
if (remodelingTechInput.freezer.size.length > 0) {
	for (let i = 0; i < remodelingTechInput.freezer.size.length; i++) {
		let freezerCashFlows = getAnnualCashFlowsOfFreezer(remodelingTechInput.freezer.size[i], LCCAssumptionInput.analysisPeriod)
		initialCostFreezer += freezerCashFlows[0]
		totalFreezerCashFlow += NPVcalculate(freezerCashFlows, LCCAssumptionInput.realInterest, LCCAssumptionInput.analysisPeriod)
	}
}
// 11. 보일러
var totalBoilerCashFlow = 0
var initialCostBoiler = 0
if (remodelingTechInput.boiler.size.length > 0) {
	for (let i = 0; i < remodelingTechInput.boiler.size.length; i++) {
		let boilerCashFlows = getAnnualCashFlowsOfBoiler(remodelingTechInput.boiler.name[i], remodelingTechInput.boiler.size[i], LCCAssumptionInput.analysisPeriod, remodelingTechInput.boiler['material cost'][i])
		initialCostBoiler += boilerCashFlows[0]
		totalBoilerCashFlow += NPVcalculate(boilerCashFlows, LCCAssumptionInput.realInterest, LCCAssumptionInput.analysisPeriod)
	}
}
// 12. 공조기
var totalAHUCashFlow = 0
var initialCostAHU = 0
if (remodelingTechInput.AHU.size.length > 0) {
	for (let i = 0; i < remodelingTechInput.AHU.size.length; i++) {
		let AHUCashFlows = getAnnualCashFlowsOfAHU(remodelingTechInput.AHU.size[i], LCCAssumptionInput.analysisPeriod, remodelingTechInput.AHU['material cost'][i])
		initialCostAHU += AHUCashFlows[0]
		totalAHUCashFlow += NPVcalculate(AHUCashFlows, LCCAssumptionInput.realInterest, LCCAssumptionInput.analysisPeriod)
	}
}
// 13. 히트펌프
var totalHeatpumpCashFlow = 0
var initialCostHeatpump = 0
if (remodelingTechInput.heatpump.size.length > 0) {
	for (let i = 0; i < remodelingTechInput.heatpump.size.length; i++) {
		let heatpumpCashFlows = getAnnualCashFlowsOfHeatpump(remodelingTechInput.heatpump.size[i], LCCAssumptionInput.analysisPeriod, remodelingTechInput.heatpump['material cost'][i])
		initialCostHeatpump += heatpumpCashFlows[0]
		totalHeatpumpCashFlow += NPVcalculate(heatpumpCashFlows, LCCAssumptionInput.realInterest, LCCAssumptionInput.analysisPeriod)
	}
}



var techNPV = totalWallCashFlow + totalRoofCashFlow + totalFloorCashFlow + totalWindowCashFlow + totalLightCashFlow +
	totalInteriorBlindCashFlow + totalExteriorBlindCashFlow + totalRenewableCashFlow + totalDoorCashFlow + totalFreezerCashFlow +
	totalBoilerCashFlow + totalAHUCashFlow + totalHeatpumpCashFlow

var totalInitialCost = initialCostWall + initialCostRoof + initialCostFloor + initialCostWindow + initialCostLight +
	initialCostInteriorBlind + initialCostExteriorBlind + initialCostRenewable + initialCostDoor + initialCostFreezer +
	initialCostBoiler + initialCostAHU + initialCostHeatpump

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
totalFloorCashFlow = Math.round(totalFloorCashFlow / 1000) * 1000
totalWindowCashFlow = Math.round(totalWindowCashFlow / 1000) * 1000
totalLightCashFlow = Math.round(totalLightCashFlow / 1000) * 1000
totalInteriorBlindCashFlow = Math.round(totalInteriorBlindCashFlow / 1000) * 1000
totalExteriorBlindCashFlow = Math.round(totalExteriorBlindCashFlow / 1000) * 1000
totalRenewableCashFlow = Math.round(totalRenewableCashFlow / 1000) * 1000
totalDoorCashFlow = Math.round(totalDoorCashFlow / 1000) * 1000
totalFreezerCashFlow = Math.round(totalFreezerCashFlow / 1000) * 1000
totalBoilerCashFlow = Math.round(totalBoilerCashFlow / 1000) * 1000
totalAHUCashFlow = Math.round(totalAHUCashFlow / 1000) * 1000
totalHeatpumpCashFlow = Math.round(totalHeatpumpCashFlow / 1000) * 1000

initialCostWall = Math.round(initialCostWall / 1000) * 1000
initialCostRoof = Math.round(initialCostRoof / 1000) * 1000
initialCostFloor = Math.round(initialCostFloor / 1000) * 1000
initialCostWindow = Math.round(initialCostWindow / 1000) * 1000
initialCostLight = Math.round(initialCostLight / 1000) * 1000
initialCostInteriorBlind = Math.round(initialCostInteriorBlind / 1000) * 1000
initialCostExteriorBlind = Math.round(initialCostExteriorBlind / 1000) * 1000
initialCostRenewable = Math.round(initialCostRenewable / 1000) * 1000
initialCostDoor = Math.round(initialCostDoor / 1000) * 1000
initialCostFreezer = Math.round(initialCostFreezer / 1000) * 1000
initialCostBoiler = Math.round(initialCostBoiler / 1000) * 1000
initialCostAHU = Math.round(initialCostAHU / 1000) * 1000
initialCostHeatpump = Math.round(initialCostHeatpump / 1000) * 1000

totalInitialCost = Math.round(totalInitialCost / 1000) * 1000
techNPV = Math.round(techNPV / 1000) * 1000

electricityNPV = Math.round(electricityNPV / 1000) * 1000
gasNPV = Math.round(gasNPV / 1000) * 1000

export {
	totalWallCashFlow, totalRoofCashFlow, totalFloorCashFlow, totalWindowCashFlow, totalLightCashFlow,
	totalInteriorBlindCashFlow, totalExteriorBlindCashFlow, totalRenewableCashFlow, totalDoorCashFlow, totalFreezerCashFlow,
	totalBoilerCashFlow, totalAHUCashFlow, totalHeatpumpCashFlow,
	
	initialCostWall, initialCostRoof, initialCostFloor, initialCostWindow, initialCostLight,
	initialCostInteriorBlind, initialCostExteriorBlind, initialCostRenewable, initialCostDoor, initialCostFreezer,
	initialCostBoiler, initialCostAHU, initialCostHeatpump,

	totalInitialCost, techNPV, 
	electricityNPV, gasNPV}