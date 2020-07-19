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

  uploadingProgressBarValue = 0;
  currentUploadingNumber = 0;
  cancelUploadTrigger = false;

  currentIndex = 0;
  imageToDisplay = null;

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

  cancelUpload(){
    this.cancelUploadTrigger = true;
    this.uploadingProgressBarValue = 0;
    this.currentUploadingNumber = 0;
    console.log(this.cancelUploadTrigger);
    this.switchBackToGallery();
  }

  increment() {
    if (this.currentIndex +1 <= (this.imagesGallery.length -1)) {
      this.currentIndex += 1;
      this.imageToDisplay = this.imagesGallery[this.currentIndex]['imageName'];
    }
  }

  decrement() {
    if ((this.currentIndex -1) >= 0 ) {
      this.currentIndex -= 1;
      this.imageToDisplay = this.imagesGallery[this.currentIndex]['imageName'];
    }
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
    // show first Image
    this.showFirstImage();
    return null;
  }

  private async upload(): Promise<object> {
    this.cancelUploadTrigger = false;
    this.uploadingProgressBarValue = 0;
    for(let i=0; i<this.imagesUpload.length; i++) {
      // check if user has cancelled upload
      if (this.cancelUploadTrigger) {
        return;
      }

      // upload now...
      this.currentUploadingNumber = i + 1;
      const frmData = new FormData();  
      frmData.append('files', this.imagesUpload[i]);
      if (!this.cancelUploadTrigger) {
          await this.gallery.uploadImage( this.userService.getUser().userId, 
          frmData);
          // set uploadingProgressBarValue
          this.uploadingProgressBarValue = Math.round(
            (this.currentUploadingNumber/this.imagesUpload.length) * 100
            );
      }
    }
    
    this.switchBackToGallery();
    await this.fetchGallery();
    if (this.showGalleryLoading) {
      this.showGalleryLoading = false;
    }
    this.cancelUploadTrigger = false;
    this.currentUploadingNumber = 0;
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

  private switchBackToGallery() {
     this.toggleIsUploading();
     if (this.isUploading) { this.isUploading = false; }
    // uploaded head back to gallery now...
    this.toggleUploadForm();
    this.toggleShowGalleryLoading();
  }

  private showFirstImage() {
    if (this.imagesGallery.length > 0) {
      this.currentIndex = 0;
      this.imageToDisplay = this.imagesGallery[this.currentIndex]['imageName'];
    }
  } 
}
