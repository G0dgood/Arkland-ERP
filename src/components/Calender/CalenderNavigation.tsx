/* eslint-disable jsx-a11y/anchor-is-valid */

import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

// Top bar, contains the month/year combo as well as back/forward links
const Navigation = ({ date, setDate, setShowingEventForm, MONTHS }: any) => {
	return (
		<div className="navigation">
			<div
				className="back"
				onClick={() => {
					const newDate = new Date(date);
					newDate.setMonth(newDate.getMonth() - 1);
					setDate(newDate);
				}}>
				{<MdArrowBackIos size={20} />}{" "}
				{MONTHS[date.getMonth() === 0 ? 11 : date.getMonth() - 1]}
			</div>

			<div className="monthAndYear">
				{MONTHS[date.getMonth()]} {date.getFullYear()}
				<a
					// eslint-disable-next-line no-script-url
					href="javascript:;"
					onClick={() => setShowingEventForm({ visible: true })}>
					+
				</a>
			</div>

			<div
				className="forward"
				onClick={() => {
					const newDate = new Date(date);
					newDate.setMonth(newDate.getMonth() + 1);
					setDate(newDate);
				}}>
				{MONTHS[date.getMonth() === 11 ? 0 : date.getMonth() + 1]}{" "}
				{<MdArrowForwardIos size={20} />}
			</div>
		</div>
	);
};

export { Navigation };