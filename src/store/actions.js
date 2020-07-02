export const openTaskDialog = dialogProps => {
  return { type: "OPEN_TASK_DIALOG", dialogProps }
}

export const closeTaskDialog = () => {
  return { type: "CLOSE_TASK_DIALOG" }
}

export const getTasks = tasks => {
  return { type: "GET_TASKS", tasks }
}

export const addTask = task => {
  return { type: "ADD_TASK", task }
}

export const openSearchInput = () => {
  return { type: "OPEN_SEARCH_INPUT" }
}

export const closeSearchInput = () => {
  return { type: "CLOSE_SEARCH_INPUT" }
}

export const setSearchInputValue = searchInputValue => {
  return { type: "SET_SEARCH_INPUT_VALUE", searchInputValue }
}
