var redux = require('redux');

// Pure function
// 1. Always return the same result, given the same input
// 2. Does not depend on variables outside of the method scope
// 3. Cannot have async requests, promises
// 4. Not allowed to update parameters


console.log('Starting redux example');

var stateDefault = {
  searchText: '',
  showCompleted: false,
  todos: []
}

var reducer = (state = stateDefault, action) => {

  switch(action.type) {
    case 'CHANGE_SEARCH_TEXT':
      return {
        ...state,
        searchText: action.searchText
      };
    default:
      return state
  }

  return state;
};

var store = redux.createStore(reducer, redux.compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

// Subscribe to changes
var unsubscribe = store.subscribe(() => {
  var state = store.getState();

  console.log('SearchText is', state.searchText);
  document.getElementById('app').innerHTML = state.searchText;
});

//unsubscribe();

console.log('CurrentState', store.getState());

store.dispatch({
  type: 'CHANGE_SEARCH_TEXT',
  searchText: '123'
});

store.dispatch({
  type: 'CHANGE_SEARCH_TEXT',
  searchText: 'abc'
});

store.dispatch({
  type: 'CHANGE_SEARCH_TEXT',
  searchText: 'xyz'
});
