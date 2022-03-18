import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ToolsService } from './tools.service';
@Injectable({
  providedIn: 'root'
})
export class WorkflowService {

  constructor(private http: HttpClient, private _ToolsService: ToolsService) { }

  getWorkflows(limit = 0, from = 0, order = 'asc', order_field = 'name', search = '') {
    return this.http.get(`${environment.server}/workflows?search=${search}&limit=${limit}&from=${from}&order=${order}&order_field=${order_field}`);
  }
}
