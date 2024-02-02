import { useState } from 'react'
import { HeaderTasksSides } from '../HeaderTasksSides/HeaderTasksSides'
import styles from './ModalEdit.module.scss'

export const ModalEdit = ({ stylesModal, editInputValue, editIdItem, onClickCloseModal, onEditSubmit }) => {
	const [inputError, setInputError] = useState(false)
	const [editInput, setEditInput] = useState(editInputValue)
	const [editLength, setEditLength] = useState(editInputValue.length)
	const [editID, setEditID] = useState(editIdItem)

	return (
		<form
			className={stylesModal ? styles.modalAreaLight : styles.modalAreaDark}
			onSubmit={e => {
				e.preventDefault()
			}}>
			<HeaderTasksSides
				styles={styles.editTitle}
				icon={<i className='fa-regular fa-pen-to-square'></i>}
				text='Edit your task'
			/>
			<div className={styles.editInputArea}>
				<p className={styles.numberOfLetters} onChange={() => {}}>
					{editLength == '' ? '0/40' : `${editLength}/40`}
				</p>
				<input
					type='text'
					value={editInput}
					maxLength={40}
					onChange={e => {
						setEditLength(e.target.selectionEnd)
						setEditInput(e.target.value)
						setInputError(false)
						return setEditID
					}}
					placeholder={inputError ? 'The field cannot be empty...' : 'Edit your task...'}
					className={inputError ? styles.inputEditError : styles.inputEdit}
				/>
			</div>
			<div className={styles.btnsArea}>
				<input
					type='submit'
					value='Accept'
					className={styles.btn}
					onClick={() => {
						if (editInput == '') {
							setInputError(true)
						} else {
							setInputError(false)
							onEditSubmit(editInput, editID)
						}
					}}
				/>
				<input type='submit' value='Cancel' className={styles.btn} onClick={onClickCloseModal} />
			</div>
		</form>
	)
}
