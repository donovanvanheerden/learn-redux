var redux = require('redux');
var axios = require('axios');

// Pure function
// 1. Always return the same result, given the same input
// 2. Does not depend on variables outside of the method scope
// 3. Cannot have async requests, promises
// 4. Not allowed to update parameters

console.log('Starting redux example');

var actions = require('./actions/index');
var store = require('./store/configureStore').configure();

// Subscribe to changes
var unsubscribe = store.subscribe(() => {
  var state = store.getState();

  console.log('New state', store.getState());

  if (state.map.isFetching) {
    document.getElementById('app').innerHTML = 'Loading...';
  } else if (state.map.url) {
    document.getElementById('app').innerHTML = '<a target="_blank" href="'+state.map.url+'">View Your Link</a>';
  }

});

//unsubscribe();

var currentState = store.getState();
console.log('CurrentState', currentState);

store.dispatch(actions.fetchLocation());

store.dispatch(actions.changeName('Bobby'));

store.dispatch(actions.addHobby('Running'));

store.dispatch(actions.addHobby('Walking'));

store.dispatch(actions.removeHobby(2));

store.dispatch(actions.changeName('Donovan'));

store.dispatch(actions.addMovie('Mad Max','Action'));

store.dispatch(actions.addMovie('Transcendance','Sci-Fi'));

store.dispatch(actions.removeMovie(1));
