import { useEffect, useState } from 'react';

const App = () => {
	const [characters, setCharacters] = useState('');
	const [selected, setSelected] = useState([]);
	const [bestScore, setBestScore] = useState(0);

	useEffect(() => {
		const fetchData = async () => {
			let response = await fetch(
				'https://api.jikan.moe/v4/anime/16498/characters'
			);
			response = await response.json();
			setCharacters(response.data.splice(0, 10));
		};
		fetchData();
	}, []);

	const handleClick = (id) => {
		if (!selected.includes(id)) {
			setSelected([...selected, id]);
		} else {
			if (bestScore < selected.length) {
				setBestScore(selected.length);
			}
			setSelected([]);
		}
		shuffleCharacters();
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
		<div>
			<div>Score: {selected.length}</div>
			<div>Best Score: {bestScore}</div>
			<div className="flex">
				{characters &&
					characters.map(({ character }) => (
						<div
							className="cursor-pointer"
							key={character.mal_id}
							onClick={() => {
								handleClick(character.mal_id);
							}}
						>
							<img src={character.images.webp.image_url} alt="" />
							<div>
								{character.name.split(',').length > 1
									? `${character.name.split(',')[1]} ${
											character.name.split(',')[0]
									  }`
									: character.name}
							</div>
						</div>
					))}
			</div>
		</div>
	);
};

export default App;
