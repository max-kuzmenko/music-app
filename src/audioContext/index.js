import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { getIsPlaying, getPlayingFromPercent, getCurrentTrackId } from 'store/audioState/selectors';
import { getTracksById } from 'store/tracks/selectors';

import { nextTrackAction, setPlayingFromPercentAction } from 'store/audioState/actions';

import Audio from './Audio';


const AudioContext = React.createContext({
    currentTime: 0,
    playingPercent: 0,
    nativeDuration: 0,
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
        const { setPlayingFromPercent } = this.props;
        const { playingPercent } = this.state;

        setPlayingFromPercent(playingPercent);
    }

    changeCurrentTime({ currentTime, duration, percent }) {
        this.setState({
            nativeDuration: duration,
            playingPercent: percent,
            currentTime,
        })
    }

    render() {
        const { isPlaying, playingFromPercent, playNextTrack, children } = this.props;
        const { currentSrc, nativeDuration, currentTime, playingPercent } = this.state;

        return (
            <React.Fragment>
                {currentSrc ? (
                    <Audio
                        isPlaying={isPlaying}
                        key={currentSrc}
                        src={currentSrc}
                        playFromPercent={playingFromPercent}
                        onTimeChange={this.changeCurrentTime}
                        onEnded={playNextTrack}
                    />
                ) : null}
                <AudioContext.Provider
                    value={{ nativeDuration, currentTime, playingPercent }}
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
    currentTrackId: PropTypes.string.isRequired,
    tracksById: PropTypes.object.isRequired,
    playNextTrack: PropTypes.func.isRequired,
    setPlayingFromPercent: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

const mapStateToProps = state => ({
    isPlaying: getIsPlaying(state),
    playingFromPercent: getPlayingFromPercent(state),
    currentTrackId: getCurrentTrackId(state),
    tracksById: getTracksById(state),
});

const ConnectedAudioProvider = connect(mapStateToProps, {
    playNextTrack: nextTrackAction,
    setPlayingFromPercent: setPlayingFromPercentAction,
})(AudioProvider);

export { ConnectedAudioProvider as AudioProvider };
export { AudioContext };
