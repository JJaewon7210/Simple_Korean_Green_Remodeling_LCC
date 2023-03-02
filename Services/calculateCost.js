import { technologyAmount, electricityCostCalculate, gasCostCalculate, NPVcalculate } from './calculateCostLogics.js'
import { userData, TechnologyData, ElectricityData, GasData } from '../controllers/client_input.js'

// calculate technology cost
const technologyClsList = ['외벽', '창호', '공조', '냉난방', '조명', '전기', '신재생']
var TECH_PAY = 0
for (var i = 0; i < 7; i++) {
	var cls = technologyClsList[i]
	var technologyPayments = technologyAmount(cls, TechnologyData[cls].name, TechnologyData[cls].size, userData.analysisPeriod)
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