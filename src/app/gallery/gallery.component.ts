import {Component, OnInit, OnDestroy, }  from '@angular/core';
import {UserService} from '../services/user.service';
import {GalleryService} from '../services/gallery.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit{
  
  showGalleryLoading = true;
  imagesGallery = [];
  userName: string;

  constructor(
    private userService: UserService,
    private gallery: GalleryService,
  ) {}

  ngOnInit() {
    this.userName = [
      this.userService.getUser().firstName, 
      this.userService.getUser().lastName
    ].join(' ');
    this.fetchGallery();
  }

  private toggleShowGalleryLoading() {
    this.showGalleryLoading = ! this.showGalleryLoading;
  }

  private async fetchGallery(): Promise<object>{
    this.imagesGallery = [];
    const response = await this.gallery.fetchGallery(
      this.userService.getUser().userId
      );
     console.log(response); 
     this.imagesGallery = (Array.isArray(response)) ? response : []; 
     console.log(this.imagesGallery); 
     this.toggleShowGalleryLoading();
     return null;
  }
}