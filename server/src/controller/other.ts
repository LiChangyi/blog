import { Context } from "koa";
import * as Qiniu from 'qiniu';
import { BMP24 } from 'gd-bmp';
import CheckCode from '../model/checkcode';
import Token from '../utils/token';
import Set from '../model/set';

export default class OtherController {
  // 获取验证码
  public static async getCheck ( ctx: Context ) {
    try {
      // 生成验证码
      const {code, img} = makeCapcha();
      const token = await Token.createCodeToken(code);
      const checkcode = await new CheckCode({token, code}).save();
      if ( checkcode ) {
        ctx.body = {
          code: 1,
          msg: '获取验证码成功！',
          data: {
            token,
            img: "data:image/bmp;base64," + img.getFileData().toString('base64')
          }
        };
      } else {
        ctx.body = {
          code: 0,
          msg: '获取验证码失败'
        };
      }
    } catch (err) {
      ctx.status = 500;
      ctx.body = {
        code: 0,
        msg: '服务内部错误'
      };
    }
  }
  // 获取七牛云token 
  public static async getQiniu ( ctx: Context ) {
    try {
      // 获取设置里面的七牛云设置
      const set = await Set.findOne({});
      if ( set === null) {
        ctx.body = {
          code: 0,
          msg: '获取七牛云token失败,请先配置'
        };
        return;
      }
      const { ACCESS_KEY = '' , SECRET_KEY = '' , BUCKET = '' } = set.qiniu;
      const mac = new Qiniu.auth.digest.Mac(ACCESS_KEY, SECRET_KEY);
      const options = {
        scope: BUCKET
      };
      const putPolicy = new Qiniu.rs.PutPolicy(options);

      const token = putPolicy.uploadToken(mac);
      ctx.body = {
        code: 200,
        msg: '获取七牛云上传token成功!',
        token
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

function rand ( min: number, max: number ): number {
  // tslint:disable-next-line:no-bitwise
  return Math.random() * (max - min + 1) + min | 0;
}

function makeCapcha () {
  const img = new BMP24(100, 40);
  img.drawCircle(rand(0, 100), rand(0, 40), rand(10 , 40), rand(0, 0xffffff));
  // 边框
  img.drawRect(0, 0, img.w - 1, img.h - 1, rand(0, 0xffffff));
  img.fillRect(0, 0, 100, 40, 0x252632);
  // img.fillRect(rand(0, 100), rand(0, 40), rand(10, 35), rand(10, 35), rand(0, 0xffffff));
  img.drawLine(rand(0, 100), rand(0, 40), rand(0, 100), rand(0, 40), rand(0, 0xffffff));
  // return img;
  // 画曲线
  const w = img.w / 2;
  const h = img.h;
  const color = rand(0, 0xffffff);
  const y1 = rand(-5, 5); // Y轴位置调整
  const w2 = rand(10, 15); // 数值越小频率越高
  const h3 = rand(4, 6); // 数值越小幅度越大
  const bl = rand(1, 5);
  for (let i = -w; i < w; i += 0.1) {
      const y = Math.floor(h / h3 * Math.sin(i / w2) + h / 2 + y1);
      const x = Math.floor(i + w);
      for ( let j = 0; j < bl; j++ ) {
          img.drawPoint(x, y + j, color);
      }
  }

  const p = "ABCDEFGHKMNPQRSTUVWXYZ3456789";
  let str = '';
  for (let i = 0; i < 4; i++) {
      // tslint:disable-next-line:no-bitwise
      str += p.charAt( Math.random() * p.length | 0);
  }

  const fonts = [BMP24.font12x24, BMP24.font16x32];
  // const fonts = [BMP24.font8x16, BMP24.font12x24, BMP24.font16x32];
  let x = 15;
  let y = 8;
  // tslint:disable-next-line:prefer-for-of
  for (let i = 0; i < str.length; i++) {
      // tslint:disable-next-line:no-bitwise
      const f = fonts[Math.random() * fonts.length | 0];
      y = 8 + rand(-5, 5);
      img.drawChar(str[i], x, y, f, rand(0xaaaaaa, 0xffffff));
      x += f.w + rand(2, 8);
  }
  return {code: str, img};
}
