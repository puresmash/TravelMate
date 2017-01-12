
import ActionTypes from '@const/ActionTypes';

export const AddUser = (id, name) => ({
    type: ActionTypes.ADD_USER,
    id,
    name,
  });

export const UpdUserName = (id, name) => ({
    type: ActionTypes.UPD_USER_NAME,
    id,
    name,
  });

//
export const LoadUser = (json) => {
  let ary = [];
  ary = ary.concat(json['users']);
  ary = ary.map((ele) => {
    const key = ele.id;
    const obj = ele;
    return [key, obj];
  });
  return {
    type: ActionTypes.LOAD_USER,
    userAry: ary,
  };
};
