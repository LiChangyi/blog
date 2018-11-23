const sha1 = require('sha1');
import User, { IUser } from '../model/user';
import Set, { ISet } from '../model/set';
import { PWDADDSTR } from '../config';
import Token from '../utils/token';

export default class UserController {
  // 用户注册
  public static async postUser ( ctx: any ) {
    const { userId = '', name = '', rePwd = '', registrationCode = '', codeToken = '', code = '' } = ctx.request.body;
    let {  pwd = '' } = ctx.request.body;
    try { 
      if ( userId === '' || name === '' || pwd === '') {
        ctx.body = {
          code: 0,
          msg: '请填写完表单信息'
        };
        return;
      }
      if ( pwd !== rePwd ) {
        ctx.body = {
          code: 0,
          msg: '2次密码输入不一致'
        };
        return;
      }
      // 判断验证码是否正确
      const bool = await Token.checkCheckcode(code, codeToken);
      if ( !bool ) {
        ctx.body = {
          code: 0,
          msg: '验证码错误'
        };
        return;
      }
      // 判断注册码是否正确
      // 获取注册吗
      const set: ISet | null = await Set.findOne();
      const REGISTRATIONCODE = set === null ? '' : set.registrationCode;
      if ( registrationCode !== REGISTRATIONCODE ) {
        ctx.body = {
          code: 0,
          msg: '注册码错误'
        };
        return;
      }
      // 判断userId是否重复
      const res = await User.find({userId});
      if ( res.length !== 0 ) {
        ctx.body = {
          code: 0,
          msg: '账号id重复,换一个吧'
        };
        return;
      }
      pwd = sha1(sha1(pwd + PWDADDSTR));
      const user = await new User({ userId, name, pwd }).save();
      if ( user ) {
        ctx.body = {
          code: 1,
          msg: '注册成功,请去登录吧'
        };
      } else {
        ctx.body = {
          code: 0,
          msg: '注册失败'
        };
      }
    } catch (err) {
      ctx.status = 500;
      ctx.body = {
        code: 0,
        msg: '服务器内部错误'
      };
    }
  }
  // 用户登录
  public static async postLogin ( ctx: any ) {
    const { userId = '', codeToken = '' , code = ''} = ctx.request.body;
    let { pwd = '' } = ctx.request.body;
    try {
      if ( userId === '' || pwd === '' || code === '' ) {
        ctx.body = {
          code: 0,
          msg: '请填写完表单信息'
        };
        return;
      }
      // 验证验证码
      const bool = await Token.checkCheckcode(code, codeToken);
      if ( !bool ) {
        ctx.body = {
          code: 0,
          msg: '验证码错误'
        };
        return;
      }
      // 验证账号&密码
      pwd = sha1(sha1( pwd + PWDADDSTR));
      const user: IUser | null = await User.findOne({userId, pwd});
      if ( user === null ) {
        ctx.body = {
          code: 0,
          msg: '账号或者密码错误'
        };
        return;
      }
      // 生成token
      const token = await Token.createToken(userId);
      user.token = token;
      user.save();
      ctx.body = {
        code: 1,
        msg: '登录成功',
        data: {
          _id: user._id,
          userId: user.userId,
          name: user.name,
          token
        }
      };

    } catch (err) {
      ctx.status = 500;
      ctx.body = {
        code: 0,
        msg: '服务内部错误'
      };
    }
  }
  // 登录密码修改
  public static async putUser ( ctx: any ) {
    const _id = ctx.params.id;
    const { oldPwd = '', pwd = '', rePwd = ''} = ctx.request.body;
    try {
      if ( oldPwd === '' || pwd === '') {
        ctx.body = {
          code: 0,
          msg: '表单信息不完整'
        };
        return;
      }
      if ( pwd !== rePwd ) {
        ctx.body = {
          code: 0,
          msg: '2次密码输入不一致'
        };
        return;
      }
      const user: IUser|null = await User.findOne({_id, pwd: sha1(sha1(oldPwd + PWDADDSTR))});
      if ( user === null ) {
        ctx.body = {
          code: 0,
          msg: '原密码错误'
        };
        return;
      }
      user.pwd = sha1(sha1(pwd + PWDADDSTR ));
      const res = await user.save();
      if ( res ) {
        ctx.body = {
          code: 1,
          msg: '密码修改成功'
        };
      } else {
        ctx.body = {
          code: 0,
          msg: '密码修改失败,服务器异常'
        };
      }
    } catch ( err ) {
      ctx.status = 500;
      ctx.body = {
        code: 0,
        msg: '服务器内部错误'
      };
    }
  }
}
