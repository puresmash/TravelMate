
import ActionTypes from '@const/ActionTypes.js';
import Immutable from 'immutable';

export default function travelReducer(state={travels: Immutable.Map()}, action){

  switch (action.type) {

    // ADD_PAYMENT: 'ADD_PAYMENT',
    // ADD_CREDIT: 'ADD_CREDIT',
    // ADD_AMOUNT: 'ADD_AMOUNT',

    // UPD_TRAVEL_DATE: 'UPD_TRAVEL_DATE',


    // ADD_TRAVEL (id, title)
    case ActionTypes.ADD_TRAVEL: {
      let {travels} = state;

      travels = travels.set(action.id, {
        id: action.id,
        title: action.title,
      });

      return Object.assign({}, state, {travels});
    }
    // UPD_ACCOUNTING_LIST (tid, aidAry)
    case ActionTypes.UPD_ACCOUNTING_LIST: {
      let {travels} = state;

      let travel = travels.get(action.tid);
      travel = {
        ...travel,
        accounting: action.aidAry,
      }
      travels = travels.set(action.tid, travel);

      return Object.assign({}, state, {travels});
    }
    // UPD_TRAVEL_TITLE (id, title)
    case ActionTypes.UPD_TRAVEL_TITLE: {
      let {travels} = state;

      let travel = travels.get(action.id);

      // 1 Correct usage
      travel = {
        ...travel,
        title: action.title,
      }
      // 2 Wrong usage
      // travel.title = action.title;

      travels = travels.set(action.id, travel);

      return Object.assign({}, state, {travels});
    }
    // LOAD_TRAVEL (travelAry)
    case ActionTypes.LOAD_TRAVEL:{
      const travels = Immutable.Map(action.travelAry);
      console.log('load travel complete');
      console.log(travels);
      return Object.assign({}, state, {travels});
    }
    default:
      return state;
  }
}
