import Genetic from '../model/genetic.js'
import { NPVcalculate, loanCalculate } from './cashflowNPV.js'
import { greenRemodelingInterestSupportProject, seoulHomeRepairLoanProject, ruralHousingImrpoveProject, mortageLoanProject, creditLoanProject } from '../configs/fund.js'
import {
	energyContract,
	monthlyElectricityInput, monthlyGasInput,
	LCCAssumptionInput, remodelingTechInput, detailedFundInformationInput
} from '../controllers/client_input.js'
import { updatedUserInput } from '../utils/updateInput.js'
import { totalInitialCost } from './getNPV.js'

var genetic = Genetic.create();
genetic.optimize = Genetic.Optimize.Minimize;
genetic.select1 = Genetic.Select1.Tournament2;
genetic.select2 = Genetic.Select2.Tournament2;

genetic.seed = function () {
	var totalRemodelingCost = parseInt(this.userData.totalRemodelingCost)
	var B1 = this.fund.greenRemodelingInterestSupportProject
	var B2 = this.fund.seoulHomeRepairLoanProject
	var B3 = this.fund.ruralHousingImrpoveProject
	var B4 = this.fund.mortageLoanProject
	var B5 = this.fund.creditLoanProject
	var B6 = this.userData.initialUserCapital

	var L = {
		remainLoan: parseInt(totalRemodelingCost - (B1.min + B2.min + B3.min + B4.min + B5.min + B6)),
		totalGap: B1.max - B1.loanAmount
			+ B2.max - B2.loanAmount
			+ B3.max - B3.loanAmount
			+ B4.max - B4.loanAmount
			+ B5.max - B5.loanAmount
		}

	function allocateRandomLoanForProject(L, Business, i) {
		// skip the process, when buisness is not used.
		if (Business.max == 0) { return L, Business }

		let total = L.remainLoan
		let min = Business.loanAmount
		let max = Business.max
		let range = max - min
		let must = 0;
		let randomFloat = 0;

		L.totalGap -= range

		// must allocate parts
		if (total < (L.totalGap)) {
			must = 0
		} else {
			must = total - (L.totalGap)
		}

		// rearrange the range
		if (L.totalGap == 0) {
			randomFloat = total
		} else if (must == range) {
			randomFloat = must
		} else {
			randomFloat = Math.random() * (Math.min(total,range) - must)
			randomFloat += must
		}

		// allocate the randomFloat to loan
		Business.loanAmount += randomFloat;

		// update the remain loan
		L.remainLoan -= randomFloat;

		return L, Business
	}

	var shuffleArray = [0, 1, 2, 3, 4].sort(() => Math.random() - 0.5)
	for (let i = 0; i < shuffleArray.length; i++) {
		let idx = shuffleArray[i]
		if (idx == 0) { L, B1 = allocateRandomLoanForProject(L, B1, i) }
		if (idx == 1) { L, B2 = allocateRandomLoanForProject(L, B2, i) }
		if (idx == 2) { L, B3 = allocateRandomLoanForProject(L, B3, i) }
		if (idx == 3) { L, B4 = allocateRandomLoanForProject(L, B4, i) }
		if (idx == 4) { L, B5 = allocateRandomLoanForProject(L, B5, i) }
	}
	var entity = [B1, B2, B3, B4, B5]
	return entity;
};

genetic.fitness = function (entity) {
	function NPV(buisness) {
		var yearPayments = loanCalculate(buisness.loanAmount, buisness.interestRatio, buisness.interestSupportRatio, buisness.repaymentPeriod, buisness.holdPeriod)
		var npv = NPVcalculate(yearPayments, buisness.realInterest)
		return npv
	}

	var fitness = 0;
	for (let i = 0; i < entity.length; i++) {
		fitness += NPV(entity[i])
	}
	return fitness;
};

