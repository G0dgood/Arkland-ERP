/* eslint-disable jsx-a11y/anchor-is-valid */
// The grid of days, renders a month's worth of days and

import { Fragment } from "react";

// also populates the events on the relevant dates
const Grid = ({
	date,
	events,
	setViewingEvent,
	setShowingEventForm,
	actualDate,
	toStartOfDay,
	findEventsForDate,
	MiniEvent
}: any) => {
	const ROWS_COUNT = 6;
	const currentDate = toStartOfDay(new Date());

	// Finds the closest Monday relative to the first day of
	// the target month/year combination
	// Then increment upon this day until we have a full set
	// of date objects to work with
	const startingDate = new Date(date.getFullYear(), date.getMonth(), 1);
	startingDate.setDate(startingDate.getDate() - (startingDate.getDay() - 1));

	const dates = [];
	for (let i = 0; i < ROWS_COUNT * 7; i++) {
		const date = new Date(startingDate);
		dates.push({ date, events: findEventsForDate(events, date) });
		startingDate.setDate(startingDate.getDate() + 1);
	}

	return (
		<Fragment>
			{dates.map((date, index) => {
				return (
					<div
						key={index}
						className={`cell ${date.date.getTime() === currentDate.getTime() ? "current" : ""
							} ${date.date.getMonth() !== actualDate.getMonth() ? "otherMonth" : ""
							}`}>
						<div className="date">
							{date.date.getDate()}
							{/* <a
								// eslint-disable-next-line no-script-url
								href="javascript:;"
								className="addEventOnDay"
								onClick={() =>
									setShowingEventForm({
										visible: true,
										preselectedDate: date.date,
									})
								}>
								+
							</a> */}
						</div>
						{date.events.map((event: any, index: React.Key | null | undefined) => (
							<MiniEvent
								key={index}
								event={event}
								setViewingEvent={setViewingEvent}
							/>
						))}
					</div>
				);
			})}
		</Fragment>
	);
};


export { Grid };