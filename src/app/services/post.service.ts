import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { Post } from '../models/post.model';

@Injectable({ providedIn: 'root' })
export class PostService {

  private readonly API_URL = 'https://jsonplaceholder.typicode.com/posts';

  posts = signal<Post[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  constructor(private http: HttpClient) {}

  loadPosts() {
    this.loading.set(true);
    this.error.set(null);

    this.http.get<Post[]>(this.API_URL)
      .pipe(
        catchError(err => {
          this.error.set('Failed to load posts');
          return of([]);
        }),
        finalize(() => this.loading.set(false))
      )
      .subscribe(posts => this.posts.set(posts));
  }

  addPost(post: Post) {
    this.loading.set(true);

    this.http.post<Post>(this.API_URL, post)
      .pipe(
        catchError(err => {
          this.error.set('Failed to add post');
          return of(null);
        }),
        finalize(() => this.loading.set(false))
      )
      .subscribe(newPost => {
        if (newPost) {
          this.posts.update(posts => [...posts, newPost]); 
        }
      });
  }
}
