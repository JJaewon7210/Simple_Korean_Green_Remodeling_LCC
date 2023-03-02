import {
    userInputSchema, energyContractSchema,
    montlyElectricityInputSchema, montlyGasInputSchema,
    LCCAssumptionInputSchema, remodelingTechInputSchema, detailedFundInformationInputSchema
} from "./inputSchema.js"

import {
    userInput, energyContract,
    monthlyElectricityInput, monthlyGasInput,
    LCCAssumptionInput, remodelingTechInput, detailedFundInformationInput
} from "./inputSchema.js"

function errorCheckWithSchema(schema, inputData) {
    const { error, value } = schema.validate(inputData);
    if (error) {
        console.log('Validation Error:', error.message);
    } else {
        console.log('Validated Data:', value);
    }
}

errorCheckWithSchema(userInputSchema, userInput)
errorCheckWithSchema(energyContractSchema, energyContract)
errorCheckWithSchema(montlyElectricityInputSchema, monthlyElectricityInput)
errorCheckWithSchema(montlyGasInputSchema, monthlyGasInput)
errorCheckWithSchema(LCCAssumptionInputSchema, LCCAssumptionInput)
errorCheckWithSchema(remodelingTechInputSchema, remodelingTechInput)
errorCheckWithSchema(detailedFundInformationInputSchema, detailedFundInformationInput)