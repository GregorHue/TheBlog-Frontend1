import { Vote } from './vote';
import { Category } from './category';

export interface Post {

  createdAt: Date,
  lastUpdatedAt: Date,
  title: string,
  content: string,
  likes: number,
  category: Category,
  author_url: string,
  post_url: string,
  comments_url: string,
  numberOfComments: number,
  option: Vote,
  authorname: string
}

export interface PostDtoList {

  posts: Post[]
}

