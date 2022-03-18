import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Feed } from 'src/app/classes/feed';
import { FeedService } from 'src/app/shared/services/feed.service';
import { WorkflowService } from 'src/app/shared/services/workflow.service';
import { AssigneesService } from 'src/app/shared/services/assignees.service';
import { ToolsService } from 'src/app/shared/services/tools.service';
import Swal from 'sweetalert2';
import { ImageCroppedEvent, base64ToFile, ImageCropperComponent } from 'ngx-image-cropper';


@Component({
  selector: 'app-feed-editor',
  templateUrl: './feed-editor.component.html',
  styleUrls: ['./feed-editor.component.css']
})
export class FeedEditorComponent implements OnInit {

  public id = undefined;
  public oldData = new Feed();
  public feed = new Feed();
  public feedForm = new FormGroup({
    idCard: new FormControl(''),
    path_image: new FormControl(''),
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    idWorkflow: new FormControl('', Validators.required),
    idAssignees: new FormControl('', Validators.required),
    score: new FormControl('', [Validators.min(0), Validators.max(10)]),
    qualification: new FormControl(''),
    createdAt: new FormControl(''),
    updatedAt: new FormControl(''),
    status: new FormControl(''),
  });
  card_img: any = '';
  imageChangedEvent: any = '';
  imageRotation = 0;
  last_event: any = '';
  image_roting = false;
  loadingImage = false;
  image_base64 = '';
  public feedFormSubmitted = false;
  public changes = false;
  img_changes = false;
  public workflows = [];
  public assignees = [];
  stars = [1, 2, 3, 4, 5];

  constructor(private route: ActivatedRoute, private router: Router, private _ToolsService: ToolsService, private spinner: NgxSpinnerService, private _FeedService: FeedService, public toastr: ToastrService, private _WorkflowService: WorkflowService, private _AssigneesService: AssigneesService) {
  }


  @ViewChild('file', { static: false }) inputFile;

  preview(files: any) {
    if (files.length === 0) { return; }
    this.card_img = files[0];
    console.log(files[0]);
    this._ToolsService.previewImg(files, 5).then((r) => {
      this.feed.image_preview = r;
      this.last_event = '';
      this.inputFile.nativeElement.value = '';
      this.changes = true;
    }).catch((err) => {
      console.log(err);
    });
  }

  fileChangeEvent(event: any, files: any): void {
    if (files[0].type == 'image/gif') {
      this.preview(files);
      return;
    }
    this.imageRotation = 0;
    this.last_event = '';
    this.imageChangedEvent = event;

  }

  imageCropped(event: ImageCroppedEvent) {
    this.last_event = event;
    this.img_changes = true;
    console.log(event);
  }

  imageLoaded(files: any) {
    console.log(files);
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }

  loadImageFailed() {
    // show message
  }

  imageRote() {
    this.image_roting = true;
    // console.log(this.imageRotation);
    if (this.imageRotation == 3) {
      this.imageRotation = 0;
      this.image_roting = false;
      return;
    }
    this.imageRotation = this.imageRotation + 1;
    this.image_roting = false;
  }

  closeCropping() {
    this.feed.image_preview = this.last_event.base64;
    fetch(this.feed.image_preview)
      .then(res => res.blob())
      .then(blob => {
        this.card_img = new File([blob], "feed_image.jpg", { type: "image/jpg" });
      });
    this.last_event = '';
    this.inputFile.nativeElement.value = '';
    this.changes = true;
  }

  cancelCropping() {
    this.last_event = '';
    this.inputFile.nativeElement.value = '';
  }

  uploadImg(id) {
    console.log(id);
    this.spinner.show();
    // this.product.image
    // console.log(this.card_img);
    this._FeedService.uploadImage(id, this.card_img).subscribe((data: any) => {
      this.getFeed();
      this.spinner.hide();
      // Swal.fire(this._ToolsService.swalSaved);
    }, err => {
      console.log(err);
      const { msg } = err.error;
      this.toastr.error(msg, 'Ocurrio algo!', this._ToolsService.optToast);
      this.spinner.hide();
    });
  }


  get tf() {
    return this.feedForm.controls;
  }

  getWorkflows() {
    this.spinner.show();
    this._WorkflowService.getWorkflows().subscribe((data: any) => {
      ({ workflow: this.workflows } = data)
      this.spinner.hide();
    }, err => {
      this.spinner.hide();;
      console.log('error: ', err);
      if (!err.error.lengthComputable) {
        this.toastr.error('Lost connection', 'Something went wrong!', this._ToolsService.optToast);
        return;
      }
      const { msg } = err.error;
      this.toastr.error(undefined, 'Something went wrong!', this._ToolsService.optToast);
    });
  }


