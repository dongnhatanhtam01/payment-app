import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { NgxJsonViewerModule } from 'ngx-json-viewer';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css']
})

export class PaymentDetailsComponent implements OnInit {
  data: any
  constructor(private _apiService: ApiService) { }

  ngOnInit(): void {
    this._apiService.itemDetailsObs.subscribe(item => this.data = item)
  }
}
