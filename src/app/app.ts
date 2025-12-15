import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostService } from './post.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent implements OnInit {

  posts: any[] = [];
  showForm = false;
  errorMessage = '';

  newPost = {
    title: '',
    body: ''
  };

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.fetchPosts();
  }

  fetchPosts(): void {
    this.postService.getPosts().subscribe({
      next: (data) => {
        this.posts = data;
      },
      error: () => {
        this.errorMessage = 'Failed to load posts';
      }
    });
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    this.errorMessage = '';
  }

  submitPost(): void {

    // Extra safety (optional but good practice)
    if (!this.newPost.title || !this.newPost.body) {
      this.errorMessage = 'Title and Body are required';
      return;
    }
  
    this.postService.addPost(this.newPost).subscribe({
      next: (response) => {
        this.posts.unshift(response);
        this.newPost = { title: '', body: '' };
        this.showForm = false;
        this.errorMessage = '';
      },
      error: () => {
        this.errorMessage = 'Adding post failed';
      }
    });
  }
}
