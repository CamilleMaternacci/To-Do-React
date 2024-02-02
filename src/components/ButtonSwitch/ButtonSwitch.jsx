import styles from './ButtonSwitch.module.scss'

export const ButtonSwitch = ({stylesIcon, onClick}) => {
    return (
        <button className={stylesIcon} onClick={onClick}><i className={`${styles.iconSwitch} fa-solid fa-broom`}></i></button>
    )
}