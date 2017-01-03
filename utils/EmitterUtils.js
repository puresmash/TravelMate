
import EventEmitter from 'EventEmitter';
const emitter = new EventEmitter();
export default class EmitterUtils extends EventEmitter{
  static emit(eventName){
    emitter.emit(eventName);
  }
  static on(eventName, cb){
    if(!emitter.listeners(eventName).length)
      emitter.addListener(eventName, cb);
  }
}
