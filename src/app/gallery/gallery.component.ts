import {Component, OnInit, OnDestroy, }  from '@angular/core';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent{
  constructor(
    private userService: UserService,
  ) {}
}