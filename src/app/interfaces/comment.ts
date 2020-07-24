import { Vote } from './vote';

export interface Comment {

  createdAt: Date,
  lastUpdatedAt: Date,
  content: String,
  likes: number,
  comment_url: String,
  author_url: String,
  post_url: String,
  option: Vote,
  authorname: String
}

export interface CommentDtoList {

  comments: Comment[]
}
