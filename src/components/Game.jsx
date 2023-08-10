import PropTypes from 'prop-types';
import CharacterCard from './CharacterCard';

const Game = ({ score, bestScore, characters, handleCardClick }) => {
	return (
		<div>
			<div className="flex justify-center items-center gap-4 mt-4 text-xl font-semibold">
				<div>Score: {score}</div>
				<div>Best Score: {bestScore}</div>
			</div>
			<div className="flex gap-10 min-w-full flex-wrap justify-center items-center p-10">
				{characters &&
					characters.map(({ id, name, image }) => (
						<CharacterCard
							key={id}
							id={id}
							image={image}
							name={
								name.split(',').length > 1
									? `${name.split(',')[1]} ${name.split(',')[0]}`
									: name
							}
							handleClick={handleCardClick}
						/>
					))}
			</div>
		</div>
	);
};

Game.propTypes = {
	score: PropTypes.number.isRequired,
	bestScore: PropTypes.number.isRequired,
	characters: PropTypes.array,
	handleCardClick: PropTypes.func,
};

export default Game;
