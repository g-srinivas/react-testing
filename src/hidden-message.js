import React from "react";

function HiddenMessage({ children }) {
  const [showMessage, setShowMessage] = React.useState(false);
  return (
    <div>
      <label htmlFor="toggle">Show Message</label>
      <input
        type="checkbox"
        id="toggle"
        checked={showMessage}
        onChange={(e) => setShowMessage(e.target.checked)}
      />
      {showMessage ? children : null}
    </div>
  );
}

export default HiddenMessage;