genetic.mutate = function (entity) {

	// reset the random one Business model
	var shuffleArray = [0, 1, 2, 3, 4].sort(() => Math.random() - 0.5)
	var tanos = shuffleArray[0]
	var extraLoan = entity[tanos].loanAmount - entity[tanos].min
	entity[tanos].loanAmount = entity[tanos].min

	var L = {
		remainLoan: extraLoan,
		totalGap: entity[0].max - entity[0].loanAmount
			+ entity[1].max - entity[1].loanAmount
			+ entity[2].max - entity[2].loanAmount
			+ entity[3].max - entity[3].loanAmount
			+ entity[4].max - entity[4].loanAmount
	}

	function allocateRandomLoanForProject(L, Business, i) {
		// skip the process, when buisness is not used.
		if (Business.max == 0) { return L, Business }

		let total = L.remainLoan
		let min = Business.loanAmount
		let max = Business.max
		let range = max - min
		let must = 0;
		let randomFloat = 0;

		L.totalGap -= range

		// must allocate parts
		if (total < (L.totalGap)) {
			must = 0
		} else {
			must = total - (L.totalGap)
		}

		// rearrange the range
		if (L.totalGap == 0) {
			randomFloat = total
		} else if (must == range) {
			randomFloat = must
		} else {
			randomFloat = Math.random() * (Math.min(total,range) - must)
			randomFloat += must
		}

		// allocate the randomFloat to loan
		Business.loanAmount += randomFloat;

		// update the remain loan
		L.remainLoan -= randomFloat;

		return L, Business
	}


	for (let i = 0; i < shuffleArray.length; i++) {
		var idx = shuffleArray[i]
		L, entity[idx] = allocateRandomLoanForProject(L, entity[idx], i)
	}

	return entity;
};
	
genetic.crossover = function (mother, father) {
	var daughter = mother
	var son = father
	var extraLoan_daughter = 0
	var extraLoan_son = 0

	for (let idx = 0; idx < 5; idx++) {
		var diff = Math.abs(mother[idx].loanAmount - father[idx].loanAmount)

		if (mother[idx].loanAmount >= father[idx].loanAmount) {
			daughter[idx].loanAmount -= diff
			extraLoan_daughter += diff

		} else {
			son[idx].loanAmount -= diff
			extraLoan_son += diff
		}
	}

	var L_daughter = {
		remainLoan: extraLoan_daughter,
		totalGap: daughter[0].max - daughter[0].loanAmount
			+ daughter[1].max - daughter[1].loanAmount
			+ daughter[2].max - daughter[2].loanAmount
			+ daughter[3].max - daughter[3].loanAmount
			+ daughter[4].max - daughter[4].loanAmount
	}
	var L_son = {
		remainLoan: extraLoan_son,
		totalGap: son[0].max - son[0].loanAmount
			+ son[1].max - son[1].loanAmount
			+ son[2].max - son[2].loanAmount
			+ son[3].max - son[3].loanAmount
			+ son[4].max - son[4].loanAmount
	}
	
	function allocateRandomLoanForProject(L, Business, i) {
		// skip the process, when buisness is not used.
		if (Business.max == 0) { return L, Business }

		let total = L.remainLoan
		let min = Business.loanAmount
		let max = Business.max
		let range = max - min
		let must = 0;
		let randomFloat = 0;

		L.totalGap -= range

		// must allocate parts
		if (total < (L.totalGap)) {
			must = 0
		} else {
			must = total - (L.totalGap)
		}

		// rearrange the range
		if (L.totalGap == 0) {
			randomFloat = total
		} else if (must == range) {
			randomFloat = must
		} else {
			randomFloat = Math.random() * (Math.min(total,range) - must)
			randomFloat += must
		}

		// allocate the randomFloat to loan
		Business.loanAmount += randomFloat;

		// update the remain loan
		L.remainLoan -= randomFloat;

		return L, Business
	}

	var shuffleArray = [0, 1, 2, 3, 4].sort(() => Math.random() - 0.5)
	for (let i = 0; i < shuffleArray.length; i++) {
		var idx = shuffleArray[i]
		L_daughter, daughter[idx] = allocateRandomLoanForProject(L_daughter, daughter[idx], i)
		L_son, son[idx] = allocateRandomLoanForProject(L_son, son[idx], i)
	}

	return [son, daughter];
}
	
genetic.generation = function (pop, generation, stats) {
	// stop running once we've reached the solution
	return true
};

// 1. Add information to 'detailed fund information input'
detailedFundInformationInput.buildingType   = updatedUserInput.buildingType
detailedFundInformationInput.card           = updatedUserInput.card
detailedFundInformationInput.city           = updatedUserInput.city
detailedFundInformationInput.approvalYear   = updatedUserInput.approvalYear
detailedFundInformationInput.realInterest   = LCCAssumptionInput.realInterest
detailedFundInformationInput.analysisPeriod = LCCAssumptionInput.analysisPeriod
detailedFundInformationInput.totalRemodelingCost = totalInitialCost

genetic.userData = detailedFundInformationInput

