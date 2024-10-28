import http from "./http";

export interface Article {
  slug: string;
  title: string;
  description: string;
  tagList: string[];
  createdAt: string;
  body: string;
  favorited: boolean;
  favoritesCount: number;
  author: {
    username: string;
    image: string;
    following: boolean;
  };
}

interface getArticlesResponse {
  articles: Article;
  articlesCount: number;
}

interface tagResponse{
    tags : string[]
}
export interface articlePost{
    article:{
        title : Article['title']
        description : Article['description']
        body : Article['body']
        tagList : Article['tagList']
    }
}
const article = {
  async getArticles(page: number) {
    return await http.readData<getArticlesResponse>("/articles", { page });
  },
  async getTags() {
    return await http.readData<tagResponse>("/tags");
  },
  async postArticle(data:articlePost) {
   return await http.postData<typeof data,{article:Article}>("/articles",data);
  },
  async editArticle(data:articlePost,slug:string) {
   return await http.updateData<typeof data,{article:Article}>(`/articles/${slug}`,data);
  },
  async getArticleBySlug(slug:string) {
   return await http.readData<{article:Article}>(`/articles/${slug}`);
  },
  async deleteArticleBySlug(slug:string) {
   return await http.deleteData(`/articles/${slug}`);
  },
};

export default article;
