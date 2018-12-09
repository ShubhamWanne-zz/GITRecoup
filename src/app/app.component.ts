import { Component } from '@angular/core';
import { ComponentCommService } from 'src/app/CommunicationService/component-comm.service';
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  subscription= new Subscription();
  title = 'GITRecoup';
  userName:string;
  user:string;
  isAdvanceSearchSelected:boolean = false;

  constructor(private messageService: ComponentCommService){
    this.subscription = this.messageService.getMessage().subscribe(
      message=>{
      if(message.to != "app_component") return;
      if(message.data.type == "visitProfile"){
        this.redirectToOperationComponent(message.data);
      }
    });
  }

  goToTop(){
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  fetchUsers(form: any){
    if(!form.value){
      this.userName="";
      this.closeAdvanceSearchComponent();
    }
    if(form.value && form.value.user && form.value.user != ""){
      this.userName= form.value.user;
      this.isAdvanceSearchSelected= true;
      this.messageService.sendMessage({
        to: "advance_search_component",
        data: {
          msg : form.value.user,
          isAdvanceSearchSelected: this.isAdvanceSearchSelected
        },
        from: "app_component"
      })
    }
  }
  redirectToOperationComponent(message: any){
    this.userName="";
    this.user = message.msg.value.user;
    this.closeAdvanceSearchComponent();
  }
  closeAdvanceSearchComponent(){
    this.isAdvanceSearchSelected= false;
    this.messageService.sendMessage({
      to: "advance_search_component",
      data: {
        isAdvanceSearchSelected: this.isAdvanceSearchSelected
      },
      from: "app_component"
    })
  }
  clearSearch(){
    this.userName = '';
  }

}
