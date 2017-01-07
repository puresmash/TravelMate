
import ActionTypes from '@const/ActionTypes';

export const AddAccounting = (id, title) => {
  return {
    type: ActionTypes.ADD_ACCOUNTING,
    id,
    title,
  }
}
export const UpdAccountingTitle = (id, title) => {
  return {
    type: ActionTypes.UPD_ACCOUNTING_TITLE,
    id,
    title,
  }
}
export const UpdAccountingDate = (id, date) => {
  return {
    type: ActionTypes.UPD_ACCOUNTING_DATE,
    id,
    date,
  }
}
export const UpdAccountingAmount = (id, amount) => {
  return {
    type: ActionTypes.UPD_ACCOUNTING_AMOUNT,
    id,
    amount: parseInt(amount),
  }
}
export const UpdAccountingPayment = (aid, uid) => {
  return {
    type: ActionTypes.UPD_ACCOUNTING_PAYMENT,
    aid,
    uid,
  }
}
export const UpdAccountingCredit = (aid, credit) => {
  return {
    type: ActionTypes.UPD_ACCOUNTING_CREDIT,
    aid,
    credit,
  }
}

export const LoadAccounting = (json) =>{
  let ary = [];
  ary = ary.concat(json['accountingMap']);
  ary = ary.map((ele)=>{
    let key = ele.id;
    let obj = ele;
    return [key, obj];
  });
  return {
    type: ActionTypes.LOAD_ACCOUNTING,
    accountingAry: ary,
  }
}
