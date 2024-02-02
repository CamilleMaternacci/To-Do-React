import styles from './HeaderApp.module.scss'
import stylesColorSwitch from '../ButtonSwitch/ButtonSwitch.module.scss'
import { ButtonSwitch } from '../ButtonSwitch/ButtonSwitch'

export const HeaderApp = ({ stylesHeader, stylesBtnDark, onClickLight, onClickDark }) => {
	return (
		<div className={stylesHeader ? styles.headerApp : styles.headerAppDark}>
			<h1 className={stylesHeader ? styles.headerTitleLight : styles.headerTitleDark}>
				<i className='fa-solid fa-clipboard'></i> Todo App
			</h1>
			<div className={stylesHeader ? styles.switchAreaLight : styles.switchAreaDark}>
				<ButtonSwitch
					stylesIcon={stylesHeader ? stylesColorSwitch.buttonLightActive : stylesColorSwitch.buttonSwitchLight}
					onClick={onClickLight}
				/>
				<ButtonSwitch stylesIcon={stylesBtnDark} onClick={onClickDark} />
			</div>
		</div>
	)
}
