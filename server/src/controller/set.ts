import Set from '../model/set';
import { isLogin } from '../utils/token';

export default class SetController {
  // 导出设置
  public static async getSet ( ctx: any ) {
    try {
      const fields: {
        qiniu?: boolean,
        registrationCode?: boolean
      } = {};
      // 判断用户是否登录,如果没有登录,则不返回七牛云的配置
      const mark = await isLogin(ctx);
      if ( !mark ) {
        fields.qiniu = false;
        fields.registrationCode = false;
      }
      let set = await Set.findOne({}, fields);
      // 如果没有新建一个
      if ( set === null ) {
         set = await new Set().save();
      }
      ctx.body = {
        code: 1,
        msg: '获取成功',
        data: set
      };
    } catch (err) {
      ctx.status = 500;
      ctx.body = {
        code: 0,
        msg: '服务器内部错误'
      };
    }
  }
  // 修改设置
  public static async putSet ( ctx: any ) {
    delete ctx.request.body._id;
    try {
      // 判断当前数据库中是否存在set,如果不存在创建新的
      const res = await Set.find();
      if ( res.length === 0 ) {
        await new Set().save();
      } 
      const set = await Set.findOneAndUpdate({}, ctx.request.body, { new: true});
      ctx.body = {
        code: 1,
        msg: '更新成功',
        data: set
      };
    } catch (err) {
      ctx.status = 500;
      ctx.body = {
        code: 0,
        msg: '服务器内部错误'
      };
    }
  }
}
