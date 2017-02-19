var redux = require('redux');

// Pure function
// 1. Always return the same result, given the same input
// 2. Does not depend on variables outside of the method scope
// 3. Cannot have async requests, promises
// 4. Not allowed to update parameters


console.log('Starting redux example');

// Name reducer and action generators
// ----------------------------------------------
var nameReducer = (state = 'Anonymous', action) => {
  switch (action.type) {
    case 'CHANGE_NAME':
      return action.name;
    default:
      return state;
  }
};

var changeName = (name) => {
  return {
    type: 'CHANGE_NAME',
    name
  }
};


// Hobby reducer and action generators
// ----------------------------------------------
var nextHobbyId = 1;
var hobbyReducer = (state = [], action) => {
  switch(action.type) {
    case 'ADD_HOBBY':
      return [...state,
          {
            id: nextHobbyId++,
            hobby: action.hobby
          }
        ];
    case 'REMOVE_HOBBY':
      return state.filter((hobby) => hobby.id !== action.id) ;
    default:
      return state;
  }
};

var addHobby = (hobby) => {
  return {
    type: 'ADD_HOBBY',
    hobby
  }
};

var removeHobby = (id) => {
  return {
    type: 'REMOVE_HOBBY',
    id
  }
};

// Movie reducer and action generators
// ----------------------------------------------
var nextMovieId = 1;
var movieReducer = (state = [], action) => {
  switch(action.type) {
    case 'ADD_MOVIE':
      return [...state,
          {
            id: nextMovieId++,
            title: action.title,
            genre: action.genre
          }
      ];
    case 'REMOVE_MOVIE':
      return state.filter((movie) => movie.id !== action.id);
    default:
      return state;
  }
}

var addMovie = (title, genre) => {
  return {
    type: 'ADD_MOVIE',
    title,
    genre
  }
};

var removeMovie = (id) => {
  return {
    type: 'REMOVE_MOVIE',
    id
  }
}

var reducer = redux.combineReducers({
  name: nameReducer,
  hobby: hobbyReducer,
  movie: movieReducer
});

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

store.dispatch(changeName('Bobby'));

store.dispatch(addHobby('Running'));

store.dispatch(addHobby('Walking'));

store.dispatch(removeHobby(2));

store.dispatch(changeName('Donovan'));

store.dispatch(addMovie('Mad Max','Action'));

store.dispatch(addMovie('Transcendance','Sci-Fi'));

store.dispatch(removeMovie(1));
