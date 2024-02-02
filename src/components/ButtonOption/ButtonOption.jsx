import styles from './ButtonOption.module.scss'

export const ButtonOption = ({text, onClick, className}) => {
    return (
        <button className={`${styles.btnOption} ${className}`} onClick={onClick}>{text}</button>
    )
}