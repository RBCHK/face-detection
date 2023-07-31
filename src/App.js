import React, { useState } from 'react';
import Webcam from 'react-webcam';
import './App.css';
import { config } from './config';

function App() {
	const [isEnabled, setIsEnabled] = useState(false);
	return (
		<>
			{isEnabled && <Webcam videoConstraints={config} />}
			<button onClick={() => setIsEnabled(!isEnabled)}>{isEnabled ? 'On' : 'Off'}</button>
		</>
	);
}

export default App;
