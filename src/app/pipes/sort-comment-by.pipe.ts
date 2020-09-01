import { Pipe, PipeTransform } from '@angular/core';
import { Comment } from '../interfaces/comment';

@Pipe({
  name: 'sortCommentBy'
})
export class SortCommentByPipe implements PipeTransform {

  transform(comments: Comment[], comparator: string): Comment[] {
    if (comments === undefined || comments === null) {
      return;
    }
    switch (comparator) {
      case 'newest':
        comments = comments.sort((comment1, comment2) => new Date(comment2.createdAt).getTime() - new Date(comment1.createdAt).getTime());
        break;
      case 'best':
        comments = comments.sort((comment1, comment2) => comment2.likes - comment1.likes);
        break;
      default:
    }
    return comments;
  }

}
