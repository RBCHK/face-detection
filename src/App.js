import React, { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import './App.css';
import { config, detectorConfig } from './config';
//import * as ft from '@tensorflow/tfjs';
import * as facemesh from '@tensorflow-models/face-landmarks-detection';
import drawMesh from './helper';

function App() {
	const [isEnabled, setIsEnabled] = useState(false);
	const webcamRef = useRef(null);
	const canvasRef = useRef(null);

	const runDetector = async () => {
		const detector = await facemesh.load(detectorConfig);

		const detect = async net => {
			if (webcamRef.current && webcamRef.current.video.readyState === 4) {
				const video = webcamRef.current.video;
				const canvas = canvasRef.current;

				canvas.width = video.videoWidth;
				canvas.height = video.videoHeight;

				const face = await net.estimateFaces(video);
				const context = canvas.getContext('2d');

				requestAnimationFrame(() => drawMesh(face, context));
				detect(detector);
			}
		};
		detect(detector);
	};

	useEffect(() => {
		setTimeout(() => runDetector(), 500);
	}, [isEnabled]);

	return (
		<>
			{isEnabled && (
				<>
					<Webcam videoConstraints={config} ref={webcamRef} />
					<canvas ref={canvasRef} />
				</>
			)}
			<button onClick={() => setIsEnabled(!isEnabled)}>{isEnabled ? 'On' : 'Off'}</button>
		</>
	);
}

export default App;
