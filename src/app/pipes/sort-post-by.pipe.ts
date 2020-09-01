import { Pipe, PipeTransform } from '@angular/core';
import { Post } from '../interfaces/post';

@Pipe({
  name: 'sortPostBy'
})
export class SortPostByPipe implements PipeTransform {

  transform(posts: Post[], comparator: string): Post[] {
    if (posts === undefined || posts === null) {
      return;
    }
    switch (comparator) {
      case 'newest':
        posts = posts.sort((post1, post2) => new Date(post2.createdAt).getTime() - new Date(post1.createdAt).getTime());
        break;
      case 'best':
        posts = posts.sort((post1, post2) => post2.likes - post1.likes);
        break;
      default:
    }
    return posts;
  }

}
