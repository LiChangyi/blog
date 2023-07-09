export const isProd: boolean = process.env.NODE_ENV === 'production';

export const cdnUrl = isProd
  ? 'https://cdn.jsdelivr.net/gh/lichangyi/blog@gh-pages/'
  : '/';
