import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
    providedIn: 'root'
  })

  
export  class UploadFileService {
    data: FormData;
  constructor(private https: HttpClient) { }
  pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
    this.data = new FormData();
    this.data.append('file', file);

    
    //this.https.DefaultRequestHeaders.ExpectContinue = false;
    const newRequest = new HttpRequest('POST', 'http://localhost:8080/savefile', this.data, {
    reportProgress: true,
    responseType: 'text',
    });
    return this.https.request(newRequest);

  
  }
  
}
