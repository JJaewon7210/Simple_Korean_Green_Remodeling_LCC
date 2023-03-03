import {
    totalWallCashFlow, totalRoofCashFlow, totalWindowCashFlow, totalHeatpumpCashFlow, totalLightCashFlow, totalRenewableCashFlow, totalPackageCashFlow,
    initialCostWall, initialCostRoof, initialCostWindow, initialCostHeatpump, initialCostLight, initialCostRenewable, initialCostPackage,
    totalInitialCost, techNPV, electricityNPV, gasNPV
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
console.log('initialCostWall      : ', initialCostWall     )
console.log('initialCostRoof      : ', initialCostRoof     )
console.log('initialCostWindow    : ', initialCostWindow   )
console.log('initialCostHeatpump  : ', initialCostHeatpump )
console.log('initialCostLight     : ', initialCostLight    )
console.log('initialCostRenewable : ', initialCostRenewable)
console.log('initialCostPackage   : ', initialCostPackage  )

// 요소별 기술 NPV
console.log('\n')
console.log('totalWallCashFlow     : ',totalWallCashFlow     )
console.log('totalRoofCashFlow     : ',totalRoofCashFlow     )
console.log('totalWindowCashFlow   : ',totalWindowCashFlow   )
console.log('totalHeatpumpCashFlow : ',totalHeatpumpCashFlow )
console.log('totalLightCashFlow    : ',totalLightCashFlow    )
console.log('totalRenewableCashFlow: ',totalRenewableCashFlow)
console.log('totalPackageCashFlow  : ',totalPackageCashFlow  )

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