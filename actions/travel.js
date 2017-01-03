
import ActionTypes from '@const/ActionTypes';

export const AddTravel = (id, title) => {
  return {
    type: ActionTypes.ADD_TRAVEL,
    id,
    title,
  }
}
// export const AddAccounting = (id, accounting) => {
//   return {
//     type: ActionTypes.UPD_RESTAURANT_NAME,
//     id,
//     accounting,
//   }
// }

export const UpdAccountingList = (tid, aidAry) => {
  return {
    type: ActionTypes.UPD_ACCOUNTING_LIST,
    tid,
    aidAry,
  }
}

export const UpdTravelTitle = (id, title) => {
  return {
    type: ActionTypes.UPD_TRAVEL_TITLE,
    id,
    title,
  }
}

export const LoadTravel = (json) =>{
  let ary = [];
  ary = ary.concat(json['Travel']);
  ary = ary.map((ele)=>{
    let key = ele.id;
    let obj = ele;
    return [key, obj];
  });
  return {
    type: ActionTypes.LOAD_TRAVEL,
    travelAry: ary,
  }
}
