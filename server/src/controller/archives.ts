import Article from '../model/article';

export default class ArchivesController {
  // 获取归档信息
  public static async getArch ( ctx: any ) {
    try {
      const res = await Article.find({}, {
        _id: true,
        title: true,
        create_at: true,
        update_at: true,
        publish: true
      }).sort({
        'update_at': '-1'
      });
      ctx.body = {
        code: 1,
        msg: '获取归档信息成功',
        data: res
      };
    } catch (err) {
      console.log(err);
      ctx.body = {
        code: 0,
        msg: "服务器异常"
      };
    }
  }
}
