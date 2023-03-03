
export function loanCalculate(loanAmount, interestRatio, interestSupportRatio, repaymentPeriod, holdPeriod) {
	
	if (interestRatio > interestSupportRatio) {
		var interest = interestRatio - interestSupportRatio
	} else {
		var interest = 0
		var yearPayment = 0
		var yearPayments = []
		for (var i = 0; i < repaymentPeriod; i++){
			var monthPayment = loanAmount/repaymentPeriod
			yearPayment += monthPayment
			if (i == 0) { continue }
			if (i % 12 == 11 ) { 
				yearPayments.push(yearPayment)
				yearPayment = 0 
			}
		}
		return yearPayments
	}

	var yearPayment  = 0
	var yearPayments = []
	var loanRemain = loanAmount
	var interestAmount = 0
	var monthPayment = 0
	for (var i = 0; i < repaymentPeriod; i++) {
		interestAmount = loanRemain * (interest / 12)
		if (holdPeriod > i) {
			monthPayment = interestAmount
		} else {
			monthPayment = loanAmount * (interest / 12) * ((1 + (interest / 12)) ** (repaymentPeriod - holdPeriod)) / ((1 + (interest / 12)) ** (repaymentPeriod - holdPeriod) - 1)
		}
		loanRemain = loanRemain + interestAmount - monthPayment
		yearPayment += monthPayment
		if (i == 0) { continue }
		if (i % 12 == 11 ) { 
			yearPayments.push(yearPayment)
			yearPayment = 0 }
	}
	return yearPayments
}

export function NPVcalculate (yearPayments, realInterest , year){
	if (typeof (yearPayments) == 'number') {
		var NPV = 0
		for (var i = 0; i < year; i++) {
			var presentValue = yearPayments / ((1 + realInterest) ** i)
			NPV += presentValue
		}
		return NPV

	} else {
		var NPV = 0
		for (var i = 0; i < yearPayments.length; i++) {
			var presentValue = yearPayments[i] / ((1 + realInterest) ** i)
			NPV += presentValue
		}
		return NPV
	}
}