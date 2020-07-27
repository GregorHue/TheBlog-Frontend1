import { Vote } from './vote';

export interface Comment {

  createdAt: Date,
  lastUpdatedAt: Date,
  content: string,
  likes: number,
  comment_url: string,
  author_url: string,
  post_url: string,
  option: Vote,
  authorname: string
}

export interface CommentDtoList {

  comments: Comment[]
}
