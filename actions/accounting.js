
import ActionTypes from '@const/ActionTypes';

export const AddAccounting = (id, title) => ({
    type: ActionTypes.ADD_ACCOUNTING,
    id,
    title,
  });

export const UpdAccountingTitle = (id, title) => ({
    type: ActionTypes.UPD_ACCOUNTING_TITLE,
    id,
    title,
  });

export const UpdAccountingDate = (id, date) => ({
    type: ActionTypes.UPD_ACCOUNTING_DATE,
    id,
    date,
  });

export const UpdAccountingAmount = (id, amount) => ({
    type: ActionTypes.UPD_ACCOUNTING_AMOUNT,
    id,
    amount: parseInt(amount),
  });

export const UpdAccountingPayment = (aid, uid) => ({
    type: ActionTypes.UPD_ACCOUNTING_PAYMENT,
    aid,
    uid,
  });

export const UpdAccountingCredit = (aid, credit) => ({
    type: ActionTypes.UPD_ACCOUNTING_CREDIT,
    aid,
    credit,
  });

export const LoadAccounting = (json) => {
  let ary = [];
  ary = ary.concat(json['accountingMap']);
  ary = ary.map((ele) => {
    const key = ele.id;
    const obj = ele;
    return [key, obj];
  });
  return {
    type: ActionTypes.LOAD_ACCOUNTING,
    accountingAry: ary,
  };
};
