import * as jwt from 'jsonwebtoken';
import User from '../model/user';
import CheckCode from '../model/checkcode';
import { JWT_ADD_STR, TOKEN_ENCODE_STR } from '../config';

export const isLogin = async (ctx: any) => {
  try {
    const token = ctx.get("Authorization");
    const { userId = '' }: any = await jwt.verify(token, JWT_ADD_STR);
    // 验证token 与 userId 是否匹对,防止多次登录
    const user = await User.findOne({userId, token});
    if ( user === null ) {
      return false;
    }

  } catch (err) {
    return false;
  }
  return true;
};

// 中间件,访问隐私资源限制
export const auth = async ( ctx: any , next: any) => {
  const mark = await isLogin(ctx);
  if ( mark ) {
    await next();
  } else {
    // 没有登录的
    ctx.status = 401;
    ctx.body = {
      code: 0,
      msg: '请先登录'
    };
    return;
  }
};

export default class Token {
  // 生成用户登录token
  public static async createToken ( userId: string) {
    return await jwt.sign({
      userId
    }, JWT_ADD_STR , {
      expiresIn: '1h' 
    });
  }
  // 生成验证码token 
  public static async createCodeToken ( code: string) {
    return await jwt.sign({
      code
    }, TOKEN_ENCODE_STR , {
      // 验证码过期时间5分钟
      expiresIn: '5m'
    });
  }
  // 验证验证码是否正确
  public static async checkCheckcode ( code: string, token: string) {
    try {
      // 判断验证码是否过期了
      await jwt.verify(token, TOKEN_ENCODE_STR);
      // 读数据库，删除验证码
      const res = await CheckCode.findOne({token, code: code.toUpperCase()});
      if (res === null) {
        return false;
      }
    } catch (e) {
      return false;
    }
    // 删除数据库中的验证码
    await CheckCode.deleteOne({token});
    return true;
  }
}
