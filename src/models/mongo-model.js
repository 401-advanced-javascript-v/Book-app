'use strict';

class MongoModel {
  /**
   * schema constructor for mongo model
   * @param {*} schema 
   */
  constructor(schema) {
    this.schema = schema;
  }

  /**
   * model for get method
   * @param {*} id 
   */
  get(_id) {
    let queryObject = _id ? {_id} : {};
    return this.schema.find(queryObject);
  }
  
  /**
   * model for post method
   * @param {} entry 
   */
  post(record) {
    let newRecord = new this.schema(record);
    return newRecord.save();
  }

  /**
   * model for put method
   * @param {} entry 
   */
  put(_id, record) {
    return this.schema.findByIdAndUpdate(_id, record, {new:true});
  }

  /**
   * model for delete method
   * @param {} entry 
   */
  delete(_id) {
    return this.schema.findByIdAndDelete(_id);
  }

}

module.exports = MongoModel;