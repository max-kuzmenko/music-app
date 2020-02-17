import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { AudioContext } from "audioContext";

import { setCurrentTimeAction } from 'store/audioState/actions';

import WaveForm from '../components/WaveForm';
import PlayingTime from '../components/PlayingTime';


const Progress = ({
    setCurrentTime,
}) => {
    const { currentSrc, currentTime, nativeDuration } = useContext(AudioContext);

    return (
        <React.Fragment>
            <PlayingTime
                currentTime={currentTime}
                duration={nativeDuration}
            />
            <WaveForm
                currentSrc={currentSrc}
                currentTime={currentTime}
                duration={nativeDuration}
                setCurrentTime={setCurrentTime}
            />
        </React.Fragment>
    )
};

Progress.propTypes = {
    setCurrentTime: PropTypes.func.isRequired,
};

const mapDispatch = {
    setCurrentTime: setCurrentTimeAction
};

export default connect(null, mapDispatch)(Progress);
