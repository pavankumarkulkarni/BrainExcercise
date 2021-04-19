import React from "react";
import ColorPalette from "./Components/ColorPalette";
import GameStats from "./Components/GameStats";
import { wait, colors } from "./Components/util";

const App = () => {
  const initGameState = {
    guess: 0,
    play: false,
    gameColors: [],
    isFlashing: false,
    flashColor: null,
  };
  const initUserState = {
    userPlay: false,
    userColors: [],
    gameStats: [],
  };
  const [gameState, setGameState] = React.useState(initGameState);
  const [userState, setUserState] = React.useState(initUserState);

  React.useEffect(() => {
    if (gameState.play) {
      const currentGameColors = [];
      currentGameColors.push(colors[Math.floor(Math.random() * 4)]);
      setGameState((prevState) => ({
        ...prevState,
        isFlashing: true,
        gameColors: currentGameColors,
      }));

      setUserState((prevState) => ({
        ...prevState,
        userColors: [],
        userPlay: false,
      }));
    }
    console.log("UE1");
  }, [gameState.play]);

  React.useEffect(() => {
    async function fn() {
      for (let i = 0; i < gameState.gameColors.length; i++) {
        await wait();
        setGameState((prevState) => ({
          ...prevState,
          flashColor: gameState.gameColors[i],
        }));
        await wait();
        setGameState((prevState) => ({
          ...prevState,
          flashColor: null,
        }));
      }

      setUserState((prevState) => ({
        ...prevState,
        userPlay: true,
      }));
    }
    if (gameState.play && gameState.isFlashing) {
      fn();
    }
  }, [gameState.play, gameState.isFlashing, gameState.gameColors]);

  React.useEffect(() => {
    async function fn() {
      if (
        userState.userPlay &&
        userState.userColors.length === gameState.gameColors.length
      ) {
        for (let i = 0; i < userState.userColors.length; i++) {
          if (userState.userColors[i] !== gameState.gameColors[i]) {
            setUserState((prevState) => ({
              ...prevState,
              userColors: [],
              userPlay: false,
              gameStats: [...prevState.gameStats, gameState.guess],
            }));

            setGameState((prevState) => ({
              ...prevState,
              guess: 0,
              play: false,
              gameColors: [],
              isFlashing: false,
              flashColor: null,
            }));
            return;
          }
        }
        await wait();
        const currentGameColors = [...gameState.gameColors];
        currentGameColors.push(colors[Math.floor(Math.random() * 4)]);
        setGameState((prevState) => ({
          ...prevState,
          guess: gameState.guess + 1,
          gameColors: currentGameColors,
          isFlashing: true,
        }));
        setUserState((prevState) => ({
          ...prevState,
          userColors: [],
          userPlay: false,
        }));
      }
    }
    fn();
  }, [
    userState.userPlay,
    userState.userColors,
    gameState.gameColors,
    gameState.guess,
  ]);

  const addUserColor = (color) => {
    const newUserColors = [...userState.userColors];
    newUserColors.push(color);
    setUserState({ ...userState, userColors: newUserColors });
  };

  return (
    <div className="content">
      <header>
        <h1>Brain - Excercise</h1>
        <p>Remember flashed color pattern</p>
      </header>
      <div className="main">
        <div className="container">
          {colors.map((clr, id) => {
            return (
              <ColorPalette
                key={id}
                color={clr}
                flash={gameState.flashColor === clr}
                addUserColor={addUserColor}
                userPlay={userState.userPlay}
              />
            );
          })}

          {gameState.play ? (
            <button className="guess" disabled>
              {gameState.guess}
            </button>
          ) : (
            <button onClick={() => setGameState({ ...gameState, play: true })}>
              Play
            </button>
          )}
        </div>
        <GameStats gameStats={userState.gameStats} />
      </div>
      <footer>
        <p>
          Colors yet to identify :{" "}
          {userState.userPlay
            ? gameState.gameColors.length - userState.userColors.length
            : "..."}
        </p>
      </footer>
    </div>
  );
};

export default App;
