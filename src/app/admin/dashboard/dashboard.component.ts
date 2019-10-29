import { Component, OnInit } from '@angular/core';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';
import { ThongKeGQL } from 'src/app/model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public pieChart: GoogleChartInterface = null

  constructor(private thongKeGQL: ThongKeGQL) { }

  ngOnInit() {
    this.thongKeGQL.fetch().subscribe(rs => {
      this.pieChart = {
        chartType: 'PieChart',
        dataTable: [
          ['Task', 'Hours per Day'],
          ['Thành viên vip', rs.data.thongKe.vip],
          ['Còn lại', rs.data.thongKe.nonVip]
        ],
        //opt_firstRowIsData: true,
        options: { 'title': 'Biểu đồ thống kê số lượng thành viên vip' },
      };
    });
  }

}
