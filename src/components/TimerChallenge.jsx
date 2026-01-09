import { useState, useRef, useEffect } from "react";
import ResultModal from "./ResultModal";

export default function TimerChallenge({ title, targetTime }) {
  const timer = useRef(null);
  const dialog = useRef(null);

  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);
  const [hasEnded, setHasEnded] = useState(false);

  const timerIsActive =
    timeRemaining > 0 && timeRemaining < targetTime * 1000 && !hasEnded;

  function handleStart() {
    setHasEnded(false);

    timer.current = setInterval(() => {
      setTimeRemaining((prev) => Math.max(prev - 10, 0));
    }, 10);
  }

  function endChallenge() {
    clearInterval(timer.current);
    setHasEnded(true);
    dialog.current.open(); // ✅ open even if stopped early
  }

  function handleReset() {
    clearInterval(timer.current);
    setTimeRemaining(targetTime * 1000);
    setHasEnded(false);
    dialog.current.close();
  }

  // ⏱ Timeout case
  useEffect(() => {
    if (timeRemaining === 0 && !hasEnded) {
      endChallenge();
    }
  }, [timeRemaining]);

  return (
    <>
      <ResultModal
        ref={dialog}
        targetTime={targetTime}
        remainingTime={timeRemaining}
        onReset={handleReset}
      />

      <section className="challenge">
        <h2>{title}</h2>

        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>

        <p>
          <button onClick={timerIsActive ? endChallenge : handleStart}>
            {timerIsActive ? "Stop" : "Start"} Challenge
          </button>
        </p>

        <p className={timerIsActive ? "active" : undefined}>
          {timerIsActive ? "Timer is running..." : "Timer inactive"}
        </p>
      </section>
    </>
  );
}
