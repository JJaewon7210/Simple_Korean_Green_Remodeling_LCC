import Genetic from '../model/genetic.js'
import { NPVcalculate, loanCalculate } from './calculateCostLogics.js'
import { greenRemodelingInterestSupportProject, seoulHomeRepairLoanProject, ruralHousingImrpoveProject, mortageLoanProject, creditLoanProject } from './utils/fund.js.js'
import { userData } from '../controllers/client_input.js';

var genetic = Genetic.create();
genetic.optimize = Genetic.Optimize.Minimize;
genetic.select1 = Genetic.Select1.Tournament2;
genetic.select2 = Genetic.Select2.Tournament2;

genetic.seed = function () {
	var totalRemodelingCost = parseInt((this.userData.totalRemodelingCost/100000)*100000)
	var B1 = this.fund.greenRemodelingInterestSupportProject
	var B2 = this.fund.seoulHomeRepairLoanProject
	var B3 = this.fund.ruralHousingImrpoveProject
	var B4 = this.fund.mortageLoanProject
	var B5 = this.fund.creditLoanProject
	var B6 = this.userData.initialUserCapital
	var L = {
		essentialLoan: (B1.min + B2.min + B3.min + B4.min + B5.min + B6),
		remainLoan: parseInt((totalRemodelingCost - (B1.min + B2.min + B3.min + B4.min + B5.min + B6)) / 100000) * 100000,
		totalGap: B1.gap + B2.gap + B3.gap + B4.gap + B5.gap
	}
	if (L.remainLoan >= L.totalGap) {throw new Error("Total remodeling Cost is too big.")}
	function allocateRandomLoanForProject(L, Business) {
		L.totalGap -= Business.gap
		if (L.remainLoan > L.totalGap) {
			var mustAllocate = L.remainLoan - L.totalGap
		} else {
			var mustAllocate = 0
		}
		if (L.remainLoan < Business.gap) {
			var maxAllocate = L.remainLoan
		} else {
			var maxAllocate = Business.gap
		}
		var projLoan = mustAllocate + Math.round(Math.random() * (maxAllocate - mustAllocate) / 100000) * 100000
		L.remainLoan -= projLoan
		Business.loanAmount = projLoan + Business.min
		Business.gap = Business.max - Business.loanAmount
		return L.totalGap, L.remainLoan, Business
	}
	var shuffleArray = [0, 1, 2, 3, 4].sort(() => Math.random() - 0.5)
	for (let i = 0; i < shuffleArray.length; i++) {
		let idx = shuffleArray[i]
		if (idx == 0) { L, B1 = allocateRandomLoanForProject(L, B1) }
		if (idx == 1) { L, B2 = allocateRandomLoanForProject(L, B2) }
		if (idx == 2) { L, B3 = allocateRandomLoanForProject(L, B3) }
		if (idx == 3) { L, B4 = allocateRandomLoanForProject(L, B4) }
		if (idx == 4) { L, B5 = allocateRandomLoanForProject(L, B5) }
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

	var shuffleArray = [0, 1, 2, 3, 4].sort(() => Math.random() - 0.5)
	var tanos = shuffleArray[0]
	var extraLoan = entity[tanos].loanAmount - entity[tanos].min
	entity[tanos].loanAmount = entity[tanos].min
	entity[tanos].gap = entity[tanos].max - entity[tanos].loanAmount

	var L = {
		remainLoan: extraLoan,
		totalGap: entity[0].gap + entity[1].gap + entity[2].gap + entity[3].gap + entity[4].gap
	}

	function allocateRandomLoanForProject(L, Business) {
		L.totalGap -= Business.gap
		if (L.remainLoan > L.totalGap) {
			var mustAllocate = L.remainLoan - L.totalGap
		} else {
			var mustAllocate = 0
		}
		if (L.remainLoan < Business.gap) {
			var maxAllocate = L.remainLoan
		} else {
			var maxAllocate = Business.gap
		}
		var projLoan = mustAllocate + Math.round(Math.random() * (maxAllocate - mustAllocate) / 100000) * 100000
		L.remainLoan -= projLoan
		Business.loanAmount = projLoan + Business.loanAmount
		Business.gap = Business.max - Business.loanAmount
		return L.totalGap, L.remainLoan, Business
	}

	for (let i = 0; i < shuffleArray.length; i++) {
		var idx = shuffleArray[i]
		L, entity[idx] = allocateRandomLoanForProject(L, entity[idx])
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
		if (mother[idx].loanAmount > father[idx].loanAmount) {
			daughter[idx].loanAmount -= diff
			daughter[idx].gap = daughter[idx].max - daughter[idx].loanAmount
			extraLoan_daughter += diff
		} else {
			son[idx].loanAmount -= diff
			son[idx].gap = son[idx].max - son[idx].loanAmount
			extraLoan_son += diff
		}
	}

	var L_daughter = {
		remainLoan: extraLoan_daughter,
		totalGap: daughter[0].gap + daughter[1].gap + daughter[2].gap + daughter[3].gap + daughter[4].gap
	}
	var L_son = {
		remainLoan: extraLoan_son,
		totalGap: son[0].gap + son[1].gap + son[2].gap + son[3].gap + son[4].gap
	}

	function allocateRandomLoanForProject(L, Business) {
		L.totalGap -= Business.gap
		if (L.remainLoan > L.totalGap) {
			var mustAllocate = L.remainLoan - L.totalGap
		} else {
			var mustAllocate = 0
		}
		if (L.remainLoan < Business.gap) {
			var maxAllocate = L.remainLoan
		} else {
			var maxAllocate = Business.gap
		}
		var projLoan = mustAllocate + Math.round(Math.random() * (maxAllocate - mustAllocate) / 100000) * 100000
		L.remainLoan -= projLoan
		Business.loanAmount = projLoan + Business.loanAmount
		Business.gap = Business.max - Business.loanAmount
		return L.totalGap, L.remainLoan, Business
	}

	var shuffleArray = [0, 1, 2, 3, 4].sort(() => Math.random() - 0.5)
	var totalAmount = 0
	for (let i = 0; i < shuffleArray.length; i++) {
		var idx = shuffleArray[i]
		L_daughter, daughter[idx] = allocateRandomLoanForProject(L_daughter, daughter[idx])
		L_son, son[idx] = allocateRandomLoanForProject(L_son, son[idx])
		totalAmount += son[idx].loanAmount
	}

	return [son, daughter];
}
	
genetic.generation = function (pop, generation, stats) {
	// stop running once we've reached the solution
	return true
};

genetic.userData = userData

genetic.fund = {
	"greenRemodelingInterestSupportProject": new greenRemodelingInterestSupportProject(genetic.userData.buildingType, genetic.userData.mortageLoanInterest, genetic.userData.creditLoanInterest, genetic.userData.card, genetic.userData.realInterest, genetic.userData.applyGreen),
	"seoulHomeRepairLoanProject": new seoulHomeRepairLoanProject(genetic.userData.buildingType, genetic.userData.mortageLoanInterest, genetic.userData.creditLoanInterest, genetic.userData.approvalYear, genetic.userData.realInterest,  genetic.userData.applySeoul),
	"ruralHousingImrpoveProject": new ruralHousingImrpoveProject(genetic.userData.realInterest,  genetic.userData.applyRural),
	"mortageLoanProject": new mortageLoanProject(genetic.userData.mortageLoanMaxLimit, genetic.userData.mortageLoanInterest, genetic.userData.mortageLoanRepaymentMonth, genetic.userData.mortageLoanHoldMonth, genetic.userData.realInterest,  genetic.userData.applyMortage),
	"creditLoanProject": new creditLoanProject(genetic.userData.creditLoanMaxLimit, genetic.userData.creditLoanInterest, genetic.userData.creditLoanRepaymentMonth, genetic.userData.creditLoanHoldMonth, genetic.userData.realInterest,  genetic.userData.applyCredit)
}

var config = {
	"iterations": 500
	, "size": 30
	, "crossover": 0.9
	, "mutation": 0.1
	, "skip": 0
	, "fittestAlwaysSurvives": true
};

// debug
const date01 = new Date();
genetic.evolve(config)
genetic.start()
const date02 = new Date();
const GAresult = genetic.stats

const optimizeResults = {
	"greenRemodelingInterestSupportProjectResult": GAresult.output[0].loanAmount,
	"seoulHomeRepairLoanProjectResult": GAresult.output[1].loanAmount,
	"ruralHousingImrpoveProjectResult": GAresult.output[2].loanAmount,
	"mortageLoanProjectResult": GAresult.output[3].loanAmount,
	"creditLoanProjectResult": GAresult.output[4].loanAmount,
	"NPV": GAresult.maximum
}

export {optimizeResults}

// console.log('Spending Time: ',(date02.getTime()-date01.getTime())/1000, 'sec')
// console.log(GAresult.output[0].loanAmount)
// console.log(GAresult.output[1].loanAmount)
// console.log(GAresult.output[2].loanAmount)
// console.log(GAresult.output[3].loanAmount)
// console.log(GAresult.output[4].loanAmount)
// console.log(Math.floor(GAresult.maximum))