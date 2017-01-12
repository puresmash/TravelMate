
import ActionTypes from '@const/ActionTypes';

export const AddTravel = (id, title) => ({
    type: ActionTypes.ADD_TRAVEL,
    id,
    title,
  });

export const UpdAccountingList = (tid, aidAry) => ({
    type: ActionTypes.UPD_ACCOUNTING_LIST,
    tid,
    aidAry,
  });

export const UpdTravelTitle = (id, title) => ({
    type: ActionTypes.UPD_TRAVEL_TITLE,
    id,
    title,
  });

export const UpdTravelDate = (id, date) => ({
    type: ActionTypes.UPD_TRAVEL_DATE,
    id,
    date,
  });

//
export const LoadTravel = (json) => {
  let ary = [];
  ary = ary.concat(json['travels']);
  ary = ary.map((ele) => {
    const key = ele.id;
    const obj = ele;
    return [key, obj];
  });
  return {
    type: ActionTypes.LOAD_TRAVEL,
    travelAry: ary,
  };
};
