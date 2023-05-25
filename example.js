import {userInput, energyContract, monthlyElectricityInput, monthlyGasInput, LCCAssumptionInput, remodelingTechInput, detailedFundInformationInput, customizedRatio} from './controllers/client_input.js'
import { getOutput, getCustomOutput } from './controllers/API.js'

// let output = getOutput(userInput, energyContract, monthlyElectricityInput, monthlyGasInput, LCCAssumptionInput, remodelingTechInput, detailedFundInformationInput)
// console.log(output)

let outputCustomize = getCustomOutput(customizedRatio, userInput, energyContract, monthlyElectricityInput, monthlyGasInput, LCCAssumptionInput, remodelingTechInput, detailedFundInformationInput)
console.log(outputCustomize)