export const drawMesh = (points, ctx) => {
	if (points.length > 0) {
		points.forEach(point => {
			const keypoints = point.scaledMesh;

			for (let i = 0; i < keypoints.length; i++) {
				const x = keypoints[i][0];
				const y = keypoints[i][1];
				ctx.beginPath();
				ctx.arc(x, y, 1, 0, 3 * Math.PI);
				ctx.fillStyle = '#951c1c';
				ctx.fill();
			}
		});
	}
};
