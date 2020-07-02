// import { cards as initialCards } from "../constants/cards"

const INITIAL_STATE = {
  tasks: [],
  isTaskDialogOpened: false,
  dialogProps: {},
  isSearchInputOpen: false,
  searchInputValue: "",
}

const appReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "OPEN_TASK_DIALOG":
      return { ...state, isTaskDialogOpened: true, dialogProps: action.dialogProps }
    case "CLOSE_TASK_DIALOG":
      return { ...state, isTaskDialogOpened: false, dialogProps: {} }
    case "OPEN_SEARCH_INPUT":
      return { ...state, isSearchInputOpen: true }
    case "CLOSE_SEARCH_INPUT":
      return { ...state, isSearchInputOpen: false }
    case "GET_TASKS":
      return { ...state, tasks: action.tasks }
    case "ADD_TASK":
      return { ...state, tasks: [...state.tasks, action.task] }
    case "SET_SEARCH_INPUT_VALUE":
      return { ...state, searchInputValue: action.searchInputValue }
    default:
      return state
  }
}

export const getIsTaskDialogOpened = state => state.isTaskDialogOpened
export const getIsTaskDialogProps = state => state.dialogProps
export const getIsSearchInputOpen = state => state.isSearchInputOpen
export const fetchTasks = state => state.tasks
export const getSearchInputValue = state => state.searchInputValue

export default appReducer
