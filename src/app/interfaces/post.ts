import { Vote } from './vote';
import { Category } from './category';

export interface Post {

  createdAt: Date,
  lastUpdatedAt: Date,
  title: String,
  content: String,
  likes: number,
  category: Category,
  author_url: String,
  post_url: String,
  comments_url: String,
  numberOfComments: Number,
  option: Vote,
  authorname: String
}

