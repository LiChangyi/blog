/*
 * @Author: Pawn 
 * @Date: 2018-08-14 16:16:22 
 * @Last Modified by: Pawn
 * @Last Modified time: 2018-08-14 17:16:17
 */
const Admin = require('../db').Admin;

module.exports = {
  find_by_admin_id(admin_id){
    return Admin.find({admin_id}, (err,doc) => {
      return err?[]:doc;
    })
  },
  update(_id,json){
    return Admin.findByIdAndUpdate(_id, json, { new: true },(err, doc) => {
      return err?false:true;
    })
  },
}