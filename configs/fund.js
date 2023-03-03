class Project{
    constructor () {
    this.projName = '1'
    this.min = undefined
    this.max = undefined
    this.interestRatio = undefined
    this.interestSupportRatio = undefined
    this.repaymentPeriod =undefined
    this.holdPeriod =undefined
    this.interestRatio =undefined
    this.loanAmount = undefined
    }
}

export class greenRemodelingInterestSupportProject extends Project  {
    constructor (buildingType, mortageLoanInterest, creditLoanInterest, card, realInterest, apply) {
        super()
        this.projName = "greenRemodelingInterestSupportProject"
        this.buildingType = buildingType
        this.mortageLoanInterest = mortageLoanInterest
        this.creditLoanInterest = creditLoanInterest
        this.card = card
        this.realInterest = realInterest
        // set loan range
        if (buildingType == '비주거') {
            this.min = 20000000
            this.max = 5000000000
        } else if (buildingType == '주거-단독') {
            this.min = 3000000
            this.max = 50000000
        } else {
            this.min = 3000000
            this.max = 20000000
        }

        // if do not apply Project
        if (apply == false) {
            this.min = 0
            this.max = 0
        }
        
        this.gap = this.max - this.min

        // set interest ratio
        this.interestRatio = Math.min(mortageLoanInterest, creditLoanInterest)
        // set interest support ratio and repayment period
        if (buildingType == '비주거') {
            if (['신한은행','제주은행','기업은행','국민은행','농협은행'].includes(card)){
                this.repaymentPeriod = 120
                this.holdPeriod = 36
                this.interestSupportRatio = 0.03
            } else {
                throw new Error ('wrong card. please select with [신한은행, 제주은행, 기업은행, 국민은행, 농협카드]')
            }
        } else if (buildingType == '주거-단독') {
            if (['신한은행','우리은행','국민은행','농협은행'].includes(card)){
                this.repaymentPeriod = 60
                this.holdPeriod = 0
                this.interestSupportRatio = 0.03
            } else if (['신한카드'].includes(card)) {
                this.repaymentPeriod = 60
                this.holdPeriod = 0
                this.interestSupportRatio = 0
            } else {
                throw new Error ('wrong card. please select with [신한은행, 우리은행, 국민은행, 농협은행, 신한카드]')
            }
        } else {
            if (['신한은행','우리은행','국민은행','농협은행'].includes(card)){
                this.repaymentPeriod = 60
                this.holdPeriod = 0
                this.interestSupportRatio = 0.03
            } else if (['롯데카드','신한카드','삼성카드'].includes(card)) {
                this.repaymentPeriod = 36
                this.holdPeriod = 0
                this.interestSupportRatio = 0
            } else {
                throw new Error ('wrong card. please select with [신한은행, 우리은행, 국민은행, 농협은행, 롯데카드, 삼성카드, 신한카드]')
            }
        }
    }
}

export class seoulHomeRepairLoanProject extends Project {
    constructor (buildingType, mortageLoanInterest, creditLoanInterest, approvalYear, realInterest, apply) {
        super()
        this.projName = ' seoulHomeRepairLoanProject'
        this.buildingType = buildingType
        this.mortageLoanInterest = mortageLoanInterest
        this.creditLoanInterest = creditLoanInterest
        this.approvalyear = approvalYear
        this.realInterest = realInterest
    
        // set loan range
        if (['주거-단독','주거-다중'].includes(buildingType)) {
            this.min = 0
            this.max = 60000000
        } else if (['주거-다가구'].includes(buildingType)) {
            this.min = 0
            this.max = 30000000
        } else if (['주거-다세대','주거-연립'].includes(buildingType)){
            this.min = 0
            this.max = 30000000
        } else {
            throw new Error ('wrong buildingType. please select with [주거-단독, 주거-다중, 주거-다가구, 주거-다세대, 주거-연립]')
        }
        
        // if do not apply Project
        if (apply == false) {
            this.min = 0
            this.max = 0
        }

        this.gap = this.max - this.min

        // set interest ratio and repayment ratio
        if (2022-approvalYear >= 20) {
            this.interestRatio = 0.007
            this.repaymentPeriod = 120
            this.holdPeriod = 36
        } else if (2022-approvalYear >=10) {
            this.interestRatio = Math.min(mortageLoanInterest, creditLoanInterest)
            this.repaymentPeriod = 60
            this.holdPeriod = 0
        } else {
            throw new Error ('The year of approval for use must be less than 2012.')
        }
        
        // set interest support ratio
        if (this.interestRatio > 0.02) {
            this.interestSupportRatio = 0.02
        } else {
            this.interestSupportRatio = 0
        }
    }
}

export class ruralHousingImrpoveProject extends Project {
    constructor (realInterest, apply) {
        super()
        this.projName = ' ruralHousingImrpoveProject'
        this.realInterest = realInterest
        this.min = 0
        this.max = 100000000
        this.interestRatio = 0.02
        this.interestSupportRatio = 0
        this.repaymentPeriod = 240
        this.holdPeriod = 12
        
        // if do not apply Project
        if (apply == false) {
            this.min = 0
            this.max = 0
        }
        
        this.gap = this.max - this.min
    }
}

export class mortageLoanProject extends Project {
    constructor (mortageLoanMaxLimit, mortageLoanInterest, mortageLoanRepaymentMonth, mortageLoanHoldMonth, realInterest, apply) {
        super()
        this.projName = 'mortageLoanProject'
        this.min = 0
        this.max = mortageLoanMaxLimit
        this.interestRatio = mortageLoanInterest
        this.interestSupportRatio = 0
        this.repaymentPeriod = mortageLoanRepaymentMonth
        this.holdPeriod = mortageLoanHoldMonth
        this.realInterest = realInterest
        // if do not apply Project
        if (apply == false) {
            this.min = 0
            this.max = 0
        }

        this.gap = this.max - this.min
    }
}

export class creditLoanProject extends Project {
    constructor (creditLoanMaxLimit, creditLoanInterest, creditLoanRepaymentMonth, creditLoanHoldMonth, realInterest,apply) {
        super()
        this.projName = 'creditLoanProject'
        this.min = 0
        this.max = creditLoanMaxLimit
        this.interestRatio = creditLoanInterest
        this.interestSupportRatio = 0
        this.repaymentPeriod = creditLoanRepaymentMonth
        this.holdPeriod = creditLoanHoldMonth
        this.realInterest = realInterest
        // if do not apply Project
        if (apply == false) {
            this.min = 0
            this.max = 0
        }
        
        this.gap = this.max - this.min
    }
}