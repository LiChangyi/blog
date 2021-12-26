export const isProd: boolean =
  process.env.NODE_ENV === 'production' ? true : false;

export const cdnUrl = isProd
  ? 'https://cdn.jsdelivr.net/gh/lichangyi/blog@gh-pages/'
  : '/';
