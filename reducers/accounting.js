
import ActionTypes from '@const/ActionTypes.js';
import Immutable from 'immutable';

const initialState = {
  accountingMap: Immutable.Map(),
};

export default function accountingReducer(state=initialState, action){

  switch (action.type) {
    // ADD_ACCOUNTING (id, title)
    case ActionTypes.ADD_ACCOUNTING: {
      let {accountingMap} = state;

      accountingMap = accountingMap.set(action.id, {
        id: action.id,
        title: action.title,
      });

      return Object.assign({}, state, {accountingMap});
    }
    // UPD_ACCOUNTING_TITLE (id, title)
    case ActionTypes.UPD_ACCOUNTING_TITLE: {
      let {accountingMap} = state;

      let acc = accountingMap.get(action.id);
      acc = {
        ...acc,
        title: action.title,
      }

      accountingMap = accountingMap.set(action.id, acc);
      return Object.assign({}, state, {accountingMap});
    }
    // UPD_ACCOUNTING_DATE (id, date)
    case ActionTypes.UPD_ACCOUNTING_DATE: {
      let {accountingMap} = state;

      let acc = accountingMap.get(action.id);
      acc = {
        ...acc,
        date: action.date,
      }

      accountingMap = accountingMap.set(action.id, acc);
      return Object.assign({}, state, {accountingMap});
    }
    // UPD_ACCOUNTING_AMOUNT (id, amount)
    case ActionTypes.UPD_ACCOUNTING_AMOUNT: {
      let {accountingMap} = state;

      let acc = accountingMap.get(action.id);
      acc = {
        ...acc,
        amount: action.amount,
      }

      accountingMap = accountingMap.set(action.id, acc);
      return Object.assign({}, state, {accountingMap});
    }
    // UPD_ACCOUNTING_PAYMENT (aid, uid)
    case ActionTypes.UPD_ACCOUNTING_PAYMENT: {
      let {accountingMap} = state;

      let acc = accountingMap.get(action.aid);
      acc = {
        ...acc,
        payment: action.uid,
      }

      accountingMap = accountingMap.set(action.aid, acc);
      return Object.assign({}, state, {accountingMap});
    }
    // UPD_ACCOUNTING_CREDIT (aid, credit)
    case ActionTypes.UPD_ACCOUNTING_CREDIT: {
      let {accountingMap} = state;

      let acc = accountingMap.get(action.aid);
      acc = {
        ...acc,
        credit: action.credit,
      }

      accountingMap = accountingMap.set(action.aid, acc);
      return Object.assign({}, state, {accountingMap});
    }
    // LOAD_ACCOUNTING (accountingAry)
    case ActionTypes.LOAD_ACCOUNTING:{
      const accountingMap = Immutable.Map(action.accountingAry);
      console.log('load accounting complete');
      console.log(accountingMap);
      return Object.assign({}, state, {accountingMap});
    }
    default:
      return state;
  }
}
