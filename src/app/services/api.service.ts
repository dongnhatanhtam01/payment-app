import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map, Observable, Subject } from "rxjs";
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  BASE_URL1 = 'http://localhost:3000/payment'

  private _itemDetail: Subject<any> = new Subject<any>();    // consider putting the actual type of the data you will receive
  public itemDetailsObs = this._itemDetail.asObservable();
  private _itemSource: Subject<any> = new Subject<any>();    // consider putting the actual type of the data you will receive
  public itemSourceObs = this._itemSource.asObservable();


  // OBSERVE DETAIL CHANGING
  public arr: any[] = [

  ]

  constructor(private _http: HttpClient) { }

  /** GET PAYMENT */
  getPayment = (dateTimeObs: any) => {
    let { startDate, endDate } = dateTimeObs
    // return this._http.get<any>(this.BASE_URL2 + `?from=${startDate}&to=${endDate}`)
    return this._http.get<any>(this.BASE_URL1)
  }

  getPaymentDetails(data: any) {
    // simple check, title must be at least 1 char
    if (data !== undefined) {
      const dataObj = data;
      this._itemDetail.next(data);
    }
  }

}
