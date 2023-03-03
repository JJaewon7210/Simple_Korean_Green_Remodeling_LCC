import { totalInitialCost, techNPV, electricityNPV, gasNPV } from '../services/getNPV.js'
import { optimizeResults } from '../services/optimizeGeneticAlgorithm.js'

console.log('totalInitialCost',totalInitialCost)
console.log('optimizeResults:',optimizeResults)
console.log('technology NPV:',techNPV)
console.log('electricityNPV:',electricityNPV)
console.log('gasNPV:',gasNPV)

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

console.log('ICC',ICC)
console.log('NPV',NPV)
console.log('SIR',SIR)
console.log('TR',TR)
console.log('ECR',ECR)