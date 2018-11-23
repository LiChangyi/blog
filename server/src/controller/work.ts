import Work from '../model/work';

export default class WorkController {
  // 获取项目列表
  public static async getWorks ( ctx: any ) {
    try {
      const res = await Work.find();
      ctx.body = {
        code: 1,
        msg: '获取成功',
        data: res
      };
    } catch (err) {
      ctx.body = {
        code: 0,
        msg: '服务器内部异常'
      };
    }
  }
  // 添加项目
  public static async postWork ( ctx: any ) {   
    delete ctx.request.body._id;
    try { 
      const work = await new Work(ctx.request.body).save();
      if (work) {
        ctx.body = {
          code: 1,
          msg: '添加项目成功',
          data: work
        };
      } else {
        ctx.body = {
          code: 0,
          msg: '添加项目失败'
        };
      }
    } catch (err) {
      console.log(err);
      ctx.body = {
        code: 0,
        msg: '添加项目失败'
      };
    }
  }
  // 修改项目
  public static async putWork ( ctx: any ) {
    const _id = ctx.params.id;
    try {
      // 判断id是否正确
      const work = await Work.findOne({_id});
      if (!work) {
        ctx.body = {
          code: 0,
          msg: 'id参数错误'
        };
        return false;
      }
      const res = await Work.findByIdAndUpdate(_id, ctx.request.body, { new: true});
      if ( res ) {
        ctx.body = {
          code: 1,
          msg: '修改成功',
          data: res
        };
      } else {
        ctx.body = {
          code: 0,
          msg: '修改失败'
        };
      }
    } catch (err) {
      ctx.body = {
        code: 0,
        msg: '服务器内部错误'
      };
    }
  }
  // 删除项目
  public static async deleteWork ( ctx: any ) {
    const _id = ctx.params.id;
    try {
      // 判断id是否正确
      const work = await Work.findOne({_id});
      if (!work) {
        ctx.body = {
          code: 0,
          msg: 'id参数错误'
        };
        return false;
      }
      const res = await Work.findByIdAndRemove(_id);
      if ( res ) {
        ctx.body = {
          code: 1,
          msg: '项目删除成功'
        };
      } else {
        ctx.body = {
          code: 0,
          msg: '项目删除失败'
        };
      }
    } catch (err) {
      ctx.body = {
        code: 0,
        msg: '服务器内部错误'
      };
    }
  }
}
