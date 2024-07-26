import { useState, useRef, useEffect, useMemo } from 'react';
import styles from './audioPlayer.module.css';
import Timeline from '../../inputs/Timeline/timeline';
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import { LuRepeat, LuRepeat1 } from "react-icons/lu";
import { LiaRandomSolid } from 'react-icons/lia';

export default function AudioPlayer(props) {
    const [canPlay, setCanPlay] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(1);
    const [currentTime, setCurrentTime] = useState(0);
    const [repeatMode, setRepeatMode] = useState(0);
    const width = useMemo(() => {
        return (currentTime / duration) * 100;
    }, [duration, currentTime]);

    const audioRef = useRef(null);

    useEffect(() => {
        if (props.music) {
            if (isPlaying) {
                audioRef.current.play();
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying, props.music]);

    useEffect(() => {
        if (props.music) {
            setCurrentTime(0);
            setCanPlay(false);
        }
    }, [props.music]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (isPlaying) {
                setCurrentTime(audioRef.current.currentTime);
            }
        }, 500);

        return () => clearInterval(interval);
    }, [isPlaying]);

    function onCanPlay() {
        setDuration(audioRef.current.duration);
        setCanPlay(true);
    }

    function onEnded() {
        if (repeatMode === 2) {
            // Repeat the current song
            audioRef.current.currentTime = 0;
            audioRef.current.play();
        } else if (repeatMode === 1) {
            // Play the next song
            props.onComplete();
        } else {
            // No repeat
            setIsPlaying(false);
            props.onComplete();
        }
    }

    function handlePlay() {
        if (props.music) {
            setIsPlaying(!isPlaying);
        }
    }

    function changeTime(percent) {
        if (props.music) {
            audioRef.current.currentTime = (percent / 100) * duration;
        }
    }

    function toggleRepeatMode() {
        setRepeatMode((prevMode) => (prevMode + 1) % 3);
    }

    return (
        <div className={styles['player-container']}>
            <div className={styles['icons']}>
                <MdSkipPrevious size={50} onClick={() => {
                    console.log('Previous button clicked');
                    props.onPrevious();
                }}  />
                <div className={styles['button-container']}>
                    <button
                        className={styles['play-button']}
                        onClick={handlePlay}
                        disabled={!canPlay}
                    >
                        {isPlaying ? `\u2759\u2759` : `\u25B8`}
                    </button>
                </div>
                <div className={styles['repeat']} onClick={toggleRepeatMode}>
                    {repeatMode === 2 ? (
                        <LuRepeat1 size={20} color="green" />
                    ) : (
                        <LuRepeat size={20} color={repeatMode === 1 ? 'green' : 'rgb(229, 229, 229)'} />
                    )}
                </div>
                <div className={styles['randomly']}>
                <LiaRandomSolid size={20} />
                </div>
                <MdSkipNext size={50} onClick={() => {
                    console.log('Next button clicked');
                    props.onNext();
                }}/>
                
            </div>
            <Timeline width={width} onChangeWidth={changeTime} />
            <audio
                ref={audioRef}
                src={props?.music?.url}
                controls
                onCanPlay={onCanPlay}
                onEnded={onEnded}
                className={styles['audio']}
            />
            
        </div>
    );
}