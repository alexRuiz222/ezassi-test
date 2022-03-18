import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FeedService } from 'src/app/shared/services/feed.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { ToolsService } from 'src/app/shared/services/tools.service';
@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  feed: any = [];
  totalPages = 0;
  actualPage = 1;
  itemsPage = 20;
  itemsPaginator = 5;
  txtBuscar = '';
  itemsFrom = 0;
  searching = false;
  orderBy = { orderBy: 'title', name: 'Title' };
  order = 'asc';
  optToast = {
    positionClass: 'toast-top-full-width'
    // positionClass: 'toast-top-right'
  }

  stars = [1, 2, 3, 4, 5];


  constructor(private router: Router, private _FeedService: FeedService, public toastr: ToastrService, private spinner: NgxSpinnerService, private ref: ChangeDetectorRef, private _ToolsService: ToolsService) { }

  onScroll() {
    // alert('scrolled!!');
    this.itemsFrom = this.itemsFrom + this.itemsPage;
    this.getFeed();
  }

  newFeed() {
    this.router.navigate([`/feed-editor`, 'new']);
  }

  editFeed(id: any) {
    this.router.navigate([`/feed-editor`, id]);
  }

  deleteFeed(id: any) {
    Swal.fire(this._ToolsService.swalDelete).then((result) => {
      if (result.value) {
        this._FeedService.deleteFeed(id).subscribe((data: any) => {
          const x = this.feed.findIndex(object => {
            return object.idCard === id;
          });
          this.feed.splice(x, 1);
        }, err => {
          console.log(err);
          const { msg } = err.error;
          this.toastr.error(msg, 'Ocurrio algo!', this._ToolsService.optToast);
          this.spinner.hide();
        });
      }
    })
  }

  getImgBase64(card) {
    this._FeedService.getImage(card.idCard).subscribe((data: any) => {
      card.image_base64 = data.base64;
      this.ref.detectChanges();
    }, err => {
      card.image_base64 = undefined;
      this.ref.detectChanges();
    });

  }


  getFeed() {
    this._FeedService.getFeeds(this.itemsPage, this.itemsFrom, this.order, this.orderBy.orderBy, this.txtBuscar).subscribe(async (data: any) => {
      const { feed, total } = data;
      this.totalPages = total;
      if (this.itemsFrom > 0) {
        // console.log(feed);
        if (feed.length > 0) {
          for (const card of feed) {
            await this.getImgBase64(card);
            this.feed.push(card);
          }

        };
        // this.ref.detectChanges();
      } else {
        for (const card of feed) {
          await this.getImgBase64(card);
          // this.feed.push(card);
        }
        this.feed = feed;
        this.spinner.hide();
      }
      this.searching = false;
    }, err => {
      this.spinner.hide();
      // console.log(err.status)
      if (!err.error.lengthComputable) {
        this.toastr.error('Se perdio la conexión con el servidor', 'Ocurrio algo!', this.optToast);
        return;
      }
      const { msg_es } = err.error;
      this.toastr.error(msg_es, 'Ocurrio algo!', this.optToast);
    });

  }

  ngOnInit(): void {
    this.getFeed();
  }

}
