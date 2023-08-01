import { Fragment } from "react";



const SAMPLE_META =
	"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";



// Utilities/helpers
const MONTHS = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

const preloadedEvents = [
	// {
	// 	id: 1,
	// 	name: "Holiday",
	// 	dateFrom: "2023-07-29T12:00",
	// 	dateTo: "2023-08-03T08:45",
	// 	meta: SAMPLE_META,
	// 	type: "Holiday",
	// },
	// {
	// 	id: 2,
	// 	name: "Meeting",
	// 	dateFrom: "2023-10-01T09:45",
	// 	dateTo: "2023-10-04T22:00",
	// 	meta: SAMPLE_META,
	// 	type: "Standard",
	// },
	// {
	// 	id: 3,
	// 	name: "Away",
	// 	dateFrom: "2023-10-01T01:00",
	// 	dateTo: "2023-10-01T23:59",
	// 	meta: SAMPLE_META,
	// 	type: "Busy",
	// },
	// {
	// 	id: 4,
	// 	name: "Inspection",
	// 	dateFrom: "2023-10-19T07:30",
	// 	dateTo: "2023-10-21T23:59",
	// 	meta: SAMPLE_META,
	// 	type: "Standard",
	// },
	// {
	// 	id: 5,
	// 	name: "Holiday - Greece",
	// 	dateFrom: "2023-10-14T08:00",
	// 	dateTo: "2023-10-16T23:59",
	// 	meta: SAMPLE_META,
	// 	type: "Holiday",
	// },
	// {
	// 	id: 6,
	// 	name: "Holiday - Spain",
	// 	dateFrom: "2023-10-29T08:00",
	// 	dateTo: "2023-10-31T23:59",
	// 	meta: SAMPLE_META,
	// 	type: "Holiday",
	// },
	// {
	// 	id: 7,
	// 	name: "New Year's Day",
	// 	dateFrom: "2023-01-01",
	// 	type: "Holiday",
	// },
	// {
	// 	id: 8,
	// 	name: "Good Friday",
	// 	dateFrom: "2023-04-10",
	// 	type: "Holiday",
	// },
	// {
	// 	id: 9,
	// 	name: "Easter Monday",
	// 	dateFrom: "2023-04-13",
	// 	type: "Holiday",
	// },
	// {
	// 	id: 10,
	// 	name: "Workers' Day (Labour Day)",
	// 	dateFrom: "2023-05-01",
	// 	type: "Holiday",
	// },
	// {
	// 	id: 11,
	// 	name: "Democracy Day",
	// 	dateFrom: "2023-06-12",
	// 	type: "Holiday",
	// },
	// {
	// 	id: 12,
	// 	name: "Eid al-Fitr (End of Ramadan)",
	// 	dateFrom: "2023-05-24",
	// 	type: "Holiday",
	// },
	// {
	// 	id: 13,
	// 	name: "Eid al-Adha (Festival of Sacrifice)",
	// 	dateFrom: "2023-07-31",
	// 	type: "Holiday",
	// },
	// {
	// 	id: 14,
	// 	name: "Independence Day",
	// 	dateFrom: "2023-10-01",
	// 	type: "Holiday",
	// },
	// {
	// 	id: 15,
	// 	name: "Id el Maulud (Birth of the Prophet)",
	// 	dateFrom: "2023-10-29",
	// 	type: "Holiday",
	// },
	// {
	// 	id: 16,
	// 	name: "Christmas Day",
	// 	dateFrom: "2023-12-25",
	// 	type: "Holiday",
	// },
	// {
	// 	id: 17,
	// 	name: "Boxing Day",
	// 	dateFrom: "2023-12-26",
	// 	type: "Holiday",
	// },


	// id: 15,{
	// 	name: "New Year's Day",
	// 	dateFrom: "2023-01-01",
	// 	dateTo: "2023-01-01",
	// 	meta: "Celebrates the beginning of the new year."
	// },
	{
		id: 1,
		name: "Good Friday",
		dateFrom: "2023-04-10",
		dateTo: "2023-04-10",
		meta: "Commemorates the crucifixion of Jesus Christ.",
		type: "Holiday",
	},
	{
		id: 2,
		name: "Easter Monday",
		dateFrom: "2023-04-13",
		dateTo: "2023-04-13",
		meta: "Celebrates the resurrection of Jesus Christ.",
		type: "Holiday",
	},
	{
		id: 3,
		name: "Workers' Day (Labour Day)",
		dateFrom: "2023-05-01",
		dateTo: "2023-05-01",
		meta: "Honors workers and laborers' contributions.",
		type: "Holiday",
	},
	{
		id: 10,
		name: "Democracy Day",
		dateFrom: "2023-06-12",
		dateTo: "2023-06-12",
		meta: "Celebrates Nigeria's return to democratic rule in 1999.",
		type: "Holiday",
	},
	{
		id: 4,
		name: "Eid al-Fitr (End of Ramadan)",
		dateFrom: "2023-05-24",
		dateTo: "2023-05-24",
		meta: "Marks the end of Ramadan, the Islamic holy month of fasting.",
		type: "Holiday",
	},
	{
		id: 5,
		name: "Eid al-Adha (Festival of Sacrifice)",
		dateFrom: "2023-07-31",
		dateTo: "2023-07-31",
		meta: "Commemorates Ibrahim's willingness to sacrifice his son as an act of obedience to God.",
		type: "Holiday",
	},
	{
		id: 6,
		name: "Independence Day",
		dateFrom: "2023-10-01",
		dateTo: "2023-10-01",
		meta: "Marks Nigeria's independence from British colonial rule in 1960.",
		type: "Holiday",
	},
	{
		id: 7,
		name: "Id el Maulud (Birth of the Prophet)",
		dateFrom: "2023-10-29",
		dateTo: "2023-10-29",
		meta: "Celebrates the birth of Prophet Muhammad.",
		type: "Holiday",
	},
	{
		id: 8,
		name: "Christmas Day",
		dateFrom: "2023-12-25",
		dateTo: "2023-12-25",
		meta: "Commemorates the birth of Jesus Christ.",
		type: "Holiday",
	},
	{
		id: 9,
		name: "Boxing Day",
		dateFrom: "2023-12-26",
		dateTo: "2023-12-26",
		meta: "Traditionally observed as a day of giving to the less fortunate.",
		type: "Holiday",
	}
]

const DAYS_SHORT = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];


// Generic component - a nicely animated loading spinner
const Loader = () => {
	return (
		<Fragment>
			<div className="overlay" />
			<div className="loader">
				<div className="lds-roller">
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
			</div>
		</Fragment>
	);
};

export { MONTHS, SAMPLE_META, preloadedEvents, DAYS_SHORT, Loader };