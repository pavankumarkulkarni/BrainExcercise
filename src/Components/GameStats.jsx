import React from "react";

const GameStats = ({ gameStats }) => {
  return (
    <div className="aside">
      <h4> Game Stats. </h4>
      <ul>
        {gameStats.map((stat, id) => {
          return (
            <li key={id}> {`Game : ${id + 1} - Level completed ${stat}`} </li>
          );
        })}
      </ul>
    </div>
  );
};

export default GameStats;
