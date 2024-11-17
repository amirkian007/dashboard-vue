import http from './http'
//*********** */
//Note :  The js docs are generated with Ai
//*********** */

/**
 * Represents an article with details for content, metadata, and author.
 */
export interface Article {
  /**
   * Unique identifier for the article, often used in URLs.
   */
  slug: string

  /**
   * Title of the article.
   */
  title: string

  /**
   * Short description or summary of the article.
   */
  description: string

  /**
   * List of tags associated with the article.
   */
  tagList: string[]

  /**
   * Date and time when the article was created, in ISO 8601 format.
   */
  createdAt: string

  /**
   * Full body content of the article.
   */
  body: string

  /**
   * Indicates if the article is marked as a favorite by the current user.
   */
  favorited: boolean

  /**
   * Total count of favorites this article has received.
   */
  favoritesCount: number

  /**
   * Author details, including username, profile image, and following status.
   */
  author: {
    /**
     * Username of the article's author.
     */
    username: string

    /**
     * URL of the author's profile image.
     */
    image: string

    /**
     * Indicates if the current user is following the author.
     */
    following: boolean
  }
}

/**
 * Response structure for fetching articles, including article list and count.
 */
interface getArticlesResponse {
  /**
   * List of articles returned in the response.
   */
  articles: Article[]

  /**
   * Total count of articles available.
   */
  articlesCount: number
}

/**
 * Response structure for fetching a list of tags.
 */
interface tagResponse {
  /**
   * List of tags available in the response.
   */
  tags: string[]
}

export interface articlePost {
  article: {
    title: Article['title']
    description: Article['description']
    body: Article['body']
    tagList: Article['tagList']
  }
}

const article = {
  /**
   * Fetches a paginated list of articles.
   * @param {number} page - The page number for pagination.
   * @returns {Promise<getArticlesResponse>} The list of articles for the specified page.
   */
  async getArticles(page: number) {
    return await http.readData<getArticlesResponse>('/articles', { page })
  },

  /**
   * Fetches a list of available tags.
   * @returns {Promise<tagResponse>} The list of tags.
   */
  async getTags() {
    return await http.readData<tagResponse>('/tags')
  },

  /**
   * Creates a new article with the provided data.
   * @param {articlePost} data - The data for the article to be created.
   * @returns {Promise<{ article: Article }>} The created article.
   */
  async postArticle(data: articlePost) {
    return await http.postData<typeof data, { article: Article }>(
      '/articles',
      data,
    )
  },

  /**
   * Updates an existing article by slug with the provided data.
   * @param {articlePost} data - The data to update the article with.
   * @param {string} slug - The unique slug of the article to be updated.
   * @returns {Promise<{ article: Article }>} The updated article.
   */
  async editArticle(data: articlePost, slug: string) {
    return await http.updateData<typeof data, { article: Article }>(
      `/articles/${slug}`,
      data,
    )
  },

  /**
   * Fetches a single article by its slug.
   * @param {string} slug - The unique slug of the article to fetch.
   * @returns {Promise<{ article: Article }>} The requested article.
   */
  async getArticleBySlug(slug: string) {
    return await http.readData<{ article: Article }>(`/articles/${slug}`)
  },

  /**
   * Deletes an article by its slug.
   * @param {string} slug - The unique slug of the article to delete.
   * @returns {Promise<void>} Resolves when the article is successfully deleted.
   */
  async deleteArticleBySlug(slug: string) {
    return await http.deleteData(`/articles/${slug}`)
  },
}

export default article
