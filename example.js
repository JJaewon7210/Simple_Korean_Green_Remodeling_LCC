import {userInput, energyContract, monthlyElectricityInput, monthlyGasInput, LCCAssumptionInput, remodelingTechInput, detailedFundInformationInput} from './controllers/client_input.js'
import { getOutput } from './controllers/API.js'

let output = getOutput(userInput, energyContract, monthlyElectricityInput, monthlyGasInput, LCCAssumptionInput, remodelingTechInput, detailedFundInformationInput)
console.log(output)