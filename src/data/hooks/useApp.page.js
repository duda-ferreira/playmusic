import { useState } from "react";

const musicList = [
    {
        id:1,
        name: 'Stoker',
        artist: 'Jingle Punks',
        time: 65,
        url: 'musics/Stoker.mp3'
    },
    {
        id: 2,
        name: 'Shadowing',
        artist: 'duda',
        time: 85,
        url: 'musics/Shadowing.mp3'
    }
]


export function useApp() {
    const [selectedMusic, setSelectedMusic] = useState();
    const [time, setTime] = useState(0);

    const next = () => {
        if (selectedMusic) {
            const currentIndex = musicList.findIndex(m => m.id === selectedMusic.id);
            const nextIndex = (currentIndex + 1) % musicList.length;
            setSelectedMusic(musicList[nextIndex]);
        }
    }

    const previous = () => {
        try {
            if (selectedMusic) {
                const currentIndex = musicList.findIndex(m => m.id === selectedMusic.id);
                const prevIndex = (currentIndex - 1 < 0) ? musicList.length - 1 : currentIndex - 1;

                setSelectedMusic(musicList[prevIndex]);
                console.log('Previous button clicked');
            }
        } catch (error) {
            console.error('Error in previous function:', error);
        }
    }

    function selectMusic(music) {
        setTime(0);
        setSelectedMusic(music);
    }
    return {
        selectedMusic,
        time, 
        setTime,
        selectMusic,
        next, 
        previous,
        musicList,};
        

    
}