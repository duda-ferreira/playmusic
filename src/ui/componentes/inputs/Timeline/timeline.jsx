import styles from './timeline.module.css';

export default function Timeline(props) {



    return (
        <div className={styles['timeline-container']}>
            <div className={styles['timeline-line']} style={{'--width': `${props.width}%`}}></div>
            <input className={styles['timeline-slider']} type='range' 
            onChange={(event) => props.onChangeWidth(event.target.value) }/>
        </div>
    )
}