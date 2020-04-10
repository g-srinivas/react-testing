import React, { useState } from "react";

export default function Counter1(props) {
  const initialProps = React.useRef(props).current;
  const { initialCount = 0, maxClicks = 3 } = props;
  const [count, setCount] = useState(initialCount);
  const tooMany = count >= maxClicks;

  const handleReset = () => setCount(initialProps.initialCount);
  const handleClick = () => setCount((currentCount) => currentCount + 1);

  return (
    <div>
      <button onClick={handleClick} disabled={tooMany}>
        Count: {count}
      </button>
      {tooMany ? <button onClick={handleReset}>Reset</button> : null}
    </div>
  );
}
