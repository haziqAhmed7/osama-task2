import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  constructor(private http: HttpClient) { }

  public async fetchGallery(userId: string): Promise<object> {
      const url = 'https://localhost:44310/api/image/imagelist';
      const response = [];
      const payload = {
          UserGuid: userId,
      };

      await this.http.post(url, payload)
      .toPromise()
      .then(data => {
        if (Array.isArray(data)) {
          data.forEach((record)=> {
            response.push({
              imageName: record['imageName'],
              imageDate: record['imageDate']
            })
          });
        }
      })
      .catch(error => {})

    // return response;
    return this.loadFakeData();
  }

  private loadFakeData() {
    return [
      {
        imageName: "https://picsum.photos/id/237/200/300",
        imageDate: "2020-07-14T00:00:00"
      },
      {
        imageName: "https://picsum.photos/seed/picsum/200/300",
        imageDate: "2020-07-14T16:13:58.426896"
      },
      {
        imageName: "https://picsum.photos/200/300.jpg",
        imageDate: "2020-07-14T17:14:11.966182"
      },
      {
        imageName: "https://picsum.photos/200/300/?blur",
        imageDate: "2020-07-14T17:30:50.416952"
      },
    ];
  }
}