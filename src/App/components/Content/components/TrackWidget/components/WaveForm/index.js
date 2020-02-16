import React from 'react';
import PropTypes from 'prop-types';

import Waveform from 'react-audio-waveform';

import { fetchAudioData, filterAudioData } from './utils';

import classes from './style.scss';


class WaveForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { peaks: [] }

        this.changeCurrentTime = this.changeCurrentTime.bind(this);
    }

    componentDidMount() {
        this.findAudioPeaks();
    }

    componentDidUpdate(prevProps) {
        if(this.props.currentSrc === prevProps.currentSrc) return;
        this.findAudioPeaks();
    }

    changeCurrentTime(time) {
        if(!this.props.currentSrc) return;
        this.props.setCurrentTime(time);
    }

    async findAudioPeaks() {
        if(!this.props.currentSrc) return;
        const audioData = await fetchAudioData(this.props.currentSrc);
        const peaks = filterAudioData(audioData);

        this.setState({ peaks });
    }

    render() {
        const { currentTime, duration } = this.props;
        const { peaks } = this.state;

        return (
            <div className={classes.WaveFrom}>
                <Waveform
                    barWidth={1}
                    peaks={peaks}
                    height={60}
                    pos={currentTime}
                    duration={duration}
                    onClick={this.changeCurrentTime}
                    color="#ddd"
                    transitionDuration={"#FF6347"}
                    progressGradientColors={[[0, "#444"], [1, "#444"]]}
                />
            </div>
        );
    }
}

WaveForm.propTypes = {
    currentSrc: PropTypes.string,
    currentTime: PropTypes.number,
    duration: PropTypes.number,
    setCurrentTime: PropTypes.func.isRequired,
};

WaveForm.defaultProps = {
    currentTime: 0,
    duration: 0,
};


export default WaveForm;
