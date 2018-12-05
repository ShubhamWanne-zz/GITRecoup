import { Component, OnInit, Input } from '@angular/core';
import { RestDoaAdvanceService } from "../DOAService/rest-doa-advance.service"
import { ComponentCommService } from "../CommunicationService/component-comm.service"
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-advance-search',
  templateUrl: './advance-search.component.html',
  styleUrls: ['./advance-search.component.scss']
})

export class AdvanceSearchComponent implements OnInit {
  subscription = new Subscription();
  isAdvanceSearchSelected: boolean = false;
  userList: any[];

  constructor(private doaService: RestDoaAdvanceService, private messageSevice: ComponentCommService) {
    this.subscription = this.messageSevice.getMessage().subscribe(
      message => {
        if (message.to != "advance_search_component") return;
        this.isAdvanceSearchSelected = message.data.isAdvanceSearchSelected;
        this.populateUser(message.data.msg);
      }
    )
  }

  ngOnInit() {
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  populateUser(userName) {
    console.log(this.isAdvanceSearchSelected);
    this.doaService.getUsers(userName).then((res) => {
      this.userList = res.data.items;
      console.log(this.userList);
    }, (err) => {
      console.log(err);
    })
  }
  getStarCount(score: number){
    if (score <= 25) {
      return new Array(1);
    }
    else if (score <= 50) {
      return new Array(2);
    }
    else if (score <= 75) {
      return new Array(3);
    }
    else if (score <= 100){
      return new Array(4);
    }
    else{
      return new Array(5);
    }
  }
  getUser() {
  }
}
