/* eslint-disable jsx-a11y/anchor-is-valid */
// The main event view, opens in a modal and contains all information

import Modals from "./Modals";

// about the event in question
const Event = ({
	event,
	setViewingEvent,
	setShowingEventForm,
	eleteEvent,
	deleteEvent
}: any) => {
	return (
		<Modals
			onClose={() => setViewingEvent(null)}
			title={`${event.name} (${event.type})`}
			className="eventModal">
			<p>
				From <b>{event.dateFrom}</b> to <b>{event.dateTo}</b>
			</p>
			<p>{event.meta}</p>

			{/* <button
				className="button-green"
				// @ts-ignore
				// eslint-disable-next-line no-script-url
				href="javascript:;"
				onClick={() => {
					setViewingEvent(null);
					setShowingEventForm({ visible: true, withEvent: event });
				}}>
				Change this event
			</button>

			<button
				className="button-red"
				// @ts-ignore
				// eslint-disable-next-line no-script-url
				href="javascript:;"
				onClick={() => deleteEvent(event)}>
				Delete this event
			</button> */}

			<a
				className="close"
				// eslint-disable-next-line no-script-url
				href="javascript:;"
				onClick={() => setViewingEvent(null)}>
				Back to calendar
			</a>
		</Modals>
	);
};

export default Event