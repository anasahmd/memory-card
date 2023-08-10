import PropTypes from 'prop-types';

const Modal = ({ handleModal }) => {
	return (
		<div className="w-screen h-screen">
			<div>
				<p>
					Prepare for the fight ahead! Tap on cards to score points, but
					remember, don't tap the same card twice! Shinzo wo Sasageyo (Dedicate
					your heart)!
				</p>

				<button type="button" onClick={handleModal}>
					Attack!
				</button>
			</div>
		</div>
	);
};

Modal.propTypes = {
	handleModal: PropTypes.func.isRequired,
};

export default Modal;
