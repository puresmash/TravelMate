

export default class NavigatorHelper{

  static setNav = (navigator)=>{
    NavigatorHelper.instance = new NavigatorHelper(navigator);
  };

  static push = (route)=>{
    if(!NavigatorHelper.instance || !NavigatorHelper.instance.navigator){
      console.error('Should setNav before using helper');
      return null;
    }
    return NavigatorHelper.instance.navigator.push(route);
  };

  static setBtnRight = (component)=>{
    NavigatorHelper.instance.btnRight = component;
  }
  static getBtnRight = ()=>{
    return NavigatorHelper.instance.btnRight;
  }

  constructor(navigator){
    this.navigator = navigator;
  }
}
