
import ActionTypes from '@const/ActionTypes.js';
import Immutable from 'immutable';

const initialState = {
  users: Immutable.Map(),
}

export default function userReducer(state=initialState, action){

  switch (action.type) {
    // ADD_USER (id, name)
    case ActionTypes.ADD_USER: {
      let {users} = state;

      users = users.set(action.id, {
        id: action.id,
        name: action.name,
      })

      return Object.assign({}, state, {users});
    }
    // UPD_USER_NAME (id, name)
    case ActionTypes.UPD_USER_NAME: {
      let {users} = state;

      let user = users.get(action.id);
      user = {
        ...user,
        name: action.name,
      }

      users = users.set(action.id, user);
      return Object.assign({}, state, {users});
    }
    // LOAD_USER (userAry)
    case ActionTypes.LOAD_USER:{
      const users = Immutable.Map(action.userAry);
      console.log('load user complete');
      // console.log(users);
      return Object.assign({}, state, {users});
    }
    default:
      return state;
  }
}
