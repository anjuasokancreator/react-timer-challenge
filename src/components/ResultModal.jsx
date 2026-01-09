import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

const ResultModal = forwardRef(function ResultModal(
  { targetTime, remainingTime, onReset },
  ref
) {
  const dialog = useRef(null);

  useImperativeHandle(ref, () => ({
    open() {
      dialog.current.showModal();
    },
    close() {
      dialog.current.close();
    },
  }));

  return createPortal(
    <dialog ref={dialog} className="result-modal">
      <h2>Challenge Finished</h2>

      <p>
        Target time: <strong>{targetTime} seconds</strong>
      </p>

      <p>
        Time remaining:{" "}
        <strong>{(remainingTime / 1000).toFixed(2)} seconds</strong>
      </p>

      <form method="dialog">
        <button onClick={onReset}>Reset</button>
      </form>
    </dialog>,
    document.getElementById("modal")
  );
});

export default ResultModal;
