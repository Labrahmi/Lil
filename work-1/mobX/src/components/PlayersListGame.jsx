import React from "react";
import { observer } from "mobx-react-lite";
import { BigHead } from "@bigheads/core";
import "../styles/PlayersListGame.css";

const PlayersListGame = observer(({ PlayersStore }) => {
  return (
    <div className="container">
      {PlayersStore.players.map((player) => (
        <div key={player.id} className="player">
          <p className="name">{player.name}</p>
          <BigHead
            {...player.bighead}
            style={{ width: "100px", height: "100px" }}
          />
          <p style={{ marginBottom: -5 }}>{player.score}</p>
          <p style={{ marginBottom: -5 }}>guessed:</p>
          <div style={{ display: "flex", flexDirection: "row", gap: 5, marginTop:5, marginBottom: 5 }}>
            {player.lettersGuessed.map((letter) => (
              <p
                key={letter}
                style={{
                  color: PlayersStore.word.split("").includes(letter)
                    ? "green"
                    : "red",
                }}
              >
                {letter}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
});

export default PlayersListGame;
