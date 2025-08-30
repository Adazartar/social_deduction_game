import { useState } from 'react';
import './App.css';

// DEPLOY WITH npm run deploy


function App() {
  // States for the game's core data and UI
  const [users, setUsers] = useState([]);
  const [inputName, setInputName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState('');
  const [assignedWords, setAssignedWords] = useState({}); // New state to hold assigned words

  // Sample words for each category
  const wordLists = {
    'Easy': ['Apple', 'Ball', 'Cat', 'Dog', 'Elephant', 'Fish', 'Grape', 'Hat', 'Ice', 'Jacket', 'Kite', 'Lion', 'Monkey', 'Noodle', 'Orange', 'Pencil', 'Quilt', 'Rabbit', 'Sun', 'Tiger', 'Umbrella', 'Violin', 'Window', 'Xylophone', 'Yacht', 'Zebra', 'Bicycle', 'Car', 'Door', 'Engine', 'Flower', 'Garden', 'House', 'Island', 'Juice', 'Key', 'Lemon', 'Mountain', 'Night', 'Ocean', 'Planet', 'Queen', 'River', 'Shoe', 'Tractor', 'Uniform', 'Van', 'Water', 'Yard', 'Zoo', 'Airplane', 'Box', 'Cloud', 'Drum', 'Egg', 'Forest', 'Guitar', 'Hammer', 'Ink', 'Jelly', 'Kangaroo', 'Lamp', 'Magnet', 'Nest', 'Octopus', 'Paper', 'Road', 'Soap', 'Table', 'Tree', 'Vase', 'Wagon', 'Yogurt', 'Ant', 'Boat', 'Chair', 'Desk', 'Earth', 'Fire', 'Glove', 'Heater', 'Igloo', 'Jar', 'Knife', 'Leaf', 'Moon', 'Net', 'Oil', 'Pillow', 'Rock', 'Spoon', 'Train', 'Vest', 'Watch', 'Yarn', 'Acorn', 'Bubble', 'Candle', 'Dice'],
    'Hard': ['Chemistry', 'Physics', 'Biology', 'Astronomy', 'Geology', 'Action', 'Comedy', 'Horror', 'Thriller', 'Animation', 'Monarchy', 'Empire', 'War', 'Revolution', 'Civilization', 'Algorithm', 'Variables', 'Function', 'Database', 'Frontend', 'Backend', 'Server', 'Framework', 'Library', 'Deployment', 'Debugging', 'Syntax', 'Compiler', 'Microphone', 'Software', 'Hardware', 'Processor', 'Memory', 'Photosynthesis', 'Gravity', 'Genetics', 'Ecosystem', 'Molecule', 'Magnetism', 'Dynasty', 'Medieval', 'Renaissance', 'Feudalism', 'Colonialism', 'Slavery', 'Treaty', 'Tribe', 'Artifact', 'Mythology', 'Philosophy', 'Archaeology', 'Gladiator', 'Pyramid', 'Mummy', 'Director', 'Script', 'Sequel', 'Prequel', 'Cast', 'Genre', 'Soundtrack', 'Dialogue', 'Plot', 'Villain', 'Protagonist', 'Drama', 'Mystery', 'Hypothesis', 'Statistics', 'Experiment', 'Thermodynamics', 'Biochemistry', 'Neuroscience', 'Psychology', 'Sociology', 'Anthropology', 'Chronology', 'Stratigraphy'],
  };

  const categories = Object.keys(wordLists);

  const handleAddUser = () => {
    if (inputName.trim() !== '') {
      setUsers([...users, inputName]);
      setInputName('');
    }
  };

  const handleDeleteUser = (indexToDelete) => {
    const updatedUsers = users.filter((user, index) => index !== indexToDelete);
    setUsers(updatedUsers);
  };

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
  };

  const handleStartGame = () => {
    if (users.length < 3) {
      alert("You need at least 3 users to start the game.");
      return;
    }
    if (!selectedCategory) {
      alert("Please select a category.");
      return;
    }

    const newAssignedWords = {};
    const spyIndex = Math.floor(Math.random() * users.length);
    const wordList = wordLists[selectedCategory];
    const randomWord = wordList[Math.floor(Math.random() * wordList.length)];

    users.forEach((user, index) => {
      if (index === spyIndex) {
        newAssignedWords[user] = '???';
      } else {
        newAssignedWords[user] = randomWord;
      }
    });

    setAssignedWords(newAssignedWords);
    setIsGameStarted(true);
  };

  const handleEndGame = () => {
    let secretWord = '';
    let spyName = '';

    for (const [user, word] of Object.entries(assignedWords)) {
        if (word === '???') {
            spyName = user;
        } else {
            secretWord = word;
        }
    }

    alert(`The game has ended! The secret word was "${secretWord}", and the spy was ${spyName}.`);
    
    setIsGameStarted(false);
    setAssignedWords({});
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setIsPopupVisible(true);
  };

  return (
    <>
      <h1>Game</h1>
      <div className='user-list'>
        {users.map((user, index) => (
          <div 
            key={user} 
            className={`user-container ${isGameStarted ? 'in-game' : ''}`}
            onClick={isGameStarted ? () => handleUserClick(user) : null}
          >
            <h2>{user}</h2>
            {!isGameStarted && (
              <button onClick={(e) => { e.stopPropagation(); handleDeleteUser(index); }}>Delete</button>
            )}
          </div>
        ))}
      </div>

      {!isGameStarted && (
        <>
          <input
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
          />
          <button onClick={handleAddUser}>Add User</button>
          <br></br>
          
          <h2>Select Category: </h2>
          <div className="category-container">
            {categories.map((category) => (
              <button
                key={category}
                className={`category-button ${selectedCategory === category ? 'selected' : ''}`}
                onClick={() => handleSelectCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </>
      )}

      <button 
        onClick={isGameStarted ? handleEndGame : handleStartGame}
        disabled={!isGameStarted && (users.length < 2 || !selectedCategory)}
      >
        {isGameStarted ? 'END GAME' : 'START GAME'}
      </button>

      {isPopupVisible && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>{selectedUser}</h3>
            <h3>The word is:</h3>
            <p>{assignedWords[selectedUser]}</p>
            <button onClick={() => setIsPopupVisible(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;