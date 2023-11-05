// DrawerComponent.js
import React from 'react';
import MultipleEmployeeApproval from './MultipleEmployeeApproval';


function DrawerComponent({ isOpen, onClose }: any) {
	const drawerClassName = `drawer-container ${isOpen ? 'drawer-open' : ''}`;

	return (
		<div>
			<div className={drawerClassName}>
				<button onClick={onClose} className="close-button">
					&times; {/* Times (close) icon */}
				</button>
				<div className="drawer-content">
					{/* Add your drawer content here */}
					<h2>Drawer Content</h2>
					<MultipleEmployeeApproval />
				</div>
			</div>
		</div>
	);
}

export default DrawerComponent;

