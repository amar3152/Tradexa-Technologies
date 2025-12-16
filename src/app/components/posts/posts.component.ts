import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule, FormsModule], // ✅ REQUIRED for ngModel
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  title = '';
  body = '';
  showForm = false;

  constructor(public postService: PostService) {}

  ngOnInit(): void {
    this.postService.loadPosts();
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  submitPost() {
    if (!this.title || !this.body) return;

    this.postService.addPost({
      userId: 1,
      title: this.title,
      body: this.body
    });

    this.title = '';
    this.body = '';
    this.showForm = false;
  }
}