// 2. Check the validity of the total remodeling cost
// If total remodeling cost have exceeded the maximum loan limit, the total remodeling cost was decreased.
let totalRemodelingCost = totalInitialCost
let B1 = new greenRemodelingInterestSupportProject(
	genetic.userData.buildingType, genetic.userData.mortageLoanInterest,
	genetic.userData.creditLoanInterest, genetic.userData.card,
	genetic.userData.realInterest, genetic.userData.applyGreen)
let B2 = new seoulHomeRepairLoanProject(
	genetic.userData.buildingType, genetic.userData.mortageLoanInterest,
	genetic.userData.creditLoanInterest, genetic.userData.approvalYear,
	genetic.userData.realInterest, genetic.userData.applySeoul)
let B3 = new ruralHousingImrpoveProject(
	genetic.userData.realInterest, genetic.userData.applyRural)
let B4 = new mortageLoanProject(
	genetic.userData.mortageLoanMaxLimit, genetic.userData.mortageLoanInterest,
	genetic.userData.mortageLoanRepaymentMonth, genetic.userData.mortageLoanHoldMonth,
	genetic.userData.realInterest, genetic.userData.applyMortage)
let B5 = new creditLoanProject(
	genetic.userData.creditLoanMaxLimit, genetic.userData.creditLoanInterest,
	genetic.userData.creditLoanRepaymentMonth, genetic.userData.creditLoanHoldMonth,
	genetic.userData.realInterest, genetic.userData.applyCredit)
let B6 = genetic.userData.initialUserCapital

let remainLoan = parseInt(totalRemodelingCost - (B1.min + B2.min + B3.min + B4.min + B5.min + B6))
let totalGap = B1.gap + B2.gap + B3.gap + B4.gap + B5.gap

var excessCost = 0
if (remainLoan > totalGap) { 
	excessCost += remainLoan - totalGap
	console.log('Total remodeling costs have exceeded the maximum loan limit by '+ excessCost)
}
genetic.userData.totalRemodelingCost -= excessCost

// 3. Define fund for optimizatiaon
genetic.fund = {
	"greenRemodelingInterestSupportProject": new greenRemodelingInterestSupportProject(
		genetic.userData.buildingType,       genetic.userData.mortageLoanInterest, 
		genetic.userData.creditLoanInterest, genetic.userData.card, 
		genetic.userData.realInterest,       genetic.userData.applyGreen),
	"seoulHomeRepairLoanProject": new seoulHomeRepairLoanProject(
		genetic.userData.buildingType,       genetic.userData.mortageLoanInterest, 
		genetic.userData.creditLoanInterest, genetic.userData.approvalYear, 
		genetic.userData.realInterest,       genetic.userData.applySeoul),
	"ruralHousingImrpoveProject": new ruralHousingImrpoveProject(
		genetic.userData.realInterest,       genetic.userData.applyRural),
	"mortageLoanProject": new mortageLoanProject(
		genetic.userData.mortageLoanMaxLimit,       genetic.userData.mortageLoanInterest, 
		genetic.userData.mortageLoanRepaymentMonth, genetic.userData.mortageLoanHoldMonth, 
		genetic.userData.realInterest,              genetic.userData.applyMortage),
	"creditLoanProject": new creditLoanProject(
		genetic.userData.creditLoanMaxLimit,       genetic.userData.creditLoanInterest, 
		genetic.userData.creditLoanRepaymentMonth, genetic.userData.creditLoanHoldMonth, 
		genetic.userData.realInterest,             genetic.userData.applyCredit)
}

var config = {
	"iterations": 700
	, "size": 30
	, "crossover": 0.5
	, "mutation": 0.5
	, "skip": 0
	, "fittestAlwaysSurvives": true
};

// debug
genetic.evolve(config)
genetic.start()
const GAresult = genetic.stats


const optimizeResults = {
	"greenRemodelingInterestSupportProjectResult": Math.round(GAresult.output[0].loanAmount/1000)*1000,
	"seoulHomeRepairLoanProjectResult": Math.round(GAresult.output[1].loanAmount/1000)*1000,
	"ruralHousingImrpoveProjectResult": Math.round(GAresult.output[2].loanAmount/1000)*1000,
	"mortageLoanProjectResult": Math.round(GAresult.output[3].loanAmount/1000)*1000,
	"creditLoanProjectResult": Math.round(GAresult.output[4].loanAmount/1000)*1000,
	"NPV": Math.round(GAresult.maximum/1000)*1000,
	"excessCost": Math.round(excessCost/1000)*1000
}

export {optimizeResults}