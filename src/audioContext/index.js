import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { getIsPlaying, getCurrentTime, getCurrentTrackId, getVolumeLevel } from 'store/audioState/selectors';
import { getTracksById } from 'store/tracks/selectors';

import { nextTrackAction, setCurrentTimeAction } from 'store/audioState/actions';

import Audio from './Audio';


const AudioContext = React.createContext({
    currentTime: 0,
    playingPercent: 0,
    nativeDuration: 0,
    currentSrc: null,
});

class AudioProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nativeDuration: 0,
            currentTime: 0,
            playingPercent: 0,
            currentSrc: null,
        }

        this.changeCurrentTime = this.changeCurrentTime.bind(this);
        this.savePlayingFrom = this.savePlayingFrom.bind(this);
    }

    componentDidMount() {
        this.findTrackSrc();
        this.addBeforeUnloadListener();
    }

    componentDidUpdate(prevProps) {
        if(prevProps.currentTrackId !== this.props.currentTrackId) {
            this.findTrackSrc();
        }
    }

    findTrackSrc() {
        const { currentTrackId, tracksById } = this.props;
        const currentTrack = tracksById[currentTrackId];
        this.setState({ currentSrc: currentTrack && currentTrack.preview })
    }

    addBeforeUnloadListener() {
        window.onbeforeunload = () => this.savePlayingFrom();
    }

    savePlayingFrom() {
        const { setCurrentTime } = this.props;
        const { currentTime } = this.state;

        setCurrentTime(currentTime);
    }

    changeCurrentTime({ currentTime, duration, percent }) {
        this.setState({
            nativeDuration: duration,
            playingPercent: percent,
            currentTime,
        })
    }

    render() {
        const { isPlaying, playNextTrack, volumeLevel, children } = this.props;
        const { currentSrc, nativeDuration, currentTime, playingPercent } = this.state;

        return (
            <React.Fragment>
                {currentSrc ? (
                    <Audio
                        isPlaying={isPlaying}
                        key={currentSrc}
                        src={currentSrc}
                        volumeLevel={volumeLevel}
                        playFrom={this.props.currentTime}
                        onTimeChange={this.changeCurrentTime}
                        onEnded={playNextTrack}
                    />
                ) : null}
                <AudioContext.Provider
                    value={{ nativeDuration, currentTime, playingPercent, currentSrc }}
                >
                    {children}
                </AudioContext.Provider>
            </React.Fragment>
        )
    }
}

AudioContext.propTypes = {
    isPlaying: PropTypes.bool.isRequired,
    playingFromPercent: PropTypes.number.isRequired,
    volumeLevel: PropTypes.number.isRequired,
    currentTrackId: PropTypes.string.isRequired,
    tracksById: PropTypes.object.isRequired,
    playNextTrack: PropTypes.func.isRequired,
    setCurrentTime: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

const mapStateToProps = state => ({
    isPlaying: getIsPlaying(state),
    currentTime: getCurrentTime(state),
    volumeLevel: getVolumeLevel(state),
    currentTrackId: getCurrentTrackId(state),
    tracksById: getTracksById(state),
});

const ConnectedAudioProvider = connect(mapStateToProps, {
    playNextTrack: nextTrackAction,
    setCurrentTime: setCurrentTimeAction,
})(AudioProvider);

export { ConnectedAudioProvider as AudioProvider };
export { AudioContext };
