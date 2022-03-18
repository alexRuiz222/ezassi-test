import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ToolsService } from './tools.service';
@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor(private http: HttpClient, private _ToolsService: ToolsService) { }

  getFeeds(limit = 0, from = 0, order = 'asc', order_field = 'name', search = '') {
    return this.http.get(`${environment.server}/feeds?search=${search}&limit=${limit}&from=${from}&order=${order}&order_field=${order_field}`);
  }

  getFeed(id: any) {
    return this.http.get(`${environment.server}/feeds/${id}`);
  }

  createFeed(feed) {
    return this.http.post(`${environment.server}/feeds`, feed, { headers: this._ToolsService.getHttpHeader() });
  }

  uploadImage(id, file) {
    // console.log(file);
    const formData = new FormData();
    formData.append('file', file);
    // console.log(formData);
    return this.http.post(`${environment.server}/feeds/upload/${id}`, formData, { headers: this._ToolsService.getHttpHeader() });
  }

  updateFeed(id, feed) {
    return this.http.put(`${environment.server}/feeds/${id}`, feed, { headers: this._ToolsService.getHttpHeader() });
  }

  getImage(id: any) {
    return this.http.get(`${environment.server}/feeds/image/${id}`);
  }

  deleteFeed(id: any) {
    return this.http.delete(`${environment.server}/feeds/${id}`, { headers: this._ToolsService.getHttpHeader() });
  }

}
