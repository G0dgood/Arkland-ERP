import { Button } from "@material-ui/core";
import { MdOutlineClose } from "react-icons/md";



const ModalHeader = ({ setLgShow, icon, title, subtitle }: any) => {

	return (
		<div className='modal-handle-header'>
			<div className='modal-handle-sub'>
				<div className='modal-handle-sub-title'>
					{icon}</div>
				<div  >
					<h3 className="span-center-title">{title}</h3>
					<p className='span-center-title-sup'>{subtitle}</p>
				</div>

			</div>
			<Button onClick={() => setLgShow(false)} className='modal-handle-sub-button'>
				<MdOutlineClose size={28} />
			</Button>
		</div>
	);
};
export {
	ModalHeader,
};
