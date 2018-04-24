const mapStateToProps = state => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    textOnInput: value => {
      dispatch(updateInput(value))
    },
    buttonOnClick: value => {
      dispatch(sendMessage(value))
    }
  }
}

import { connect } from 'react-redux'
​
const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)
​
export default VisibleTodoList