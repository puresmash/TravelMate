
import ActionTypes from '@const/ActionTypes.js';
import Immutable from 'immutable';
import { REHYDRATE } from 'redux-persist/constants';

const initialState = {
  users: Immutable.Map(),
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    // ADD_USER (id, name)
    case ActionTypes.ADD_USER: {
      let { users } = state;

      users = users.set(action.id, {
        id: action.id,
        name: action.name,
      });

      return Object.assign({}, state, { users });
    }
    // UPD_USER_NAME (id, name)
    case ActionTypes.UPD_USER_NAME: {
      let { users } = state;

      let user = users.get(action.id);
      user = {
        ...user,
        name: action.name,
      };

      users = users.set(action.id, user);
      return Object.assign({}, state, { users });
    }
    // LOAD_USER (userAry)
    case ActionTypes.LOAD_USER: {
      const users = Immutable.Map(action.userAry);
      console.log('load user complete');
      // console.log(users);
      return Object.assign({}, state, { users });
    }

    case REHYDRATE: {
      const incoming = action.payload.userReducer;
      // console.log('------REHYDRATE USER------');
      // console.log(action.payload);
      if (incoming) {
        // console.log(incoming.users);
        const users = Immutable.Map(incoming.users);
        return Object.assign({}, state, { users });
      }
      return state;
    }

    default:
      return state;
  }
}
