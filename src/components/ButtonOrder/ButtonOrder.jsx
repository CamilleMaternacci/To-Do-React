import styles from './ButtonOrder.module.scss'

export const ButtonOrder = ({ icon, text, className, onClick, value }) => {
	return (
	
			<div className={styles.btnsOrder}>
                <button className={className} value={value} onClick={onClick}>{icon}</button>
			<h3 className={styles.btnText}>{text}</h3>
            </div>
		
	)
}
