


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
	{
		id: 1,
		name: "Holiday",
		dateFrom: "2023-07-29T12:00",
		dateTo: "2023-08-03T08:45",
		meta: SAMPLE_META,
		type: "Holiday",
	},
	{
		id: 2,
		name: "Meeting",
		dateFrom: "2023-10-01T09:45",
		dateTo: "2023-10-04T22:00",
		meta: SAMPLE_META,
		type: "Standard",
	},
	{
		id: 3,
		name: "Away",
		dateFrom: "2023-10-01T01:00",
		dateTo: "2023-10-01T23:59",
		meta: SAMPLE_META,
		type: "Busy",
	},
	{
		id: 4,
		name: "Inspection",
		dateFrom: "2023-10-19T07:30",
		dateTo: "2023-10-21T23:59",
		meta: SAMPLE_META,
		type: "Standard",
	},
	{
		id: 5,
		name: "Holiday - Greece",
		dateFrom: "2023-10-14T08:00",
		dateTo: "2023-10-16T23:59",
		meta: SAMPLE_META,
		type: "Holiday",
	},
	{
		id: 6,
		name: "Holiday - Spain",
		dateFrom: "2023-10-29T08:00",
		dateTo: "2023-10-31T23:59",
		meta: SAMPLE_META,
		type: "Holiday",
	},
]

const DAYS_SHORT = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export { MONTHS, SAMPLE_META, preloadedEvents, DAYS_SHORT };