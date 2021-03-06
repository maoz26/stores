import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  @Input() store: any;
  @Input() retailerName: any;
  @Input() distanceFromMe: any;
  constructor() { }

  ngOnInit() {
  }

}
