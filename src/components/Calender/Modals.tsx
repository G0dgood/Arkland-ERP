import { Fragment } from "react";
import { Modal } from "react-bootstrap";

// Generic component - modal to present children within
const Modals = ({ children, onClose, title, className }: any) => {
	return (
		// @ts-ignore
		<Modal show={true} size="md">
			<Fragment>
				<div className="overlay" onClick={onClose} />
				<div className={`modal-calender ${className}`}>
					<h3>{title}</h3>
					<div className="inner">{children}</div>
				</div>
			</Fragment>
		</Modal>
	);
};

export default Modals
