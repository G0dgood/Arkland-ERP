export const gradeSystem = [
	{ rate: 5, definition: "Outstanding" },
	{ rate: 4, definition: "Very Good" },
	{ rate: 3, definition: "Good" },
	{ rate: 2, definition: "Average" },
	{ rate: 1, definition: "Below Average/Poor" },
]


export const customStyles = {
	control: (provided: any, state: any) => ({
		...provided,
		width: "240px", // Set the width to 240px
		border: "1px solid #990000",
		"&:focus": {
			borderColor: "#990000", // Change the border color to #990000 when focused
			boxShadow: "0 0 5px rgba(153, 0, 0, 0.5)", //
		},
	}),
};

export const options: any = [
	{ value: 1, label: " Special Allowances" },
	{ value: 2, label: "Daily Transport Allowance " },
	{ value: 3, label: "Salary Advance " },
	{ value: 4, label: "Pay Suspension" },
	{ value: 5, label: "Overtime" },
	{ value: 6, label: "Fixed Overtime" },
	{ value: 7, label: "Salary Arrears" },
	{ value: 8, label: "Refund" },
	{ value: 9, label: "End Of Year Bonus" },
	{ value: 10, label: "Bonus" },
	{ value: 11, label: "Sponsorship Allowance" },
	{ value: 12, label: "Leave Arrears " },
];
export const options2: any = [
	{ value: 1, label: "Special Deductions" },
	{ value: 2, label: "Salary Advance" },
	{ value: 3, label: "Pay Suspension" },
	{ value: 4, label: "Absenteeism" },
	{ value: 5, label: "Penalty" },
	{ value: 6, label: "Refund To Bank" },
];



