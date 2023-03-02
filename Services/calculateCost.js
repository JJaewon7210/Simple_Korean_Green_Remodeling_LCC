import { getAnnualCashFlows, electricityCostCalculate, gasCostCalculate, NPVcalculate } from './calculateCostLogics.js'
import {
	userInput, energyContract,
	monthlyElectricityInput, monthlyGasInput,
	LCCAssumptionInput, remodelingTechInput, detailedFundInformationInput
} from '../controllers/client_input.js'

// calculate technology cost
const remodelingTechClasses = ['wall', 'roof', 'window', 'heatpump', 'light', 'renewable', 'package']

wallPayments = getAnnualCashFlows('wall', remodelingTechInput.wall.name[0], remodelingTechInput.wall.size[0], LCCAssumptionInput.analysisPeriod)

roofPayments = getAnnualCashFlows('roof', remodelingTechInput.roof.name[0], remodelingTechInput.roof.size[0], LCCAssumptionInput.analysisPeriod)

windowPayments = getAnnualCashFlows('window', remodelingTechInput.window.name[0], remodelingTechInput.window.size[0], LCCAssumptionInput.analysisPeriod)

heatpumpPayments = getAnnualCashFlows('heatpump', remodelingTechInput.heatpump.name[0], remodelingTechInput.heatpump.size[0], LCCAssumptionInput.analysisPeriod)

lightPayments = getAnnualCashFlows('light', remodelingTechInput.light.name[0], remodelingTechInput.light.size[0], LCCAssumptionInput.analysisPeriod)

renewablePayments = getAnnualCashFlows('renewable', remodelingTechInput.renewable.name[0], remodelingTechInput.renewable.size[0], LCCAssumptionInput.analysisPeriod)

packagePayments = getAnnualCashFlows('package', remodelingTechInput.package.name[0], remodelingTechInput.package.size[0], LCCAssumptionInput.analysisPeriod)

var TECH_PAY = 0
for (var i = 0; i < length(remodelingTechClasses); i++) {
	var cls = remodelingTechClasses[i]
	var technologyPayments = getAnnualCashFlows(cls, TechnologyData[cls].name, TechnologyData[cls].size, userData.analysisPeriod)
	TECH_PAY += NPVcalculate(technologyPayments, userData.realInterest)
}

// calculate electricity and gas cost
var EPRICE_BEFORE = electricityCostCalculate(userData.buildingType, ElectricityData.before, ElectricityData.distint, ElectricityData.pressure, ElectricityData.select)
var EPRICE_AFTER  = electricityCostCalculate(userData.buildingType, ElectricityData.after,  ElectricityData.distint, ElectricityData.pressure, ElectricityData.select)
var E_NPV = NPVcalculate(EPRICE_BEFORE - EPRICE_AFTER, userData.realInterest, userData.analysisPeriod)

var GPRICE_BEFORE = gasCostCalculate(userData.buildingType, GasData.before, userData.city)
var GPRICE_AFTER  = gasCostCalculate(userData.buildingType, GasData.after,  userData.city)
var G_NPV = NPVcalculate(GPRICE_BEFORE - GPRICE_AFTER, userData.realInterest, userData.analysisPeriod)

export {TECH_PAY, E_NPV, G_NPV}