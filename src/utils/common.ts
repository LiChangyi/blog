// 数字前面补零
export const addZero = (num: number): string => {
  if (num >= 10) {
    return String(num);
  }
  return `0${num}`;
};

export type TransformArticleListReturn = {
  year: number;
  articleList: (Article & {
    parsedCreateAt: {
      year: string;
      month: string;
      day: string;
    };
  })[];
}[];
/**
 * 处理文章列表，将文章列表转换成按照年和月的格式
 */
export const transformArticleList = (
  list: Article[]
): TransformArticleListReturn => {
  const result: TransformArticleListReturn = [];
  list.forEach((article) => {
    const [year, month, day] = article.createAt
      .split('-')
      .map((s) => Number(s));
    const find = result.find((o) => o.year === year);
    const newArticle: TransformArticleListReturn[number]['articleList'][number] =
      {
        ...article,
        parsedCreateAt: {
          year: addZero(year),
          month: addZero(month),
          day: addZero(day),
        },
      };
    if (find) {
      find.articleList.push(newArticle);
    } else {
      result.push({
        year,
        articleList: [newArticle],
      });
    }
  });
  // 以年倒序
  result.sort((a, b) => b.year - a.year);
  return result;
};
