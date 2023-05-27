import {updateUserInput, changeApplyBuisness} from '../utils/updateInput.js'
import {
	getAnnualCashFlowsOfWall,
	getAnnualCashFlowsOfRoof,
	getAnnualCashFlowsOfFloor,
	getAnnualCashFlowsOfWindow,
	getAnnualCashFlowsOfLight,
	getAnnualCashFlowsOfInteriorBlind,
	getAnnualCashFlowsOfExteriorBlind,
	getAnnualCashFlowsOfRenewable,
	getAnnualCashFlowsOfDoor,
	getAnnualCashFlowsOfFreezer,
	getAnnualCashFlowsOfBoiler,
	getAnnualCashFlowsOfAHU,
	getAnnualCashFlowsOfHeatpump
} from '../services/cashflowTechnology.js'
import { electricityCostCalculate, gasCostCalculate } from '../services/cashflowEnergy.js'
import { NPVcalculate, loanCalculate } from '../services/cashflowNPV.js'
import Genetic from '../model/genetic.js'
import { greenRemodelingInterestSupportProject, seoulHomeRepairLoanProject, ruralHousingImrpoveProject, mortageLoanProject, creditLoanProject } from '../configs/fund.js'

function getOutput(userInput, energyContract, monthlyElectricityInput, monthlyGasInput, LCCAssumptionInput, remodelingTechInput, detailedFundInformationInput){
    // Chapter 1.
    var updatedUserInput = updateUserInput(userInput)
    var detailedFundInformationInput = changeApplyBuisness(userInput, detailedFundInformationInput)

    // Chapter 2.
    // 1. 벽체
    var totalWallCashFlow = 0
    var initialCostWall = 0
    if (remodelingTechInput.wall.size.length > 0) {
        for (let i=0; i < remodelingTechInput.wall.size.length; i++) {
            let wallCashFlows = getAnnualCashFlowsOfWall(remodelingTechInput.wall.name[i], remodelingTechInput.wall.size[i], updatedUserInput , LCCAssumptionInput.analysisPeriod, remodelingTechInput.wall['material cost'][i])
            initialCostWall += wallCashFlows[0]
            totalWallCashFlow += NPVcalculate(wallCashFlows, LCCAssumptionInput.realInterest, LCCAssumptionInput.analysisPeriod)
        }
    }
    // 2. 지붕
    var totalRoofCashFlow = 0
    var initialCostRoof = 0
    if (remodelingTechInput.roof.size.length > 0) {
        for (let i = 0; i < remodelingTechInput.roof.size.length; i++) {
            let roofCashFlows = getAnnualCashFlowsOfRoof(remodelingTechInput.roof.name[i], remodelingTechInput.roof.size[i], updatedUserInput , LCCAssumptionInput.analysisPeriod, remodelingTechInput.roof['material cost'][i])
            initialCostRoof += roofCashFlows[0]
            totalRoofCashFlow += NPVcalculate(roofCashFlows, LCCAssumptionInput.realInterest, LCCAssumptionInput.analysisPeriod)
        }
    }
    // 3. 바닥
    var totalFloorCashFlow = 0
    var initialCostFloor = 0
    if (remodelingTechInput.floor.size.length > 0) {
        for (let i = 0; i < remodelingTechInput.floor.size.length; i++) {
            let floorCashFlows = getAnnualCashFlowsOfFloor(remodelingTechInput.floor.name[i], remodelingTechInput.floor.size[i], updatedUserInput , LCCAssumptionInput.analysisPeriod, remodelingTechInput.floor['material cost'][i])
            initialCostFloor += floorCashFlows[0]
            totalFloorCashFlow += NPVcalculate(floorCashFlows, LCCAssumptionInput.realInterest, LCCAssumptionInput.analysisPeriod)
        }
    }
    // 4. 창문
    var totalWindowCashFlow = 0
    var initialCostWindow = 0
    if (remodelingTechInput.window.size.length > 0) {
        for (let i = 0; i < remodelingTechInput.window.size.length; i++) {
            let windowCashFlows = getAnnualCashFlowsOfWindow(remodelingTechInput.window.name[i], remodelingTechInput.window.size[i], updatedUserInput , LCCAssumptionInput.analysisPeriod, remodelingTechInput.window['material cost'][i])
            initialCostWindow += windowCashFlows[0]
            totalWindowCashFlow += NPVcalculate(windowCashFlows, LCCAssumptionInput.realInterest, LCCAssumptionInput.analysisPeriod)
        }
    }
    // 5. 조명
    var totalLightCashFlow = 0
    var initialCostLight = 0
    if (remodelingTechInput.light.size.length > 0) {
        for (let i = 0; i < remodelingTechInput.light.size.length; i++) {
            let lightCashFlows = getAnnualCashFlowsOfLight(remodelingTechInput.light.size[i], LCCAssumptionInput.analysisPeriod)
            initialCostLight += lightCashFlows[0]
            totalLightCashFlow += NPVcalculate(lightCashFlows, LCCAssumptionInput.realInterest, LCCAssumptionInput.analysisPeriod)
        }
    }
    // 6. 내부차장
    var totalInteriorBlindCashFlow = 0
    var initialCostInteriorBlind = 0
    if (remodelingTechInput.interiorBlind.size.length > 0) {
        for (let i = 0; i < remodelingTechInput.interiorBlind.size.length; i++) {
            let interiorBlindCashFlows = getAnnualCashFlowsOfInteriorBlind(remodelingTechInput.interiorBlind.name[i], remodelingTechInput.interiorBlind.size[i], LCCAssumptionInput.analysisPeriod, remodelingTechInput.interiorBlind['material cost'][i])
            initialCostInteriorBlind += interiorBlindCashFlows[0]
            totalInteriorBlindCashFlow += NPVcalculate(interiorBlindCashFlows, LCCAssumptionInput.realInterest, LCCAssumptionInput.analysisPeriod)
        }
    }
    //7. 외부차양
    var totalExteriorBlindCashFlow = 0
    var initialCostExteriorBlind = 0
    if (remodelingTechInput.exteriorBlind.size.length > 0) {
        for (let i = 0; i < remodelingTechInput.exteriorBlind.size.length; i++) {
            let exteriorBlindCashFlows = getAnnualCashFlowsOfExteriorBlind(remodelingTechInput.exteriorBlind.name[i], remodelingTechInput.exteriorBlind.size[i], LCCAssumptionInput.analysisPeriod)
            initialCostExteriorBlind += exteriorBlindCashFlows[0]
            totalExteriorBlindCashFlow += NPVcalculate(exteriorBlindCashFlows, LCCAssumptionInput.realInterest, LCCAssumptionInput.analysisPeriod)
        }
    }
    // 8. 태양광
    var totalRenewableCashFlow = 0
    var initialCostRenewable = 0
    if (remodelingTechInput.renewable.size.length > 0) {
        for (let i = 0; i < remodelingTechInput.renewable.size.length; i++) {
            let renewableCashFlows = getAnnualCashFlowsOfRenewable(remodelingTechInput.renewable.name[i], remodelingTechInput.renewable.size[i],  LCCAssumptionInput.analysisPeriod)
            initialCostRenewable += renewableCashFlows[0]
            totalRenewableCashFlow += NPVcalculate(renewableCashFlows, LCCAssumptionInput.realInterest, LCCAssumptionInput.analysisPeriod)
        }
    }
    // 9. 출입문
    var totalDoorCashFlow = 0
    var initialCostDoor = 0
    if (remodelingTechInput.door.size.length > 0) {
        for (let i = 0; i < remodelingTechInput.door.size.length; i++) {
            let doorCashFlows = getAnnualCashFlowsOfDoor(remodelingTechInput.door.name[i], remodelingTechInput.door.size[i], LCCAssumptionInput.analysisPeriod, remodelingTechInput.door['material cost'][i])
            initialCostDoor += doorCashFlows[0]
            totalDoorCashFlow += NPVcalculate(doorCashFlows, LCCAssumptionInput.realInterest, LCCAssumptionInput.analysisPeriod)
        }
    }
    // 10. 냉동기
    var totalFreezerCashFlow = 0
    var initialCostFreezer = 0
    if (remodelingTechInput.freezer.size.length > 0) {
        for (let i = 0; i < remodelingTechInput.freezer.size.length; i++) {
            let freezerCashFlows = getAnnualCashFlowsOfFreezer(remodelingTechInput.freezer.size[i], LCCAssumptionInput.analysisPeriod)
            initialCostFreezer += freezerCashFlows[0]
            totalFreezerCashFlow += NPVcalculate(freezerCashFlows, LCCAssumptionInput.realInterest, LCCAssumptionInput.analysisPeriod)
        }
    }
    // 11. 보일러
    var totalBoilerCashFlow = 0
    var initialCostBoiler = 0
    if (remodelingTechInput.boiler.size.length > 0) {
        for (let i = 0; i < remodelingTechInput.boiler.size.length; i++) {
            let boilerCashFlows = getAnnualCashFlowsOfBoiler(remodelingTechInput.boiler.name[i], remodelingTechInput.boiler.size[i], LCCAssumptionInput.analysisPeriod, remodelingTechInput.boiler['material cost'][i])
            initialCostBoiler += boilerCashFlows[0]
            totalBoilerCashFlow += NPVcalculate(boilerCashFlows, LCCAssumptionInput.realInterest, LCCAssumptionInput.analysisPeriod)
        }
    }
    // 12. 공조기
    var totalAHUCashFlow = 0
    var initialCostAHU = 0
    if (remodelingTechInput.AHU.size.length > 0) {
        for (let i = 0; i < remodelingTechInput.AHU.size.length; i++) {
            let AHUCashFlows = getAnnualCashFlowsOfAHU(remodelingTechInput.AHU.size[i], LCCAssumptionInput.analysisPeriod, remodelingTechInput.AHU['material cost'][i])
            initialCostAHU += AHUCashFlows[0]
            totalAHUCashFlow += NPVcalculate(AHUCashFlows, LCCAssumptionInput.realInterest, LCCAssumptionInput.analysisPeriod)
        }
    }
    // 13. 히트펌프
    var totalHeatpumpCashFlow = 0
    var initialCostHeatpump = 0
    if (remodelingTechInput.heatpump.size.length > 0) {
        for (let i = 0; i < remodelingTechInput.heatpump.size.length; i++) {
            let heatpumpCashFlows = getAnnualCashFlowsOfHeatpump(remodelingTechInput.heatpump.size[i], LCCAssumptionInput.analysisPeriod, remodelingTechInput.heatpump['material cost'][i])
            initialCostHeatpump += heatpumpCashFlows[0]
            totalHeatpumpCashFlow += NPVcalculate(heatpumpCashFlows, LCCAssumptionInput.realInterest, LCCAssumptionInput.analysisPeriod)
        }
    }

    var techNPV = totalWallCashFlow + totalRoofCashFlow + totalFloorCashFlow + totalWindowCashFlow + totalLightCashFlow +
        totalInteriorBlindCashFlow + totalExteriorBlindCashFlow + totalRenewableCashFlow + totalDoorCashFlow + totalFreezerCashFlow +
        totalBoilerCashFlow + totalAHUCashFlow + totalHeatpumpCashFlow

    var totalInitialCost = initialCostWall + initialCostRoof + initialCostFloor + initialCostWindow + initialCostLight +
        initialCostInteriorBlind + initialCostExteriorBlind + initialCostRenewable + initialCostDoor + initialCostFreezer +
        initialCostBoiler + initialCostAHU + initialCostHeatpump

    // calculate electricity and gas cost
    var EPRICE_BEFORE = electricityCostCalculate(monthlyElectricityInput.before, updatedUserInput , energyContract)
    var EPRICE_AFTER = electricityCostCalculate(monthlyElectricityInput.after, updatedUserInput , energyContract)
    var electricityNPV = NPVcalculate(EPRICE_BEFORE - EPRICE_AFTER, LCCAssumptionInput.electricityRealInterest, LCCAssumptionInput.analysisPeriod) 

    var GPRICE_BEFORE = gasCostCalculate(monthlyGasInput.before, updatedUserInput )
    var GPRICE_AFTER = gasCostCalculate(monthlyGasInput.after, updatedUserInput )
    var gasNPV = NPVcalculate(GPRICE_BEFORE - GPRICE_AFTER, LCCAssumptionInput.gasRealInterest, LCCAssumptionInput.analysisPeriod)

    // round the output 1000 KRW
    totalWallCashFlow = Math.round(totalWallCashFlow / 1000) * 1000
    totalRoofCashFlow = Math.round(totalRoofCashFlow / 1000) * 1000
    totalFloorCashFlow = Math.round(totalFloorCashFlow / 1000) * 1000
    totalWindowCashFlow = Math.round(totalWindowCashFlow / 1000) * 1000
    totalLightCashFlow = Math.round(totalLightCashFlow / 1000) * 1000
    totalInteriorBlindCashFlow = Math.round(totalInteriorBlindCashFlow / 1000) * 1000
    totalExteriorBlindCashFlow = Math.round(totalExteriorBlindCashFlow / 1000) * 1000
    totalRenewableCashFlow = Math.round(totalRenewableCashFlow / 1000) * 1000
    totalDoorCashFlow = Math.round(totalDoorCashFlow / 1000) * 1000
    totalFreezerCashFlow = Math.round(totalFreezerCashFlow / 1000) * 1000
    totalBoilerCashFlow = Math.round(totalBoilerCashFlow / 1000) * 1000
    totalAHUCashFlow = Math.round(totalAHUCashFlow / 1000) * 1000
    totalHeatpumpCashFlow = Math.round(totalHeatpumpCashFlow / 1000) * 1000

    initialCostWall = Math.round(initialCostWall / 1000) * 1000
    initialCostRoof = Math.round(initialCostRoof / 1000) * 1000
    initialCostFloor = Math.round(initialCostFloor / 1000) * 1000
    initialCostWindow = Math.round(initialCostWindow / 1000) * 1000
    initialCostLight = Math.round(initialCostLight / 1000) * 1000
    initialCostInteriorBlind = Math.round(initialCostInteriorBlind / 1000) * 1000
    initialCostExteriorBlind = Math.round(initialCostExteriorBlind / 1000) * 1000
    initialCostRenewable = Math.round(initialCostRenewable / 1000) * 1000
    initialCostDoor = Math.round(initialCostDoor / 1000) * 1000
    initialCostFreezer = Math.round(initialCostFreezer / 1000) * 1000
    initialCostBoiler = Math.round(initialCostBoiler / 1000) * 1000
    initialCostAHU = Math.round(initialCostAHU / 1000) * 1000
    initialCostHeatpump = Math.round(initialCostHeatpump / 1000) * 1000

    totalInitialCost = Math.round(totalInitialCost / 1000) * 1000
    techNPV = Math.round(techNPV / 1000) * 1000

    electricityNPV = Math.round(electricityNPV / 1000) * 1000
    gasNPV = Math.round(gasNPV / 1000) * 1000

    //chapter 3.
    var genetic = Genetic.create();
    genetic.optimize = Genetic.Optimize.Minimize;
    genetic.select1 = Genetic.Select1.Tournament2;
    genetic.select2 = Genetic.Select2.Tournament2;
    genetic.loanCalculate = loanCalculate;
    genetic.NPVcalculate = NPVcalculate;

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
            totalGap: B1.max - B1.min
            + B2.max - B2.min
            + B3.max - B3.min
            + B4.max - B4.min
            + B5.max - B5.min
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
            var yearPayments = genetic.loanCalculate(buisness.loanAmount, buisness.interestRatio, buisness.interestSupportRatio, buisness.repaymentPeriod, buisness.holdPeriod)
            var npv = genetic.NPVcalculate(yearPayments, buisness.realInterest)
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
        return true;
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
        , "crossover": 0.3
        , "mutation": 0.7
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

    // chapter 4.

    // 대출 금액
    let _B1 = optimizeResults.greenRemodelingInterestSupportProjectResult
    let _B2 = optimizeResults.seoulHomeRepairLoanProjectResult
    let _B3 = optimizeResults.ruralHousingImrpoveProjectResult
    let _B4 = optimizeResults.mortageLoanProjectResult
    let _B5 = optimizeResults.creditLoanProjectResult
    let _B6 = detailedFundInformationInput.initialUserCapital

    // 대출 금액 비율
    const B1_result = _B1 / (_B1 + _B2 + _B3 + _B4 + _B5 + _B6)
    const B2_result = _B2 / (_B1 + _B2 + _B3 + _B4 + _B5 + _B6)
    const B3_result = _B3 / (_B1 + _B2 + _B3 + _B4 + _B5 + _B6)
    const B4_result = _B4 / (_B1 + _B2 + _B3 + _B4 + _B5 + _B6)
    const B5_result = _B5 / (_B1 + _B2 + _B3 + _B4 + _B5 + _B6)
    const B6_result = _B6 / (_B1 + _B2 + _B3 + _B4 + _B5 + _B6)


    // 분석 결과
    const ICC = totalInitialCost
    const NPV = -(techNPV + optimizeResults.NPV - ICC) + (electricityNPV + gasNPV)
    const SIR = (electricityNPV + gasNPV) / (techNPV + optimizeResults.NPV - ICC)
    const TR  = - optimizeResults.NPV
    const ECR = (electricityNPV + gasNPV)

    return {
        optimizeResults, B1_result, B2_result, B3_result, B4_result, B5_result, B6_result,
        ICC, NPV, SIR, TR, ECR,
        initialCostWall, initialCostRoof, initialCostFloor, initialCostWindow, 
        initialCostLight, initialCostInteriorBlind, initialCostExteriorBlind, 
        initialCostRenewable, initialCostDoor, initialCostFreezer, initialCostBoiler, initialCostAHU, initialCostHeatpump
    }
    
}

