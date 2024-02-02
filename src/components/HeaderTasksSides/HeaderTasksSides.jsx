import styles from './HeaderTasksSides.module.scss'
export const HeaderTasksSides = ({ stylesHeaderTasks, icon, text }) => {
	return (
		<>
			<h2 className={stylesHeaderTasks ? styles.rightSideHeaderLight : styles.rightSideHeaderDark}>
				{icon} {text}
			</h2>
		</>
	)
}
