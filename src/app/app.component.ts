import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from './services/api.service';
// import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // DATETIME VARIABLE
  dateTimeArranged: any;

  // DATETIME FORM
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  startChange(event: MatDatepickerInputEvent<string | any>): void {
    if (!event.value || this.dateTimeArranged === undefined) {
      console.log('error');

    }
    let date_test = event.value
    if (date_test !== null || date_test !== undefined) { date_test = date_test.toLocaleDateString('en-US') }
    this.dateTimeArranged = { startDate: date_test }
  }
  endChange(event: MatDatepickerInputEvent<string | any>): void {
    if (!event.value || this.dateTimeArranged === undefined) {
      console.log('error');
    }
    let date_test = event.value
    if (date_test !== null || date_test !== undefined) { date_test = date_test.toLocaleDateString('en-US') }
    this.dateTimeArranged.endDate = date_test
    this.getAllPayment(this.dateTimeArranged)

    this.range.value.start = ''
    this.range.value.end = ''
  }

  // TABLE
  displayedColumns: string[] = ['id', 'orderNumber', 'partnerId', 'orderAmount', 'status', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(public dialog: MatDialog, private _apiService: ApiService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.dateTimeArranged = []
    var today = new Date()
    var now = today.toLocaleDateString('en-US');
    this.getAllPayment({ startDate: '01/01/2022', endDate: now.toString() })
  }

  getAllPayment = (dateItem: any) => {
    this._apiService.getPayment(dateItem).subscribe({
      next: (res: any) => {
        this.dataSource = new MatTableDataSource(res)
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort
        console.log(res.data);        
      },
      error: () => { alert('get failed') }
    })
  }

  readDetail = (item: any) => {
    this._apiService.getPaymentDetails(item);
  }


  // MATERIAL CONSTRAIN FUNCTION
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
