'use client'
import styles from './spinner.module.css';

function Spinner({ topPosition, bottomPosition, width }) {
    const checkPosition = () => {
        const positionStyles = {};
        if (topPosition && bottomPosition) {
            positionStyles.top = `${topPosition}%`
            positionStyles.bottom = `${bottomPosition}%`
        } else if (topPosition) {
            positionStyles.top = `${topPosition}%`
        } else if (bottomPosition) {
            positionStyles.bottom = `${bottomPosition}%`
        }

        if (width) {
            positionStyles.width = `${width}%`;
        }

        return positionStyles;
        // if (topPosition && bottomPosition) {
        //     return {
        //         top: `${topPosition}%`,
        //         bottom: `${bottomPosition}%`,
        //     }
        // } else if (topPosition) {
        //     return {
        //         top: `${topPosition}%`,
        //     }
        // } else if (bottomPosition) {
        //     return {
        //         bottom: `${bottomPosition}%`
        //     }
        // } else return;
    }

    return (
        <div
            style={checkPosition()}
            className={styles.loader}
        />
    )
}

export default Spinner