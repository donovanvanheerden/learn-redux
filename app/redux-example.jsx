var redux = require('redux');

// Pure function
// 1. Always return the same result, given the same input
// 2. Does not depend on variables outside of the method scope
// 3. Cannot have async requests, promises
// 4. Not allowed to update parameters


console.log('Starting redux example');

var reducer = (state = {name: 'Anonymous'}, action) => {
  //state = state || {name: 'Anonymous'};

  switch (action.type) {
      case 'CHANGE_NAME':
        return {
          ...state,
          name: action.name
        };
      default:
        return state;
  }

  return state;
};

var store = redux.createStore(reducer);

var currentState = store.getState();
console.log('CurrentState', currentState);


var action = {
  type: 'CHANGE_NAME',
  name: 'Donovan'
};

store.dispatch(action);

console.log('Name should be Donovan', store.getState());
