import { Component, OnInit } from '@angular/core';
import { CrudService } from './services/crud.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  posts: any[] = [];
  newPost = { title: '', body: '' };

  constructor(private crudService: CrudService) {}

  ngOnInit() {
    this.getAllPosts();
  }

  getAllPosts() {
    this.crudService.getPosts().subscribe((data) => {
      this.posts = data.slice(0, 5).map((post) => ({ ...post, editMode: false }));
    });
  }

  addPost() {
    this.crudService.createPost(this.newPost).subscribe((post) => {
      post.id = this.posts.length + 1;
      post.editMode = false;
      this.posts.unshift(post);
      this.newPost = { title: '', body: '' };
    });
  }

  editPost(post: any) {
    post.editMode = true;
  }

  updatePost(post: any) {
    this.crudService.updatePost(post.id, post).subscribe(() => {
      post.editMode = false;
    });
  }

  deletePost(id: number) {
    this.crudService.deletePost(id).subscribe(() => {
      this.posts = this.posts.filter((post) => post.id !== id);
    });
  }
}
