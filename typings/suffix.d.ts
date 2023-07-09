declare module 'plugins:article/*' {
  const content: Article;
  export default content;
}

declare module 'plugins:article/all' {
  const content: Article[];
  export default content;
}

declare module 'plugins:article/get-routes' {
  import { type RouteRecordRaw } from 'vue-router';

  const content: RouteRecordRaw[];
  export default content;
}
