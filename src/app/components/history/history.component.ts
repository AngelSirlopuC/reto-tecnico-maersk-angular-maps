import { Component, OnInit, Input, SimpleChanges,ChangeDetectionStrategy  } from '@angular/core';
import { MarkerLatLng } from 'src/app/models/marker-latlng.model';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  @Input() currentMarker : MarkerLatLng[] = [];
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(e : SimpleChanges){
    console.log(e)
  }

}
