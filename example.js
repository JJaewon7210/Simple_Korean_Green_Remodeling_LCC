// import {userInput, energyContract, monthlyElectricityInput, monthlyGasInput, LCCAssumptionInput, remodelingTechInput, detailedFundInformationInput, customizedRatio} from './controllers/client_input.js'
import { getOutput, getCustomOutput } from './controllers/API.js'

// let output = getOutput(userInput, energyContract, monthlyElectricityInput, monthlyGasInput, LCCAssumptionInput, remodelingTechInput, detailedFundInformationInput)
// console.log(output)



const userInput = { "buildingType": "비주거", "city": "서울", "approvalYear": "1980", "card": "신한은행" }
const energyContract = { "distinct": "주택용", "pressure": "저압", "select": "" }
const monthlyElectricityInput = { 
    "before": [1342491.37, 2592031.42, 4374800.84, 4878682.48, 18653556.12, 8132083.84, 8122883.53, 8853728.44, 7877182.19, 10024720.03, 2178006.65, 2576629.01], 
    "after": [1474292.89, 2751146.03, 4539161.18, 5008195.66, 18990461.66, 8301061.89, 8342586.22, 9040043.01, 8042343.56, 10418558.25, 2271153.43, 2766382.10] }
const monthlyGasInput = { 
    "before": [13541812.07, 7241688.64, 4488764.35, 13665186.41, 2801910.81, 27027.78, 0.00, 0.00, 64322.33, 7610423.64, 23320935.77, 9757131.60], 
    "after": [13295387.51, 7093413.72, 4414090.64, 13289293.15, 2740095.21, 30753.48, 0.00, 0.00, 67367.12, 7464320.92, 22679755.76, 9599105.77] }
const LCCAssumptionInput = { "analysisPeriod": "20", "realInterest": "0.0089", "electricityRealInterest": "-0.0083", "gasRealInterest": "-0.0434" }
const remodelingTechInput = { 
    "wall": { "name": ["외단열 덧댐시공", "외단열 덧댐시공", "외단열 덧댐시공", "외단열 덧댐시공"], "size": ["270", "270", "270", "270"], "material cost": ["150", "150", "150", "150"] }, 
    "roof": { "name": ["외단열 덧댐시공"], "size": ["100"], "material cost": ["135"] }, 
    "floor": { "name": ["내단열 덧댐시공"], "size": ["100"], "material cost": ["120"] }, 
    "window": { "name": ["창호 교체", "창호 교체", "창호 교체", "창호 교체"], "size": ["18000", "18000", "18000", "18000"], "material cost": ["159500", "174500", "159500", "141500"] }, 
    "light": { "name": ["LED 전면 교체"], "size": [120] }, 
    "interiorBlind": { "name": ["롤 블라인드", "롤 블라인드", "롤 블라인드", "롤 블라인드"], "size": ["18000", "18000", "18000", "18000"], 
    "material cost": ["11400", "14000", "14000", "14000"] }, 
    "exteriorBlind": { "name": ["외부 베네시안 블라인드", "외부 베네시안 블라인드", "외부 베네시안 블라인드", "외부 베네시안 블라인드"], "size": [20, 20, 20, 20] }, 
    "renewable": { "name": ["태양광 시스템"], "size": ["1602.10"] }, 
    "door": { "name": ["철재문 (편개)"], "size": [1], "material cost": ["254503"] }, 
    "freezer": { "size": [90] }, 
    "boiler": { "name": ["NPW-36KD"], "size": [36000], "material cost": [""] }, 
    "AHU": { "size": [1], "material cost": [4860900] }, 
    "heatpump": { "size": [1], "material cost": [4860900] } }
const detailedFundInformationInput = { 
    "mortageLoanMaxLimit": "15000000", 
    "mortageLoanInterest": "0.027", 
    "mortageLoanRepaymentMonth": "240", 
    "mortageLoanHoldMonth": "36", 
    "creditLoanMaxLimit": "10000000", 
    "creditLoanInterest": "0.043", 
    "creditLoanRepaymentMonth": "60", 
    "creditLoanHoldMonth": "60", 
    "applyGreen": true, 
    "applySeoul": true, 
    "applyRural": true, 
    "applyMortage": true, 
    "applyCredit": true, 
    "initialUserCapital": "30000000" }
const customizedRatio = { "ratioGreen": "10", "ratioSeoul": "20", "ratioRural": "16", "ratioMortage": "24", "ratioCredit": "22" }



let output = getOutput(userInput, energyContract, monthlyElectricityInput, monthlyGasInput, LCCAssumptionInput, remodelingTechInput, detailedFundInformationInput)
console.log(output)
// let outputCustomize = getCustomOutput(customizedRatio, userInput, energyContract, monthlyElectricityInput, monthlyGasInput, LCCAssumptionInput, remodelingTechInput, detailedFundInformationInput)
// console.log(outputCustomize)