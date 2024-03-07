import { observer } from "mobx-react-lite";

const Word = observer(({ PlayersStore }) => {
  return (
    <>
        <h4 style={{display: "flex", justifyContent: "center", marginBottom: -10}}>word:</h4>
        <div style={{display: "flex",flexDirection: "row", gap: 5, justifyContent: "center"}}>
          {PlayersStore.word.split("").map((letter, index) => {
            if (PlayersStore.lettersGuessed.includes(letter)) {
              return <p key={index}>{letter}</p>;
            } else {
              return <p key={index}>_</p>;
            }
          })}
        </div>
    </>
   
  );
});

export default Word;
