import {TECH_PAY, E_NPV, G_NPV} from './calculate.js'
import { userData } from './controllers/client_input.js'
import { optimizeResults } from './optimize.js'

console.log('totalRemodelingCost',userData.totalRemodelingCost)
console.log('optimizeResults:',optimizeResults)
console.log('TECH_PAY:',TECH_PAY)
console.log('E_NPV:',E_NPV)
console.log('G_NPV:',G_NPV)


// 대출 금액
const B1 = optimizeResults.greenRemodelingInterestSupportProjectResult
const B2 = optimizeResults.seoulHomeRepairLoanProjectResult
const B3 = optimizeResults.ruralHousingImrpoveProjectResult
const B4 = optimizeResults.mortageLoanProjectResult
const B5 = optimizeResults.creditLoanProjectResult


// 분석 결과
const ICC = userData.totalRemodelingCost
const NPV = (TECH_PAY - optimizeResults.NPV) + (E_NPV+G_NPV)
const SIR =  (E_NPV+G_NPV) / (TECH_PAY - optimizeResults.NPV) 
const TR  = - optimizeResults.NPV
const ECR = (E_NPV+G_NPV)


console.log('ICC',ICC)
console.log('NPV',NPV)
console.log('SIR',SIR)
console.log('TR',TR)
console.log('ECR',ECR)