import { Component, OnInit, OnDestroy } from "@angular/core";
import { UserService } from "../services/user.service";
import { GalleryService } from "../services/gallery.service";
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: "app-gallery",
  templateUrl: "./gallery.component.html",
  styleUrls: ["./gallery.component.css"]
})
export class GalleryComponent implements OnInit {
  showGalleryLoading = true;
  showUploadForm = false;
  isUploading = false;
  imagesGallery = [];
  imagesUpload = [];
  userName: string;

  constructor(
    private userService: UserService,
    private gallery: GalleryService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.userName = [
      this.userService.getUser().firstName,
      this.userService.getUser().lastName
    ].join(" ");
    this.fetchGallery();
  }

  showForm() {
    this.toggleShowGalleryLoading();
    this.toggleUploadForm();
  }

  onSelectFile(event) {
    this.imagesUpload = [];
     if (event.target.files && event.target.files[0]) {
       const filesAmount = event.target.files.length;
       for (let i=0; i< filesAmount; i++) {
         this.imagesUpload.push(event.target.files[i]);
       }
     }
  }

  startUpload(){
    if (this.imagesUpload.length > 5) {
      this.openSnackBar('MAximum Images is 5');
      return null;
    }
    this.toggleIsUploading();
    console.log(this.imagesUpload);
    this.upload();
  }

  // private methods
  private async fetchGallery(): Promise<object> {
    this.imagesGallery = [];
    const response = await this.gallery.fetchGallery(
      this.userService.getUser().userId
    );
    // console.log(response);
    this.imagesGallery = Array.isArray(response) ? response : [];
    console.log(this.imagesGallery);
    this.toggleShowGalleryLoading();
    return null;
  }

  private async upload(): Promise<object> {
    // upload now...
    const frmData = new FormData();  
    for(let i=0; i<this.imagesUpload.length; i++) {
      frmData.append('', this.imagesUpload[i]);
    }
    // call service here
    const response = await this.gallery.uploadImage(
      this.userService.getUser().userId, frmData
    );

    this.toggleIsUploading();

    if (response['status'] < 1) {
      this.openSnackBar(response['message']); 
      return null;
    }
    // uploaded head back to gallery now...
    this.toggleUploadForm();
    this.toggleIsUploading();
    this.toggleShowGalleryLoading();
    // this.toggleShowGalleryLoading();
    await this.fetchGallery();
    return null;
  }

  private toggleShowGalleryLoading() {
    this.showGalleryLoading = !this.showGalleryLoading;
  }

  private toggleUploadForm() {
    this.showUploadForm = !this.showUploadForm;
  }

  private toggleIsUploading() {
    this.isUploading = ! this.isUploading;
  }

  private openSnackBar(message: string, duration = 2000) {
    this.snackBar.open(message, null, {
      duration: duration,
    });
  }
}
