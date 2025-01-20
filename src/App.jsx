import React, { useState } from "react";
import Board from "./components/Board";
import { Link, Navigate, Route, Routes } from "react-router-dom";

const App = () => {
  const [playerDetails, setPlayerDetails] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);

  const addPlayer = () => {
    setPlayerDetails([...playerDetails, { name: "", color: "" }]);
  };

  const handleInputChange = (index, field, value) => {
    const updatedPlayers = [...playerDetails];
    updatedPlayers[index][field] = value;
    setPlayerDetails(updatedPlayers);
  };

  const removePlayer = (index) => {
    const updatedPlayers = playerDetails.filter((_, i) => i !== index);
    setPlayerDetails(updatedPlayers);
  };

  const validate = () => {
    for(let player of playerDetails) {
      if(player.name == "" || player.color == "") return false;
    }
    return true;
  }

  return (
    <div className="px-6 py-6 min-h-screen">
      {gameStarted?<></>:<div className="px-6 py-6">
        <h1 className="text-xl font-bold mb-4">Player Setup</h1>
        <div>
          {playerDetails.map((player, index) => (
            <div key={index} className="flex items-center space-x-4 mb-2">
              <input
                type="text"
                placeholder={`Player ${index + 1} Name`}
                value={player.name}
                onChange={(e) =>
                  handleInputChange(index, "name", e.target.value)
                }
                className="px-2 py-1 border rounded"
              />
              <select
                value={player.color}
                onChange={(e) =>
                  handleInputChange(index, "color", e.target.value)
                }
                className="px-2 py-1 border rounded"
              >
                <option value="">Select Color</option>
                <option value="red">Red</option>
                <option value="blue">Blue</option>
                <option value="green">Green</option>
                <option value="yellow">Yellow</option>
                <option value="purple">Purple</option>
                <option value="pink">Pink</option>
                <option value="indigo">Indigo</option>
                <option value="teal">Teal</option>
                <option value="cyan">Cyan</option>
                <option value="orange">Orange</option>
                <option value="amber">Amber</option>
                <option value="lime">Lime</option>
                <option value="emerald">Emerald</option>
                <option value="fuchsia">Fuchsia</option>
                <option value="rose">Rose</option>
              </select>
              <button
                onClick={() => removePlayer(index)}
                className="text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={addPlayer}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            + Add Player
          </button>
        </div>
        {playerDetails.length > 0 && (
          <div className="mt-6">
            <Link
              to="/game"
              className={`px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 ${
                !validate() ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={(e) => {
                if (!validate()) {
                  e.preventDefault();
                  alert("Please ensure all players have a name and a selected color.");
                } else {
                  setGameStarted(true);
                }
              }}
            >
              Start Now
            </Link>
          </div>
        )}
      </div>}
      <Routes>
        <Route
          path="/game"
          element={
            playerDetails.length ? (
              <Board players={playerDetails} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </div>
  );
};

export default App;
