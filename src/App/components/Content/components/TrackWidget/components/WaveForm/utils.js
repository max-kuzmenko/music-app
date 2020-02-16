import axios from 'axios';


const AudioContext = window.AudioContext || window.webkitAudioContext;

const AUDIO_PEAKS_AMOUNT = 300;

const loadAudio = src => axios({
    url: src,
    method: 'GET',
    responseType: 'blob',
});

export const fetchAudioData = async (audioSrc) => {
    const response = await loadAudio(audioSrc);
    const arrayBuffer = await response.data.arrayBuffer();

    const audioContext = new AudioContext();
    return audioContext.decodeAudioData(arrayBuffer);
};

export const filterAudioData = audioData => {
    const rawData = audioData.getChannelData(0);
    const blockSize = Math.floor(rawData.length / AUDIO_PEAKS_AMOUNT);
    const filteredData = [];
    for (let i = 0; i < AUDIO_PEAKS_AMOUNT; i++) {
        let blockStart = blockSize * i;
        let sum = 0;
        for (let j = 0; j < blockSize; j++) {
            sum = sum + Math.abs(rawData[blockStart + j]);
        }
        filteredData.push(sum / blockSize);
    }

    const multiplier = Math.pow(Math.max(...filteredData), -1);
    return filteredData.map(n => n * multiplier);
}
