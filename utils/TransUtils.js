
export default class TransUtils{

  static keysArray = (map) => {
    let ary = [];
    for (const key of map.keys()){
      ary.push(key);
    }
    return ary;
  }
  static valuesArray = (map) => {
    let ary = [];
    for (const key of map.values()){
      ary.push(key);
    }
    return ary;
  }
  static genMapWithZeroVal = (keys)=> {
    let map = new Map();
    keys.forEach((key)=>{
      map.set(key, 0);
    })
    return map;
  }
}
