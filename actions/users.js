
import ActionTypes from '@const/ActionTypes';

export const AddUser = (id, name) => {
  return {
    type: ActionTypes.ADD_USER,
    id,
    name,
  }
}
export const UpdUserName = (id, name) => {
  return {
    type: ActionTypes.UPD_USER_NAME,
    id,
    name,
  }
}

export const LoadUser = (json) =>{
  let ary = [];
  ary = ary.concat(json['users']);
  ary = ary.map((ele)=>{
    let key = ele.id;
    let obj = ele;
    return [key, obj];
  })
  return {
    type: ActionTypes.LOAD_USER,
    userAry: ary,
  }
}
