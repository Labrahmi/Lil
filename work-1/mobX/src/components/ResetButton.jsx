import { observer } from "mobx-react-lite";
import React from "react";

const ResetButton = observer(({ PlayersStore }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center"}}>
        <label htmlFor="delayInput">Delay: {PlayersStore.delay} ms</label>
        <div className="PB-range-slider-div">
          <input
            type="range"
            min={500}
            max={2000}
            step={100}
            value={PlayersStore.delay}
            className="PB-range-slider"
            id="myRange"
            onChange={(e) => PlayersStore.setDelay(parseInt(e.target.value))}
          />
        </div>
      </div>
      <button
        onClick={() => {
          PlayersStore.resetGame();
        }}
      >
        Reset
      </button>
    </div>
  );
});

export default ResetButton;
