import PropTypes from 'prop-types';

const CharacterCard = ({ name, image, handleClick, id }) => {
	return (
		<div>
			<div
				className="cursor-pointer p-2 bg-white hover:scale-105 transition-all w-40 h-54"
				onClick={() => {
					handleClick(id);
				}}
			>
				<img src={image} alt="" />
				<div className="text-center mt-2 text-black truncate">{name}</div>
			</div>
		</div>
	);
};

CharacterCard.propTypes = {
	name: PropTypes.string.isRequired,
	image: PropTypes.string.isRequired,
	handleClick: PropTypes.func.isRequired,
	id: PropTypes.number.isRequired,
};

export default CharacterCard;
