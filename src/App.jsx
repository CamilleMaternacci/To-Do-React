import styles from './App.module.scss'
import stylesColorSwitch from './components/ButtonSwitch/ButtonSwitch.module.scss'
import stylesHeaders from './components/HeaderTasksSides/HeaderTasksSides.module.scss'
import styleLi from './components/LiItem/LiItem.module.scss'
import { HeaderApp } from './components/HeaderApp/HeaderApp'
import { useEffect, useState } from 'react'
import { HeaderTasksSides } from './components/HeaderTasksSides/HeaderTasksSides'
import { InputsArea } from './components/InputsArea/InputsArea'
import { LiItem } from './components/LiItem/LiItem'
import { ModalEdit } from './components/ModalEdit/ModalEdit'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { ModalPriority } from './components/ModalPriority/ModalPriority'

function App() {
	const [colorSwitch, setColorSwitch] = useState(localStorage.getItem('selected_mode_light') === 'true')
	const [showModalPriority, setShowModalPriority] = useState(false)
	const [showModal, setShowModal] = useState(false)
	const [editInput, setEditInput] = useState('')
	const [editId, setEditId] = useState('')
	const [priorityId, setPriorityId] = useState('')
	const [filter, setFilter] = useState('all')

	const storedData = localStorage.getItem('todos')
	const initialTasks = storedData ? JSON.parse(storedData) : []

	const [todos, setTodos] = useState(Array.isArray(initialTasks) ? initialTasks : [])

	useEffect(() => {
		const savedThemeLight = localStorage.getItem('selected_mode_light') === 'true'

		if (savedThemeLight !== colorSwitch) {
			setColorSwitch(savedThemeLight)
		}
	}, [colorSwitch])

	useEffect(() => {
		const tasksJSON = JSON.stringify(todos)

		localStorage.setItem('todos', tasksJSON)
	}, [todos])

	const handleDragDropEnd = result => {
		const { source, destination } = result

		if (!destination) return

		if (source.droppableId === destination.droppableId && source.index === destination.index) return

		const updatedTodos = [...todos]
		const [reorderedItem] = updatedTodos.splice(source.index, 1)
		updatedTodos.splice(destination.index, 0, reorderedItem)

		setTodos(updatedTodos)
	}

	const filteredTasks = todos.filter(task => {
		if (filter === 'all') {
			return true
		} else {
			return task.priority === filter
		}
	})

	return (
		<div className={colorSwitch ? styles.appLight : styles.appDark}>
			<div className={colorSwitch ? styles.appAreaLight : styles.appAreaDark}>
				<HeaderApp
					stylesHeader={colorSwitch ? true : false}
					stylesBtnDark={!colorSwitch ? stylesColorSwitch.buttonDarkActive : stylesColorSwitch.buttonSwitchDark}
					onClickLight={() => {
						localStorage.setItem('selected_mode_light', 'true')
						setColorSwitch(true)
					}}
					onClickDark={() => {
						localStorage.setItem('selected_mode_light', 'false')
						setColorSwitch(false)
					}}
				/>
				<div className={styles.mainArea}>
					<div className={colorSwitch ? styles.leftSideAreaLight : styles.leftSideAreaDark}>
						<HeaderTasksSides
							styles={stylesHeaders.leftSideHeader}
							icon={<i className='fa-regular fa-pen-to-square'></i>}
							text='Make New Task'
						/>
						<div className={styles.inputsArea}>
							<InputsArea
								stylesCreateBtn={colorSwitch ? true : false}
								onFormSubmit={(newTodoName, selectedPriority) => {
									if (selectedPriority[0] === 'low') {
										selectedPriority = 'low'
									} else if (selectedPriority[1] === 'medium') {
										selectedPriority = 'medium'
									} else if (selectedPriority[2] === 'high') {
										selectedPriority = 'high'
									}

									const newTodo = {
										nameTask: newTodoName,
										done: false,
										priority: selectedPriority,
										id: todos.length + 1,
									}

									setTodos(prevTodos => {
										const updatedTodos = [...prevTodos, newTodo]
										localStorage.setItem('todos', JSON.stringify(updatedTodos))
										return updatedTodos
									})
								}}
							/>
						</div>
					</div>
					<div className={colorSwitch ? styles.rightSideAreaLight : styles.rightSideAreaDark}>
						<HeaderTasksSides
							stylesHeaderTasks={colorSwitch ? true : false}
							icon={<i className='fa-regular fa-note-sticky'></i>}
							text='All Tasks'
						/>
						<div className={styles.taskGroupArea}>
							<select
								value={filter}
								className={styles.select}
								onChange={e => {
									setFilter(e.target.value)
									console.log(e.target.value)
								}}>
								<option value='all'>All Task</option>
								<option value='low'>Low</option>
								<option value='medium'>Medium</option>
								<option value='high'>High</option>
							</select>
							<button
								className={styles.btnClearAll}
								onClick={() => {
									setTodos([])
								}}>
								Clear All
							</button>
						</div>

						<DragDropContext onDragEnd={handleDragDropEnd}>
							<Droppable droppableId='root'>
								{provided => (
									<ul className={styles.ulList} ref={provided.innerRef} {...provided.droppableProps}>
										{filteredTasks.map(({ id, nameTask, priority, done }, index) => (
											<Draggable draggableId={id.toString()} key={id} index={index}>
												{provided => (
													<LiItem
														innerRef={provided.innerRef}
														dragHandleProps={{ ...provided.dragHandleProps }}
														draggableProps={{ ...provided.draggableProps }}
														stylesLi={colorSwitch ? `${styleLi.liLight}` : `${styleLi.liDark}`}
														stylesDeleteBtn={colorSwitch ? `${styleLi.btnDeleteLight}` : `${styleLi.btnDeleteDark}`}
														taskName={nameTask}
														priorityIcon={
															priority === 'low' ? (
																<i className={`fa-solid fa-award ${styleLi.btnPriorityLow}`}></i>
															) : priority === 'medium' ? (
																<i className={`fa-solid fa-award ${styleLi.btnPriorityMedium}`}></i>
															) : priority === 'high' ? (
																<i className={`fa-solid fa-award ${styleLi.btnPriorityHigh}`}></i>
															) : null
														}
														editIcon={<i className='fa-solid fa-file-pen'></i>}
														taskDoneIcon={<i className='fa-solid fa-check'></i>}
														deleteIcon={<i className='fa-solid fa-trash-can'></i>}
														changePriority={() => {
															setShowModalPriority(true)
															setTodos(prevTodos =>
																prevTodos.map(todo => {
																	if (todo.id == id) {
																		setPriorityId(todo.id)
																		console.log(todo.id)
																	}
																	return todo
																})
															)
														}}
														editTask={() => {
															setShowModal(true)
															setTodos(prevTodos =>
																prevTodos.map(todo => {
																	if (todo.id == id) {
																		setEditInput(todo.nameTask)
																		setEditId(todo.id)
																	}
																	return todo
																})
															)
														}}
														deleteTask={() => {
															setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id))
														}}
														done={done}
														taskDone={e => {
															setTodos(prevTodos =>
																prevTodos.map(todo => {
																	if (e.target && todo.done == true && todo.id == id) {
																		return {
																			...todo,
																			done: false,
																		}
																	}
																	if (todo.id !== id) {
																		return todo
																	} else {
																		return {
																			...todo,
																			done: true,
																		}
																	}
																})
															)
														}}
													/>
												)}
											</Draggable>
										))}
										{provided.placeholder}
									</ul>
								)}
							</Droppable>
						</DragDropContext>

						{showModalPriority && (
							<ModalPriority
								stylesModal={colorSwitch ? true : false}
								editIdItem={priorityId}
								onChangeSubmit={(idEdit, newEditIcon) => {
									setTodos(prevTodos =>
										prevTodos.map(todo => {
											if (todo.id !== idEdit) {
												return todo
											}

											return {
												...todo,
												priority: newEditIcon,
												id: idEdit,
											}
										})
									)
								}}
								onClickCloseModal={() => {
									setShowModalPriority(false)
								}}
							/>
						)}

						{showModal && (
							<ModalEdit
								stylesModal={colorSwitch ? true : false}
								editInputValue={editInput}
								editIdItem={editId}
								onEditSubmit={(newEditTodo, idEdit) => {
									setTodos(
										prevTodos =>
											prevTodos.map(todo => {
												if (todo.id !== idEdit) {
													return todo
												}

												return {
													...todo,
													nameTask: newEditTodo,
													id: idEdit,
												}
											}),
										setShowModal(false)
									)
								}}
								onClickCloseModal={() => setShowModal(false)}
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default App
