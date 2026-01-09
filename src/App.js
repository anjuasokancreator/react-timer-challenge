import Player from "./components/Player";
import TimerChallenge from "./components/TimerChallenge";

function App() {
  return (
    <>
      <Player />
      <div id="challenges"></div>
      <TimerChallenge title="Easy" targetTime={1}></TimerChallenge>
      <TimerChallenge title="Not easy" targetTime={5}></TimerChallenge>
      <TimerChallenge title="Getting tough" targetTime={1}></TimerChallenge>
      <TimerChallenge title="Pros only" targetTime={1}></TimerChallenge>
    </>
  );
}

export default App;
