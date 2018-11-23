import { BaseContext } from 'koa';
import Article, { IArticle } from '../model/article';

export default class ArticleController {
  // 获取文章列表
  public static async getArts ( ctx: BaseContext ) {
    const {current_page = 1, page_size = 10, keyword = '', tag = '', publish = "ALL" } = ctx.query;
    try {
      const querys: {
        publish?: number,
        $or?: any,
        tag?: any
      } = {};

      const fields = {
        content: false,
        __v: false
      };

      if ( publish === '0' ||  publish === '1' ) {
        querys.publish = Number(publish);
      }

      if (keyword !== '') {
        const keywordReg = new RegExp(keyword);
        querys.$or = [
            { 'title': keywordReg },
            { 'descript': keywordReg }
        ];
      }

      if (tag !== '') {
        querys.tag = {$in: [tag]};
      }

      const opts = {
        sort: { 'upadte_at': '-1' },
        skip: Number((current_page - 1) * page_size),
        limit: Number(page_size)
      };

      const res = await Article.find(querys, fields, opts).sort({
        'update_at': '-1'
      });
      const total = await Article.countDocuments(querys);

      ctx.body = {
        code: 1,
        msg: '获取文章列表成功',
        data: {
          list: res || [],
          pagination: {
            total: Number(total),
            current_page: Number(current_page),
            page_size: Number(page_size)
          }
        }
      };
    } catch (err) {
      console.log(err);
      ctx.body = {
        code: 0,
        msg: '服务内部错误'
      };
    }
  }
  // 添加文章
  public static async postArt ( ctx: any ) {
    try {
      const res = await new Article(ctx.request.body).save();
      if (res) {
        ctx.body = {
          code: 1,
          msg: '添加文章成功'
        };
        return;
      }
    } catch (err) {
      console.log(err);
    }
    ctx.body = {
      code: 0,
      msg: '添加文章失败,请检查表单是否填写完整'
    };
  }
  // 查看文章详情
  public static async getArt ( ctx: any ) {
    const _id = ctx.params.id;
    try {
      if ( !_id ) {
        ctx.body = {
          code: 0,
          msg: '无效参数'
        };
        return false; 
      }
      const res = await Article.findOne({_id});
      if ( res ) {
        ctx.body = {
          code: 1,
          msg: '获取文章成功',
          data: res
        };
      } else {
        ctx.body = {
          code: 0,
          msg: '获取文章失败'
        };
      }
    } catch (err) {
      ctx.body = {
        code: 0,
        msg: '获取文章详情失败'
      };
    }
  }
  // 修改文章
  public static async putArt ( ctx: any) {
    const _id = ctx.params.id;
    const { title = '', descript = '', tag = [], content = '', cover = '', publish = 0 } = ctx.request.body;
    try {
      if　( title === '' || descript === '' || tag.length === '' || content === '') {
        ctx.body = {
          code: 0,
          msg: '无效参数,title,descript,tag,content不能为空'
        };
        return false;
      }
      // 判断文章是否存在
      const art = await Article.findOne({_id});
      if ( !art ) {
        ctx.body = {
          code: 0,
          msg:　"文章不存在"
        };
        return false;
      }
      const res = await Article.findByIdAndUpdate(_id, {
        title, descript, tag, publish, cover, content
      }, { new: true});
      if ( res ) {
        ctx.body = {
          code: 1,
          msg: '修改成功'
        };
      }　else {
        ctx.body = {
          code: 0,
          msg: '修改失败'
        };
      }
    } catch (err) {
      console.log(err);
      ctx.body = {
        code: 0,
        msg: '修改失败'
      };
    }
  }
  // 删除文章
  public static async deleteArt ( ctx: any ) {
    const _id = ctx.params.id;
    try {
      if ( !_id ) {
        ctx.body = {
          code: 0,
          msg: '无效参数'
        };
        return;
      }
      const res = await Article.findByIdAndRemove(_id);
      if ( res ) {
        ctx.body = {
          code: 1,
          msg: '文章删除成功'
        };
      } else {
        ctx.body = {
          code: 0,
          msg: '文章删除失败'
        };
      }
    } catch (err) {
      ctx.body = {
        code: 0,
        msg: '删除文章失败'
      };
    }
  }
}
