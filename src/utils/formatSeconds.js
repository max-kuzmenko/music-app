
const padZero = number => (`0${number}`).substr(-2);
const formatSeconds = seconds => `${Math.floor(seconds / 60)}:${padZero(Math.floor(seconds % 60))}`;

export default formatSeconds;
