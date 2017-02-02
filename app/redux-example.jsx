var redux = require('redux');

// Pure function
// 1. Always return the same result, given the same input
// 2. Does not depend on variables outside of the method scope
// 3. Cannot have async requests, promises
// 4. Not allowed to update parameters


console.log('Starting redux example');

var stateDefault = {
    name: 'Anonymous',
    hobbies: [],
    movies: []
  };

var nextHobbyId = 1;
var nextMovieId = 1;

var reducer = (state = stateDefault, action) => {
  //state = state || {name: 'Anonymous'};

  switch (action.type) {
      case 'CHANGE_NAME':
        return {
          ...state,
          name: action.name
        };
      case 'ADD_HOBBY':
        return {
          ...state,
          hobbies: [...state.hobbies,
            {
              id: nextHobbyId++,
              hobby: action.hobby
            }
          ]
        };
      case 'ADD_MOVIE':
        return {
          ...state,
          movies: [...state.movies,
            {
              id: nextMovieId++,
              title: action.title,
              genre: action.genre
            }
          ]
        };
      default:
        return state;
  }

  return state;
};

var store = redux.createStore(reducer, redux.compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

// Subscribe to changes
var unsubscribe = store.subscribe(() => {
  var state = store.getState();

  console.log('Name is', state.name);
  document.getElementById('app').innerHTML = state.name;

  console.log('New state', store.getState());
});

//unsubscribe();

var currentState = store.getState();
console.log('CurrentState', currentState);

store.dispatch({
  type: 'CHANGE_NAME',
  name: 'Donovan'
});

store.dispatch({
  type: 'ADD_HOBBY',
  hobby: 'Running'
});

store.dispatch({
  type: 'CHANGE_NAME',
  name: 'Bobby'
});

store.dispatch({
  type: 'ADD_MOVIE',
  title: 'Mad Max',
  genre: 'Action'
});