function getCustomOutput(customizedRatio, userInput, energyContract, monthlyElectricityInput, monthlyGasInput, LCCAssumptionInput, remodelingTechInput, detailedFundInformationInput){
    // Chapter 1.
    var updatedUserInput = updateUserInput(userInput)
    var detailedFundInformationInput = changeApplyBuisness(userInput, detailedFundInformationInput)

    // Chapter 2.
    // 1. 벽체
    var totalWallCashFlow = 0
    var initialCostWall = 0
    if (remodelingTechInput.wall.size.length > 0) {
        for (let i = 0; i < remodelingTechInput.wall.size.length; i++) {
            let wallCashFlows = getAnnualCashFlowsOfWall(remodelingTechInput.wall.name[i], remodelingTechInput.wall.size[i], updatedUserInput, LCCAssumptionInput.analysisPeriod, remodelingTechInput.wall['material cost'][i])
            initialCostWall += wallCashFlows[0]
            totalWallCashFlow += NPVcalculate(wallCashFlows, LCCAssumptionInput.realInterest, LCCAssumptionInput.analysisPeriod)
        }
    }
    // 2. 지붕
    var totalRoofCashFlow = 0
    var initialCostRoof = 0
    if (remodelingTechInput.roof.size.length > 0) {
        for (let i = 0; i < remodelingTechInput.roof.size.length; i++) {
            let roofCashFlows = getAnnualCashFlowsOfRoof(remodelingTechInput.roof.name[i], remodelingTechInput.roof.size[i], updatedUserInput, LCCAssumptionInput.analysisPeriod, remodelingTechInput.roof['material cost'][i])
            initialCostRoof += roofCashFlows[0]
            totalRoofCashFlow += NPVcalculate(roofCashFlows, LCCAssumptionInput.realInterest, LCCAssumptionInput.analysisPeriod)
        }
    }
    // 3. 바닥
    var totalFloorCashFlow = 0
    var initialCostFloor = 0
    if (remodelingTechInput.floor.size.length > 0) {
        for (let i = 0; i < remodelingTechInput.floor.size.length; i++) {
            let floorCashFlows = getAnnualCashFlowsOfFloor(remodelingTechInput.floor.name[i], remodelingTechInput.floor.size[i], updatedUserInput, LCCAssumptionInput.analysisPeriod, remodelingTechInput.floor['material cost'][i])
            initialCostFloor += floorCashFlows[0]
            totalFloorCashFlow += NPVcalculate(floorCashFlows, LCCAssumptionInput.realInterest, LCCAssumptionInput.analysisPeriod)
        }
    }
    // 4. 창문
    var totalWindowCashFlow = 0
    var initialCostWindow = 0
    if (remodelingTechInput.window.size.length > 0) {
        for (let i = 0; i < remodelingTechInput.window.size.length; i++) {
            let windowCashFlows = getAnnualCashFlowsOfWindow(remodelingTechInput.window.name[i], remodelingTechInput.window.size[i], updatedUserInput, LCCAssumptionInput.analysisPeriod, remodelingTechInput.window['material cost'][i])
            initialCostWindow += windowCashFlows[0]
            totalWindowCashFlow += NPVcalculate(windowCashFlows, LCCAssumptionInput.realInterest, LCCAssumptionInput.analysisPeriod)
        }
    }
    // 5. 조명
    var totalLightCashFlow = 0
    var initialCostLight = 0
    if (remodelingTechInput.light.size.length > 0) {
        for (let i = 0; i < remodelingTechInput.light.size.length; i++) {
            let lightCashFlows = getAnnualCashFlowsOfLight(remodelingTechInput.light.size[i], LCCAssumptionInput.analysisPeriod)
            initialCostLight += lightCashFlows[0]
            totalLightCashFlow += NPVcalculate(lightCashFlows, LCCAssumptionInput.realInterest, LCCAssumptionInput.analysisPeriod)
        }
    }
    // 6. 내부차장
    var totalInteriorBlindCashFlow = 0
    var initialCostInteriorBlind = 0
    if (remodelingTechInput.interiorBlind.size.length > 0) {
        for (let i = 0; i < remodelingTechInput.interiorBlind.size.length; i++) {
            let interiorBlindCashFlows = getAnnualCashFlowsOfInteriorBlind(remodelingTechInput.interiorBlind.name[i], remodelingTechInput.interiorBlind.size[i], LCCAssumptionInput.analysisPeriod, remodelingTechInput.interiorBlind['material cost'][i])
            initialCostInteriorBlind += interiorBlindCashFlows[0]
            totalInteriorBlindCashFlow += NPVcalculate(interiorBlindCashFlows, LCCAssumptionInput.realInterest, LCCAssumptionInput.analysisPeriod)
        }
    }
    //7. 외부차양
    var totalExteriorBlindCashFlow = 0
    var initialCostExteriorBlind = 0
    if (remodelingTechInput.exteriorBlind.size.length > 0) {
        for (let i = 0; i < remodelingTechInput.exteriorBlind.size.length; i++) {
            let exteriorBlindCashFlows = getAnnualCashFlowsOfExteriorBlind(remodelingTechInput.exteriorBlind.name[i], remodelingTechInput.exteriorBlind.size[i], LCCAssumptionInput.analysisPeriod)
            initialCostExteriorBlind += exteriorBlindCashFlows[0]
            totalExteriorBlindCashFlow += NPVcalculate(exteriorBlindCashFlows, LCCAssumptionInput.realInterest, LCCAssumptionInput.analysisPeriod)
        }
    }
    // 8. 태양광
    var totalRenewableCashFlow = 0
    var initialCostRenewable = 0
    if (remodelingTechInput.renewable.size.length > 0) {
        for (let i = 0; i < remodelingTechInput.renewable.size.length; i++) {
            let renewableCashFlows = getAnnualCashFlowsOfRenewable(remodelingTechInput.renewable.name[i], remodelingTechInput.renewable.size[i], LCCAssumptionInput.analysisPeriod)
            initialCostRenewable += renewableCashFlows[0]
            totalRenewableCashFlow += NPVcalculate(renewableCashFlows, LCCAssumptionInput.realInterest, LCCAssumptionInput.analysisPeriod)
        }
    }
    // 9. 출입문
    var totalDoorCashFlow = 0
    var initialCostDoor = 0
    if (remodelingTechInput.door.size.length > 0) {
        for (let i = 0; i < remodelingTechInput.door.size.length; i++) {
            let doorCashFlows = getAnnualCashFlowsOfDoor(remodelingTechInput.door.name[i], remodelingTechInput.door.size[i], LCCAssumptionInput.analysisPeriod, remodelingTechInput.door['material cost'][i])
            initialCostDoor += doorCashFlows[0]
            totalDoorCashFlow += NPVcalculate(doorCashFlows, LCCAssumptionInput.realInterest, LCCAssumptionInput.analysisPeriod)
        }
    }
    // 10. 냉동기
    var totalFreezerCashFlow = 0
    var initialCostFreezer = 0
    if (remodelingTechInput.freezer.size.length > 0) {
        for (let i = 0; i < remodelingTechInput.freezer.size.length; i++) {
            let freezerCashFlows = getAnnualCashFlowsOfFreezer(remodelingTechInput.freezer.size[i], LCCAssumptionInput.analysisPeriod)
            initialCostFreezer += freezerCashFlows[0]
            totalFreezerCashFlow += NPVcalculate(freezerCashFlows, LCCAssumptionInput.realInterest, LCCAssumptionInput.analysisPeriod)
        }
    }
    // 11. 보일러
    var totalBoilerCashFlow = 0
    var initialCostBoiler = 0
    if (remodelingTechInput.boiler.size.length > 0) {
        for (let i = 0; i < remodelingTechInput.boiler.size.length; i++) {
            let boilerCashFlows = getAnnualCashFlowsOfBoiler(remodelingTechInput.boiler.name[i], remodelingTechInput.boiler.size[i], LCCAssumptionInput.analysisPeriod, remodelingTechInput.boiler['material cost'][i])
            initialCostBoiler += boilerCashFlows[0]
            totalBoilerCashFlow += NPVcalculate(boilerCashFlows, LCCAssumptionInput.realInterest, LCCAssumptionInput.analysisPeriod)
        }
    }
    // 12. 공조기
    var totalAHUCashFlow = 0
    var initialCostAHU = 0
    if (remodelingTechInput.AHU.size.length > 0) {
        for (let i = 0; i < remodelingTechInput.AHU.size.length; i++) {
            let AHUCashFlows = getAnnualCashFlowsOfAHU(remodelingTechInput.AHU.size[i], LCCAssumptionInput.analysisPeriod, remodelingTechInput.AHU['material cost'][i])
            initialCostAHU += AHUCashFlows[0]
            totalAHUCashFlow += NPVcalculate(AHUCashFlows, LCCAssumptionInput.realInterest, LCCAssumptionInput.analysisPeriod)
        }
    }
    // 13. 히트펌프
    var totalHeatpumpCashFlow = 0
    var initialCostHeatpump = 0
    if (remodelingTechInput.heatpump.size.length > 0) {
        for (let i = 0; i < remodelingTechInput.heatpump.size.length; i++) {
            let heatpumpCashFlows = getAnnualCashFlowsOfHeatpump(remodelingTechInput.heatpump.size[i], LCCAssumptionInput.analysisPeriod, remodelingTechInput.heatpump['material cost'][i])
            initialCostHeatpump += heatpumpCashFlows[0]
            totalHeatpumpCashFlow += NPVcalculate(heatpumpCashFlows, LCCAssumptionInput.realInterest, LCCAssumptionInput.analysisPeriod)
        }
    }

    var techNPV = totalWallCashFlow + totalRoofCashFlow + totalFloorCashFlow + totalWindowCashFlow + totalLightCashFlow +
        totalInteriorBlindCashFlow + totalExteriorBlindCashFlow + totalRenewableCashFlow + totalDoorCashFlow + totalFreezerCashFlow +
        totalBoilerCashFlow + totalAHUCashFlow + totalHeatpumpCashFlow

    var totalInitialCost = initialCostWall + initialCostRoof + initialCostFloor + initialCostWindow + initialCostLight +
        initialCostInteriorBlind + initialCostExteriorBlind + initialCostRenewable + initialCostDoor + initialCostFreezer +
        initialCostBoiler + initialCostAHU + initialCostHeatpump

    // calculate electricity and gas cost
    var EPRICE_BEFORE = electricityCostCalculate(monthlyElectricityInput.before, updatedUserInput, energyContract)
    var EPRICE_AFTER = electricityCostCalculate(monthlyElectricityInput.after, updatedUserInput, energyContract)
    var electricityNPV = NPVcalculate(EPRICE_BEFORE - EPRICE_AFTER, LCCAssumptionInput.electricityRealInterest, LCCAssumptionInput.analysisPeriod)

    var GPRICE_BEFORE = gasCostCalculate(monthlyGasInput.before, updatedUserInput)
    var GPRICE_AFTER = gasCostCalculate(monthlyGasInput.after, updatedUserInput)
    var gasNPV = NPVcalculate(GPRICE_BEFORE - GPRICE_AFTER, LCCAssumptionInput.gasRealInterest, LCCAssumptionInput.analysisPeriod)

    // round the output 1000 KRW
    totalWallCashFlow = Math.round(totalWallCashFlow / 1000) * 1000
    totalRoofCashFlow = Math.round(totalRoofCashFlow / 1000) * 1000
    totalFloorCashFlow = Math.round(totalFloorCashFlow / 1000) * 1000
    totalWindowCashFlow = Math.round(totalWindowCashFlow / 1000) * 1000
    totalLightCashFlow = Math.round(totalLightCashFlow / 1000) * 1000
    totalInteriorBlindCashFlow = Math.round(totalInteriorBlindCashFlow / 1000) * 1000
    totalExteriorBlindCashFlow = Math.round(totalExteriorBlindCashFlow / 1000) * 1000
    totalRenewableCashFlow = Math.round(totalRenewableCashFlow / 1000) * 1000
    totalDoorCashFlow = Math.round(totalDoorCashFlow / 1000) * 1000
    totalFreezerCashFlow = Math.round(totalFreezerCashFlow / 1000) * 1000
    totalBoilerCashFlow = Math.round(totalBoilerCashFlow / 1000) * 1000
    totalAHUCashFlow = Math.round(totalAHUCashFlow / 1000) * 1000
    totalHeatpumpCashFlow = Math.round(totalHeatpumpCashFlow / 1000) * 1000

    initialCostWall = Math.round(initialCostWall / 1000) * 1000
    initialCostRoof = Math.round(initialCostRoof / 1000) * 1000
    initialCostFloor = Math.round(initialCostFloor / 1000) * 1000
    initialCostWindow = Math.round(initialCostWindow / 1000) * 1000
    initialCostLight = Math.round(initialCostLight / 1000) * 1000
    initialCostInteriorBlind = Math.round(initialCostInteriorBlind / 1000) * 1000
    initialCostExteriorBlind = Math.round(initialCostExteriorBlind / 1000) * 1000
    initialCostRenewable = Math.round(initialCostRenewable / 1000) * 1000
    initialCostDoor = Math.round(initialCostDoor / 1000) * 1000
    initialCostFreezer = Math.round(initialCostFreezer / 1000) * 1000
    initialCostBoiler = Math.round(initialCostBoiler / 1000) * 1000
    initialCostAHU = Math.round(initialCostAHU / 1000) * 1000
    initialCostHeatpump = Math.round(initialCostHeatpump / 1000) * 1000

    totalInitialCost = Math.round(totalInitialCost / 1000) * 1000
    techNPV = Math.round(techNPV / 1000) * 1000

    electricityNPV = Math.round(electricityNPV / 1000) * 1000
    gasNPV = Math.round(gasNPV / 1000) * 1000

    // Chapter 2.

    let B1_OBJ = new greenRemodelingInterestSupportProject(
        userInput.buildingType, detailedFundInformationInput.mortageLoanInterest, 
        detailedFundInformationInput.creditLoanInterest, userInput.card, LCCAssumptionInput.realInterest, true)
    let B2_OBJ = new seoulHomeRepairLoanProject(
        userInput.buildingType, detailedFundInformationInput.mortageLoanInterest, 
        detailedFundInformationInput.creditLoanInterest, userInput.approvalYear, LCCAssumptionInput.realInterest, true)
    let B3_OBJ = new ruralHousingImrpoveProject(
        LCCAssumptionInput.realInterest, true)
    let B4_OBJ = new mortageLoanProject(
        detailedFundInformationInput.mortageLoanMaxLimit, detailedFundInformationInput.mortageLoanInterest, 
        detailedFundInformationInput.mortageLoanRepaymentMonth, detailedFundInformationInput.mortageLoanHoldMonth, 
        LCCAssumptionInput.realInterest, true)
    let B5_OBJ = new creditLoanProject(
        detailedFundInformationInput.creditLoanMaxLimit, detailedFundInformationInput.creditLoanInterest, 
        detailedFundInformationInput.creditLoanRepaymentMonth, detailedFundInformationInput.creditLoanHoldMonth, 
        LCCAssumptionInput.realInterest, true)

    // Chapter 3.
    function buisnessNPVcalculate(buisness) {
        var yearPayments = loanCalculate(buisness.loanAmount, buisness.interestRatio, buisness.interestSupportRatio, buisness.repaymentPeriod, buisness.holdPeriod)
        var npv = NPVcalculate(yearPayments, buisness.realInterest)
        return npv
    }
    // NPV 계산
    let B1_NPV = buisnessNPVcalculate(B1_OBJ)
    let B2_NPV = buisnessNPVcalculate(B2_OBJ)
    let B3_NPV = buisnessNPVcalculate(B3_OBJ)
    let B4_NPV = buisnessNPVcalculate(B4_OBJ)
    let B5_NPV = buisnessNPVcalculate(B5_OBJ)
    let businessNPV = B1_NPV + B2_NPV + B3_NPV + B4_NPV + B5_NPV

    // 대출 금액
    let _B1 = customizedRatio.ratioGreen   * totalInitialCost
    let _B2 = customizedRatio.ratioSeoul   * totalInitialCost
    let _B3 = customizedRatio.ratioRural   * totalInitialCost
    let _B4 = customizedRatio.ratioMortage * totalInitialCost
    let _B5 = customizedRatio.ratioCredit  * totalInitialCost
    let _B6 = detailedFundInformationInput.initialUserCapital

    // 대출 금액 비율
    const B1_result = _B1 / (_B1 + _B2 + _B3 + _B4 + _B5 + _B6)
    const B2_result = _B2 / (_B1 + _B2 + _B3 + _B4 + _B5 + _B6)
    const B3_result = _B3 / (_B1 + _B2 + _B3 + _B4 + _B5 + _B6)
    const B4_result = _B4 / (_B1 + _B2 + _B3 + _B4 + _B5 + _B6)
    const B5_result = _B5 / (_B1 + _B2 + _B3 + _B4 + _B5 + _B6)
    const B6_result = _B6 / (_B1 + _B2 + _B3 + _B4 + _B5 + _B6)

    // 분석 결과
    const ICC = totalInitialCost
    const NPV = -(techNPV + businessNPV - ICC) + (electricityNPV + gasNPV)
    const SIR = (electricityNPV + gasNPV) / (techNPV + businessNPV - ICC)
    const TR  = -businessNPV
    const ECR = (electricityNPV + gasNPV)

    // 결과
    const optimizeResults = {
        "greenRemodelingInterestSupportProjectResult": Math.round(_B1 / 1000) * 1000,
        "seoulHomeRepairLoanProjectResult": Math.round(_B2 / 1000) * 1000,
        "ruralHousingImrpoveProjectResult": Math.round(_B3 / 1000) * 1000,
        "mortageLoanProjectResult": Math.round(_B4 / 1000) * 1000,
        "creditLoanProjectResult": Math.round(_B5 / 1000) * 1000,
        "NPV": Math.round(businessNPV / 1000) * 1000,
        "excessCost": 0
    }

    return {
        optimizeResults, B1_result, B2_result, B3_result, B4_result, B5_result, B6_result,
        ICC, NPV, SIR, TR, ECR,
        initialCostWall, initialCostRoof, initialCostFloor, initialCostWindow,
        initialCostLight, initialCostInteriorBlind, initialCostExteriorBlind,
        initialCostRenewable, initialCostDoor, initialCostFreezer, initialCostBoiler, initialCostAHU, initialCostHeatpump
    }
}

export { getOutput, getCustomOutput }