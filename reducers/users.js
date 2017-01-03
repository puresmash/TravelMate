
import ActionTypes from '@const/ActionTypes.js';

export default function userReducer(state={users: new Map()}, action){
  switch (action.type) {
    //
    // ADD_USER (id, name)
    case ActionTypes.ADD_USER: {
      let {users} = state;

      users = new Map(users);
      users.set(action.id, action.name);

      return Object.assign({}, state, {users});
    }
    // UPD_USER_NAME (id, name)
    case ActionTypes.UPD_USER_NAME: {
      let {users} = state;

      users = new Map(users);
      let user = users.get(action.id);
      user.name = action.name;

      return Object.assign({}, state, {users});
    }
    // LOAD_USER (userAry)
    case ActionTypes.LOAD_USER:{
      const users = new Map(action.userAry);
      console.log('load user complete');
      console.log(users);
      return Object.assign({}, state, {users});
    }
    default:
      return state;
  }
}
