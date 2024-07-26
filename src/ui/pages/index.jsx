import { useContext } from "react";
import { AppContext } from "../../App";
import MusicList from "../componentes/data-display/MusicList/MusicList";
import AudioPlayer from "../componentes/data-display/AudioPlayer/audioPlayer";
import styles from './index.module.css'

function Index() {
    const { selectedMusic, time, setTime, next, previous, selectMusic, musicList} = useContext(AppContext);
    
    return (
        <div className={styles['page-container']}>
           <MusicList
            musics={musicList}
            selectedMusic={selectedMusic}
            onSelect={selectMusic} />

            <AudioPlayer
            music={selectedMusic} 
            onComplete={() => console.log('Finish')}
            onNext={next}
            onPrevious={previous} />
        </div>
    )
}

export default Index;