  getAssignees() {
    this.spinner.show();
    this._AssigneesService.getAssignees().subscribe((data: any) => {
      ({ assignee: this.assignees } = data);
      this.spinner.hide();
    }, err => {
      this.spinner.hide();;
      console.log('error: ', err);
      if (!err.error.lengthComputable) {
        this.toastr.error('Lost connection', 'Something went wrong!', this._ToolsService.optToast);
        return;
      }
      const { msg } = err.error;
      this.toastr.error(undefined, 'Something went wrong!', this._ToolsService.optToast);
    });
  }

  getFeed() {
    this.img_changes = false;
    this.changes = false;
    this.spinner.show();
    // this.spinner.hide();
    // return;
    this._FeedService.getFeed(this.id).subscribe((data: any) => {
      if (data.length == 0) {
        this.goBack();
        this.spinner.hide();
        return;
      }
      this.feed = data[0];
      this.feedForm.patchValue(this.feed)
      this.oldData = Object.assign({}, JSON.parse(JSON.stringify(this.feed)));
      this.getImgBase64();
      this.spinner.hide();
    }, err => {
      this.spinner.hide();;
      console.log('error: ', err);
      if (!err.error.lengthComputable) {
        this.toastr.error('Lost connection', 'Something went wrong!', this._ToolsService.optToast);
        return;
      }
      const { msg } = err.error;
      this.toastr.error(undefined, 'Something went wrong!', this._ToolsService.optToast);
    });
  }

  getImgBase64() {
    this.spinner.show();
    this._FeedService.getImage(this.id).subscribe((data: any) => {
      ({ base64: this.image_base64 } = data)
      this.spinner.hide();
    }, err => {
      // this.spinner.hide();
      // console.log('error: ', err);
      // if (!err.error.lengthComputable) {
      //   this.toastr.error('Lost connection', 'Something went wrong!', this._ToolsService.optToast);
      //   return;
      // }
      // const { msg } = err.error;
      // this.toastr.error(undefined, 'Something went wrong!', this._ToolsService.optToast);
    });
    this.spinner.hide();
  }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.getWorkflows();
      this.getAssignees();
      if (this.id == 'new') {
        this.feedForm.patchValue(new Feed())
      } else {
        this.getFeed();
      }
    });

  }

  goBack() {
    if (!this.changes) {
      this.router.navigate([`/feed`]);
      return;
    }

    Swal.fire(this._ToolsService.swalUndo).then((result) => {
      if (result.value) {
        this.router.navigate([`/feed`]);
      }
    })
  }


  send() {
    this.feedFormSubmitted = true;
    console.log(this.feedForm.value);
    if ((this.feedForm.value.title).replace(' ', '') == '' || !this.feedForm.valid) {
      return;
    }
    if (this.oldData.title == '') {
      this.createCard();
    } else {
      this.updateCard();
    }
  }

  createCard() {
    this.spinner.show();
    this._FeedService.createFeed(this.feedForm.value).subscribe((data: any) => {
      this.id = data.id;
      // console.log(this.card_img);
      if (this.card_img == '') {
        this.router.navigate([`/feed-editor`, this.id]);
        Swal.fire(this._ToolsService.swalSaved);
        this.spinner.hide();
        return;
      }
      this.uploadImg(this.id);
    }, err => {
      const { msg } = err.error;
      console.log(msg);
      this.toastr.error(msg, 'Ocurrio algo!', this._ToolsService.optToast);
      this.spinner.hide();
    });
  }

  updateCard() {
    this.spinner.show();
    const id = this.feedForm.value.idCard;
    if (this.card_img == '' && !this.changes) {
      this.uploadImg(id);
      return;
    }
    this._FeedService.updateFeed(id, this.feedForm.value).subscribe((data: any) => {
      if (this.card_img == '') {
        this.getFeed();
        // Swal.fire(this._ToolsService.swalSaved);
        this.toastr.success(undefined, 'Changes saved');
        this.spinner.hide();
        return;
      }
      this.uploadImg(id);
    }, err => {
      console.log(err);
      const { msg } = err.error;
      this.toastr.error(msg, 'Ocurrio algo!', this._ToolsService.optToast);
      this.spinner.hide();
    });
  }

  deleteFeed(id: any) {
    Swal.fire(this._ToolsService.swalDelete).then((result) => {
      if (result.value) {
        this._FeedService.deleteFeed(id).subscribe((data: any) => {
          this.router.navigate([`/feed`]);
        }, err => {
          console.log(err);
          const { msg } = err.error;
          this.toastr.error(msg, 'Ocurrio algo!', this._ToolsService.optToast);
          this.spinner.hide();
        });
      }
    })
  }

  ngAfterContentChecked() {
    if (this.id != 'new') {
      // console.log(this.oldData, this.feedForm.value);
      this.changes = this._ToolsService.getChanges(this.oldData, this.feedForm.value);
    } else { this.changes = true; }
  }

}
