export interface ArticleFormData {
  title: string
  description: string
  body: string
  tagList: string[]
}
export interface ArticleFormProps {
  data?: ArticleFormData
  loading: boolean
}
