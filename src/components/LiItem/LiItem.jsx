import styles from './LiItem.module.scss'
import { ButtonOption } from '../ButtonOption/ButtonOption'

export const LiItem = ({stylesLi, done, stylesDeleteBtn, taskName, priorityIcon, changePriority, editIcon, editTask, taskDoneIcon, taskDone, deleteIcon, deleteTask, innerRef, dragHandleProps, draggableProps }) => {
	return (
		<li className={`${stylesLi} ${done ? styles.liDone : ''}`} ref={innerRef} {...dragHandleProps} {...draggableProps}>
			{taskName} <div className={styles.btnsOptionArea}><ButtonOption text={priorityIcon} onClick={changePriority}/> <ButtonOption className={styles.btnEdit} text={editIcon} onClick={editTask}/> <ButtonOption className={styles.btnDone} text={taskDoneIcon} onClick={taskDone}/> <ButtonOption className={stylesDeleteBtn} text={deleteIcon} onClick={deleteTask}/></div>
		</li>
	)
}
