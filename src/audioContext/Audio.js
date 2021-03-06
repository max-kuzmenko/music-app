import React from 'react';
import PropTypes from 'prop-types';


class Audio extends React.Component {
    constructor(props) {
        super(props);
        this.audioRef = React.createRef();
        this.state = { canPlay: false };

        this.timeLoaded = false;

        this.setPlayingState = this.setPlayingState.bind(this);
        this.setMuted = this.setMuted.bind(this);
        this.waitForUserInteration = this.waitForUserInteration.bind(this);
        this.setCurrentTime = this.setCurrentTime.bind(this);
        this.canPlayHandler = this.canPlayHandler.bind(this);
        this.timeUpdateHandler = this.timeUpdateHandler.bind(this);
        this.onCanPlayThrough = this.onCanPlayThrough.bind(this);
        this.onWaiting = this.onWaiting.bind(this);
        this.controlAudio = this.controlAudio.bind(this);
    }

    componentDidMount() {
        this.controlAudio(null);
    }

    componentDidUpdate(prevProps) {
        this.controlAudio(prevProps);
    }

    setPlayingState() {
        const audio = this.audioRef.current;
        if(!audio) return;
        if(this.props.isPlaying) {
            audio.play().catch(this.waitForUserInteration);
        } else {
            audio.pause();
        }
    }

    setMuted(isMuted) {
        this.audioRef.current.muted = isMuted;
    }

    waitForUserInteration() {
        const component = this;
        window.addEventListener('click', function interactionListener() {
            component.setPlayingState();
            window.removeEventListener('click', interactionListener);
        });
    }

    setCurrentTime() {
        const audio = this.audioRef.current;
        audio.currentTime = this.props.playFrom;
    }

    canPlayHandler() {
        if(this.state.canPlay) return;
        this.setState({ canPlay: true }, () => this.controlAudio(null));
    }

    timeUpdateHandler() {
        const audio = this.audioRef.current;
        const percent = audio.currentTime / (audio.duration / 100);

        this.props.onTimeChange({
            currentTime: audio.currentTime,
            duration: audio.duration,
            percent,
        });
    }

    setVolume() {
        const audio = this.audioRef.current;
        const { volumeLevel } = this.props;

        audio.volume = volumeLevel / 100;
    }

    onCanPlayThrough() {
        if(!this.timeLoaded) this.setCurrentTime();
        this.timeLoaded = true;
        this.props.onLoadingChange(false);
    }

    onWaiting() {
        this.props.onLoadingChange(true);
    }

    controlAudio(prevProps) {
        const { canPlay } = this.state;
        const { isPlaying, playFrom, volumeLevel } = this.props;
        if(!canPlay) return;

        const skipPropsCompare = !prevProps;

        if(skipPropsCompare || isPlaying !== prevProps.isPlaying) {
            this.setPlayingState();
        }

        if(skipPropsCompare || playFrom !== prevProps.playFrom) {
            this.setCurrentTime();
        }

        if(skipPropsCompare || volumeLevel !== prevProps.volumeLevel) {
            this.setVolume();
        }
    }

    render() {
        const { src, onEnded } = this.props;

        return (
            <audio
                ref={this.audioRef}
                src={src}
                onCanPlay={this.canPlayHandler}
                onLoadedMetadata={this.canPlayHandler}
                onTimeUpdate={this.timeUpdateHandler}
                onCanPlayThrough={this.onCanPlayThrough}
                onSeeking={() => this.setMuted(true)}
                onSeeked={() => this.setMuted(false)}
                onWaiting={this.onWaiting}
                onEnded={onEnded}
            />
        );
    }
}

Audio.propTypes = {
    playFrom: PropTypes.number, // seconds
    volumeLevel: PropTypes.number, // %
    isPlaying: PropTypes.bool.isRequired,
    src: PropTypes.string.isRequired,
    onLoadingChange: PropTypes.func,
    onEnded: PropTypes.func.isRequired,
    onTimeChange: PropTypes.func.isRequired,
};

Audio.defaultProps = {
    playFrom: 0,
    volumeLevel: 50,
    onLoadingChange: () => {},
};

export default Audio;
