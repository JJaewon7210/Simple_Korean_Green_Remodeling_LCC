import {
    userInputSchema, energyContractSchema,
    montlyElectricityInputSchema, montlyGasInputSchema,
    LCCAssumptionInputSchema, remodelingTechInputSchema, detailedFundInformationInputSchema
} from "./inputSchema.js"



function errorCheckWithSchema(schema, inputData) {
    const { error, value } = schema.validate(inputData);
    if (error) {
        console.log('Validation Error:', error.message);
    } else {
        console.log('Validated Data:', value);
    }
    return error, value
}
