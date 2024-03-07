import React from "react";
import { observer } from "mobx-react-lite";
import { BigHead } from "@bigheads/core";
import "../styles/PlayersList.css";

const PlayersList = observer(({ PlayersStore }) => {
  return (
    <div className="container">
      <div className="list">
        {PlayersStore.players.map((player) => (
          <div key={player.id} className="player">
            <BigHead
              {...player.bighead}
              style={{
                width: "200px",
                height: "200px",
              }}
            />
            <p className="name">{player.name}</p>
            <button onClick={() => PlayersStore.removePlayer(player.id)}>
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
});

export default PlayersList;
