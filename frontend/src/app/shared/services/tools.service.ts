import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { diff as _diff } from 'deep-object-diff';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  optToast = {
    positionClass: 'toast-top-full-width',
    progressBar: true
  }

  swalUndo: any = {
    title: '¿Are you sure?',
    text: 'Changes will be deleted.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#F55252 !important',
    confirmButtonText: 'Continue',
    cancelButtonText: 'Cancel'
  };


  swalDelete: any = {
    title: '¿Are you sure?',
    text: `You won't be able to revert this!`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete!',
    cancelButtonText: 'Cancel'
  };

  swalSaved: any = {
    position: 'top-end',
    icon: 'success',
    title: 'Your work has been saved',
    showConfirmButton: false,
    timer: 1500
  }


  constructor() { }

  previewImg(files: any, limit_size: any) {
    limit_size = limit_size * 1048576; // conversion de  megas a bytes
    // console.log(limit_size);return;
    console.log(files[0].size);
    return new Promise((resolve, reject) => {
      var mimeType = files[0].type;
      if (mimeType.match(/image\/*/) == null) {
        reject("Solo se aceptan imagenes");
      }
      if (files[0].size > limit_size) {
        reject(`La imagen es demasiado grande, el tamaño no debe pasar de ${limit_size / 10000}MB`);
      }
      // console.log(files[0]);
      let reader = new FileReader();
      // this.imagePath = files;
      reader.readAsDataURL(files[0]);
      reader.onload = (_event) => {
        resolve(reader.result);
      }
    });
  }

  diffObjects(obj1: any, obj2: any) {
    const arrays = Object.keys(obj1).filter(k => Array.isArray(obj1[k]))
    let result: any = _diff(obj1, obj2);
    Object.keys(result).filter(k => arrays.includes(k)).forEach(k => result[k] = obj2[k]);
    if (Object.keys(result).length == 1 && result._id != undefined) {
      result = {};
    }
    return result;
  }


  getChanges(obj1: any, obj2: any) {
    let result: any = this.diffObjects(obj1, obj2);
    return Object.keys(result).length > 0;
  }

  getHttpHeader() {
    let headers;
    if (localStorage.getItem('x-token')) {
      headers = new HttpHeaders().set('x-token', localStorage.getItem('x-token'));
    } else {
      headers = new HttpHeaders().set('x-token', '');
    }
    return headers;
  }


}
