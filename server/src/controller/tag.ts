import Tag, { ITag } from '../model/tag';
import Article from '../model/article';

export default class TagController {
  // 添加标签
  public static async postTag ( ctx: any ) {
    const { name, descript } = ctx.request.body;
    try {
      // 判断是否有同名标签
      const res = await Tag.find({name});
      if (res && res.length !== 0) {
        ctx.body = {
          code: 0,
          msg: '已存在同名标签'
        };
        return false;
      }

      const tag = await new Tag({ name, descript }).save();
      if (tag) {
        ctx.body = {
          code: 1,
          msg: '添加标签成功',
          data: tag
        };
      } else {
        ctx.body = {
          code: 0,
          msg: '添加标签失败'
        };
      }
    } catch (err) {
      console.log(err);
      ctx.body = {
        code: 0,
        msg: '服务器内部错误'
      };
    }
  }
  // 获取标签列表
  public static async getTags ( ctx: any ) {
    try {
      const res = await Tag.find();
      const opts = [
        { "$unwind": "$tag" },
        { "$group": {
          "_id": "$tag",
          "count": { "$sum": 1}
        }}
      ];
      const article_num_arr = await Article.aggregate(opts);

      const data = res.map((item: any) => {
        const index = article_num_arr.findIndex( item2 => {
          return item2._id.toString() === item._id.toString();
        });
        const temp = {
          _id: item._id,
          name: item.name,
          descript: item.descript,
          num: index > -1 ? article_num_arr[index].count : 0
        };
        return temp;
      });
      ctx.body = {
        code: 1,
        msg: '获取标签成功',
        data
      };
    } catch (err) {
      console.log(err);
      ctx.body = {
        code: 0,
        msg: '服务器内部错误'
      };
    }
  }
  // 修改标签
  public static async putTag ( ctx: any ) {
    const _id = ctx.params.id;
    const { name, descript } = ctx.request.body;

    try {
      if ( !_id ) {
        ctx.body = {
          code: 0,
          msg: '无效参数'
        };
        return false;
      }
      // 判断标签名是否重复
      const tag = await Tag.find({_id: {$ne: _id}, name});
      if (tag && tag.length !== 0) {
        ctx.body = {
          code: 0,
          msg: '已存在同名标签'
        };
        return false;
      }

      const res = await Tag.findOneAndUpdate({_id}, { name, descript }, { new: true });
      
      if (res) {
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
      console.log(err);
      ctx.body = {
        code: 0,
        msg: '服务器内部错误'
      };
    }
  }
  // 删除标签
  public static async deleteTag (ctx: any ) {
    const _id = ctx.params.id;
    try {
      if ( !_id ) {
        ctx.body = {
          code: 0,
          msg: '无效参数'
        };
        return false;
      }
      const res = await Tag.findOneAndRemove({_id});
      if (res) {
        ctx.body = {
          code: 1,
          msg: '删除成功'
        };
      } else {
        ctx.body = {
          code: 0,
          msg: '删除失败'
        };
      }
    } catch (err) {
      console.log(err);
      ctx.body = {
        code: 0,
        msg: '服务器内部异常'
      };
    }
  }
}
