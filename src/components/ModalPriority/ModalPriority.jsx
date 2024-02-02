import styles from '../ModalPriority/ModalPriority.module.scss'
import stylesBtnOrder from '../ButtonOrder/ButtonOrder.module.scss'
import { HeaderTasksSides } from '../HeaderTasksSides/HeaderTasksSides'
import { ButtonOrder } from '../ButtonOrder/ButtonOrder'
import { useState } from 'react'

export const ModalPriority = ({ stylesModal, editIdItem, onClickCloseModal, onChangeSubmit }) => {
    const [editID] = useState(editIdItem)
    let test 
	return (
		<form
			className={stylesModal ? styles.modalAreaLight : styles.modalAreaDark}
			onSubmit={e => {
				e.preventDefault()
			}}>
			<HeaderTasksSides
				styles={styles.editTitle}
				icon={<i className='fa-solid fa-repeat'></i>}
				text='Change your task priority'
			/>
			<div className={styles.btnsArea}>
				<ButtonOrder className={stylesBtnOrder.btnLowOrder} icon={<i className='fa-solid fa-award'></i>} text='Low' onClick={() => {
                    onClickCloseModal()
                    test = 'low'
                    onChangeSubmit(editID, test)
                }}/>

				<ButtonOrder
					className={stylesBtnOrder.btnMediumOrder}
					icon={<i className='fa-solid fa-award'></i>}
					text='Medium'
                    onClick={() => {
                        onClickCloseModal()
                        test = 'medium'
                        onChangeSubmit(editID, test)
                    }}
				/>
				<ButtonOrder className={stylesBtnOrder.btnHighOrder} icon={<i className='fa-solid fa-award'></i>} text='High' onClick={() => {
                    onClickCloseModal()
                    test = 'high'
                    onChangeSubmit(editID, test)
                }}/>
			</div>
		</form>
	)
}
