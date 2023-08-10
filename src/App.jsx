import { useEffect, useState } from 'react';
import StartMenu from './components/StartMenu';
import Game from './components/Game';

const App = () => {
	const [characters, setCharacters] = useState([]);
	const [selectedCards, setSelectedCards] = useState([]);
	const [bestScore, setBestScore] = useState(0);
	const [gameStatus, setGameStatus] = useState(1);

	useEffect(() => {
		const fetchData = async () => {
			let response = await fetch(
				'https://api.jikan.moe/v4/anime/16498/characters'
			);
			response = await response.json();

			//Formatting data from api
			let characters = response.data.map(({ character }) => {
				return {
					id: character.mal_id,
					image: character.images.webp.image_url,
					name: character.name,
				};
			});

			//Initializing characters
			initializeCharacters(10, characters);
		};
		fetchData();
	}, []);

	const handleCardClick = (id) => {
		if (!selectedCards.includes(id)) {
			setSelectedCards([...selectedCards, id]);
		} else {
			if (bestScore < selectedCards.length) {
				setBestScore(selectedCards.length);
			}
			setSelectedCards([]);
		}
		shuffleCharacters();
	};

	const initializeCharacters = (num, data) => {
		const random = new Set();
		const randomCharacters = [];
		while (random.size < num) {
			//Remove narrator character
			let generatedRandom = Math.floor(Math.random() * data.length);
			if (generatedRandom !== 47) {
				random.add(generatedRandom);
			}
		}
		random.forEach((index) => {
			randomCharacters.push(data[index]);
		});
		setCharacters(randomCharacters);
	};

	const shuffleCharacters = () => {
		const random = new Set();
		const randomCharacters = [];
		while (random.size < characters.length) {
			random.add(Math.floor(Math.random() * characters.length));
		}
		random.forEach((index) => {
			randomCharacters.push(characters[index]);
		});
		setCharacters(randomCharacters);
	};

	return (
		<div
			className=" text-white min-h-screen"
			style={{
				backgroundImage: 'url(/background.jpg)',
				backgroundPosition: 'center',
				backgroundSize: 'cover',
				backgroundRepeat: 'no-repeat',
				backgroundAttachment: 'fixed',
			}}
		>
			<div className="text-white">
				<h1 className="text-3xl font-semibold text-center pt-10">
					Memory Game
				</h1>
				{gameStatus === 0 ? (
					<StartMenu />
				) : gameStatus === 1 ? (
					<Game
						score={selectedCards.length}
						bestScore={bestScore}
						characters={characters}
						handleCardClick={handleCardClick}
					/>
				) : (
					''
				)}
			</div>
		</div>
	);
};

export default App;
