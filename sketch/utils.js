const degToRad = (degree) => {
	return (degree / 180) * Math.PI;
};

const randomRange = (min = 0, max = 1) => {
	return Math.random() * (max + min) + min;
};

const exporter = {
	degToRad: degToRad,
	randomRange
};

export default exporter;
