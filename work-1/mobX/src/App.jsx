import { observer } from "mobx-react-lite";
import NewPlayer from "./components/NewPlayer";
import PlayersList from "./components/PlayersList";
import PlayersListGame from "./components/PlayersListGame";
import Word from "./components/Word";
import ResetButton from "./components/ResetButton";
import { PlayersStore } from "./mobX/PlayersStore";
import { useMemo } from "react";
import "./styles/App.css";

const App = observer(() => {
  // const [playersStore, setPlayersStore] = useState(new PlayersStore());
  // const playersStore = new PlayersStore();
  const playersStore = useMemo(() => new PlayersStore(), []);

  return !playersStore.gameStarted ? (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div className="container-third">
        <NewPlayer PlayersStore={playersStore} />
      </div>
      <div className="container-two-thirds">
        <PlayersList PlayersStore={playersStore} />
      </div>
    </div>
  ) : (
    <>
      <PlayersListGame PlayersStore={playersStore} />
      <Word PlayersStore={playersStore} />
      <ResetButton PlayersStore={playersStore} />
    </>
  );
});

export default App;
