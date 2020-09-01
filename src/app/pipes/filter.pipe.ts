import { Pipe, PipeTransform } from '@angular/core';
import { Post } from '../interfaces/post';

@Pipe({
  name: 'filterBy'
})
export class FilterPipe implements PipeTransform {

  transform(posts: Post[], categoryName: string): Post[] {
    if (posts === undefined || posts === null) {
      return;
    }
    if (categoryName !== 'All') {
      posts = posts.filter(post => post.category.name === categoryName);
    }
    return posts;
  }

}
