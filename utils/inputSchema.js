import Joi from 'joi';

// Define the expected schema for the input object
const userInputSchema = Joi.object({
    buildingType: Joi.string().valid('비주거', '주거-단독', '주거-다중', '주거-다가구', '주거-다세대', '주거-연립').required(),
    city: Joi.string().valid('서울', '경기도', '인천', '부산', '대구', '광주', '대전', '울산', '세종', '강원', '충북', '충남', '전북', '전남', '경북', '경남').required(),
    approvalyear: Joi.number().interger().required(),
    card: Joi.string()
        .when('buildingType', { is: '비주거',      then: Joi.string().valid('신한은행','제주은행','기업은행','국민은행','농협카드').required() })
        .when('buildingType', { is: '주거-단독',   then: Joi.string().valid('신한은행', '우리은행', '농협은행', '국민은행', '신한카드').required() })
        .when('buildingType', { is: '주거-다중',   then: Joi.string().valid('신한은행', '우리은행', '농협은행', '국민은행', '신한카드', '삼성카드', '롯데카드').required() })
        .when('buildingType', { is: '주거-다가구', then: Joi.string().valid('신한은행', '우리은행', '농협은행', '국민은행', '신한카드', '삼성카드', '롯데카드').required() })
        .when('buildingType', { is: '주거-다세대', then: Joi.string().valid('신한은행', '우리은행', '농협은행', '국민은행', '신한카드', '삼성카드', '롯데카드').required() })
        .when('buildingType', { is: '주거-연립',   then: Joi.string().valid('신한은행', '우리은행', '농협은행', '국민은행', '신한카드', '삼성카드', '롯데카드').required() })
});

const energyContractSchema = Joi.object({
    distinct: Joi.string().valid('일반용갑1', '일반용갑2', '산업용갑1', '산업용갑2', '교육용갑', '교육용을', '일반용을').required(),
    pressure: Joi.string()
        .when('distinct', { is: '주택용',    then: Joi.string().valid('저압', '고압').required() })
        .when('distinct', { is: '일반용갑1', then: Joi.string().valid('저압', '고압A', '고압B').required() })
        .when('distinct', { is: '일반용갑2', then: Joi.string().valid('고압A', '고압B').required() })
        .when('distinct', { is: '산업용갑1', then: Joi.string().valid('저압', '고압A', '고압B').required() })
        .when('distinct', { is: '산업용갑2', then: Joi.string().valid('고압A', '고압B').required() })
        .when('distinct', { is: '교육용갑',  then: Joi.string().valid('저압', '고압A', '고압B').required() })
        .when('distinct', { is: '산업용을',  then: Joi.string().valid('고압A', '고압B').required() })
        .when('distinct', { is: '일반용을',  then: Joi.string().valid('고압A', '고압B', '고압C').required() }),
    selection: Joi.string()
        .when('distinct', { is: '주택용', then: Joi.optional() })
        .when('pressure', { is: '고압A',  then: Joi.string().valid('선택1', '선택2').required() })
        .when('pressure', { is: '고압B',  then: Joi.string().valid('선택1', '선택2').required() })
        .when('pressure', { is: '고압C',  then: Joi.string().valid('선택1', '선택2', '선택3').required() })
})

const montlyElectricityInputSchema = Joi.object({
    before: Joi.array().items(Joi.number()).length(12),
    after: Joi.array().items(Joi.number()).length(12),
})

const montlyGasInputSchema = Joi.object({
    before: Joi.array().items(Joi.number()).length(12),
    after: Joi.array().items(Joi.number()).length(12),
})

const LCCAssumptionInputSchema = Joi.object({
    analysisPeriod: Joi.number().interger().min(1).max(50).required(),
    realinterest: Joi.number.positive().max(1).required(),
})

const remodelingTechInputSchema = Joi.object({
    wall: Joi.object({
        name: Joi.string().valid('외벽','내벽').required(),
        size: Joi.number().min(0).max(10000).required()
    }),
    window: Joi.object({
        name: Joi.string().valid('외벽','내벽').required(),
        size: Joi.number().min(0).max(10000).required()
    }),
    heatpump: Joi.object({
        name: Joi.string().valid('외벽','내벽').required(),
        size: Joi.number().min(0).max(10000).required()
    }),
    light: Joi.object({
        name: Joi.string().valid('외벽','내벽').required(),
        size: Joi.number().min(0).max(10000).required()
    }),
    renewable: Joi.object({
        name: Joi.string().valid('외벽','내벽').required(),
        size: Joi.number().min(0).max(10000).required()
    }),
    package: Joi.object({
        name: Joi.string().valid('외벽','내벽').required(),
        size: Joi.number().min(0).max(10000).required()
    })
})

const detailedFundInformationInputSchema = Joi.object({
    mortageLoanMaxLimit: Joi.number().interger().required(),
    mortageLoanInterest: Joi.number.positive().max(1).required(),
    mortageLoanRepaymentMonth: Joi.number().interger().required(),
    mortageLoanHoldMonth: Joi.number().integer().required(),

    creditLoanMaxLimit: Joi.number().interger().required(),
    creditLoanInterest: Joi.number.positive().max(1).required(),
    creditLoanRepaymentMonth: Joi.number().interger().required(),
    creditLoanHoldMonth: Joi.number().interger().required(),

    applyGreen: Joi.boolean().required(),
    applySeoul: Joi.boolean().required(),
    applyRural: Joi.boolean().required(),
    applyMortage: Joi.boolean().required(),
    applyCredit: Joi.boolean().required(),

    initialUserCapital: Joi.number().interger().required(),
})


// export schemas
export {
    userInputSchema, energyContractSchema, 
    montlyElectricityInputSchema, montlyGasInputSchema, 
    LCCAssumptionInputSchema, remodelingTechInputSchema, detailedFundInformationInputSchema
}