import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [isRunning, setIsRunning] = useState(false);

  const handlePermissions = () => {
    // Request permission for iOS 13+ devices
    if (
      DeviceMotionEvent &&
      typeof DeviceMotionEvent.requestPermission === "function"
    ) {
      DeviceMotionEvent.requestPermission();
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>
          <button onClick={handlePermissions}>Start</button>
        </p>
      </header>
    </div>
  );
}

export default App;
