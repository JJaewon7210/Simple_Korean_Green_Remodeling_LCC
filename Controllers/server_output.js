import {
    totalWallCashFlow, totalRoofCashFlow, totalFloorCashFlow, totalWindowCashFlow, totalLightCashFlow,
    totalInteriorBlindCashFlow, totalExteriorBlindCashFlow, totalRenewableCashFlow, totalDoorCashFlow, totalFreezerCashFlow,
    totalBoilerCashFlow, totalAHUCashFlow, totalHeatpumpCashFlow,

    initialCostWall, initialCostRoof, initialCostFloor, initialCostWindow, initialCostLight,
    initialCostInteriorBlind, initialCostExteriorBlind, initialCostRenewable, initialCostDoor, initialCostFreezer,
    initialCostBoiler, initialCostAHU, initialCostHeatpump,

    totalInitialCost, techNPV,
    electricityNPV, gasNPV
} from '../services/getNPV.js'
import { optimizeResults } from '../services/optimizeGeneticAlgorithm.js'

console.log('\n')
console.log('optimizeResults:',optimizeResults)
console.log('\n')
console.log('totalInitialCost:',totalInitialCost)
console.log('technology NPV  :',techNPV)
console.log('electricityNPV  :',electricityNPV)
console.log('gasNPV          :',gasNPV)

// 요소별 기술 초기투자금액
console.log('\n')
console.log('initialCostWall         : ', initialCostWall         )
console.log('initialCostRoof         : ', initialCostRoof         )
console.log('initialCostFloor        : ', initialCostFloor        )
console.log('initialCostWindow       : ', initialCostWindow       )
console.log('initialCostLight        : ', initialCostLight        )
console.log('initialCostInteriorBlind: ', initialCostInteriorBlind)
console.log('initialCostExteriorBlind: ', initialCostExteriorBlind)
console.log('initialCostRenewable    : ', initialCostRenewable    )
console.log('initialCostDoor         : ', initialCostDoor         )
console.log('initialCostFreezer      : ', initialCostFreezer      )
console.log('initialCostBoiler       : ', initialCostBoiler       )
console.log('initialCostAHU          : ', initialCostAHU          )
console.log('initialCostHeatpump     : ', initialCostHeatpump     )

// 요소별 기술 NPV
console.log('\n')
console.log('totalWallCashFlow         : ', totalWallCashFlow)
console.log('totalRoofCashFlow         : ', totalRoofCashFlow)
console.log('totalFloorCashFlow        : ', totalFloorCashFlow)
console.log('totalWindowCashFlow       : ', totalWindowCashFlow)
console.log('totalLightCashFlow        : ', totalLightCashFlow)
console.log('totalInteriorBlindCashFlow: ', totalInteriorBlindCashFlow)
console.log('totalExteriorBlindCashFlow: ', totalExteriorBlindCashFlow)
console.log('totalRenewableCashFlow    : ', totalRenewableCashFlow)
console.log('totalDoorCashFlow         : ', totalDoorCashFlow)
console.log('totalFreezerCashFlow      : ', totalFreezerCashFlow)
console.log('totalBoilerCashFlow       : ', totalBoilerCashFlow)
console.log('totalAHUCashFlow          : ', totalAHUCashFlow)
console.log('totalHeatpumpCashFlow     : ', totalHeatpumpCashFlow)

// 대출 금액
const B1 = optimizeResults.greenRemodelingInterestSupportProjectResult
const B2 = optimizeResults.seoulHomeRepairLoanProjectResult
const B3 = optimizeResults.ruralHousingImrpoveProjectResult
const B4 = optimizeResults.mortageLoanProjectResult
const B5 = optimizeResults.creditLoanProjectResult

// 분석 결과
const ICC = totalInitialCost
const NPV = (techNPV - optimizeResults.NPV) + (electricityNPV+gasNPV)
const SIR = (electricityNPV+gasNPV) / (techNPV - optimizeResults.NPV) 
const TR  = - optimizeResults.NPV
const ECR = (electricityNPV+gasNPV)

console.log('\n')
console.log('ICC : ',ICC)
console.log('NPV : ',NPV)
console.log('SIR : ',SIR)
console.log('TR  : ',TR)
console.log('ECR : ',ECR)