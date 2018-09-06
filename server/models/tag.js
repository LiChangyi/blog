/*
 * @Author: Pawn 
 * @Date: 2018-08-13 16:50:32 
 * @Last Modified by: Pawn
 * @Last Modified time: 2018-08-14 14:34:27
 */
const Tag = require("../db").Tag

module.exports = {
  find_by_tagName (tags_name){
    return Tag.find({tags_name}, (err,doc) => {
      return err?[]:doc;
    })
  },
  find_all(){
    return Tag.find({}, (err,doc) => {
      return err?[]:doc;
    })
  },
  find_by_id(_id){
    return Tag.find({_id}, (err,doc) => {
      return err?[]:doc;
    })
  },
  update(_id,json){
    return Tag.findByIdAndUpdate(_id, json, { new: true },(err, doc) => {
      return err?false:true;
    })
  },
  delete(_id){
    return Tag.findByIdAndRemove(_id, (err,doc) => {
      return err?false:true;
    })
  }
}