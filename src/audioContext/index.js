import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { getIsPlaying, getPlayingFromPercent, getCurrentTrackId } from 'store/audioState/selectors';
import { getTracksById } from 'store/tracks/selectors';

import { nextTrackAction } from 'store/audioState/actions';

import Audio from './Audio';


const AudioContext = React.createContext({
    currentTime: 0,
    nativeDuration: 0,
});

class AudioProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nativeDuration: 0,
            currentTime: 0,
            currentSrc: null,
        }

        this.changeCurrentTime = this.changeCurrentTime.bind(this);
    }

    componentDidMount() {
        this.findTrackSrc();
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

    changeCurrentTime({ currentTime, duration }) {
        this.setState({
            nativeDuration: duration,
            currentTime,
        })
    }

    render() {
        const { isPlaying, playingFromPercent, playNextTrack, children } = this.props;
        const { currentSrc, nativeDuration, currentTime } = this.state;

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
                    value={{ nativeDuration, currentTime }}
                >
                    {children}
                </AudioContext.Provider>
            </React.Fragment>
        )
    }
}

AudioContext.propTypes = {
    isPlaying: PropTypes.bool.isRequired,
    playingFrom: PropTypes.number.isRequired,
    currentTrackId: PropTypes.string.isRequired,
    tracksById: PropTypes.object.isRequired,
    playNextTrack: PropTypes.func.isRequired,
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
})(AudioProvider);

export { ConnectedAudioProvider as AudioProvider };
export { AudioContext };
