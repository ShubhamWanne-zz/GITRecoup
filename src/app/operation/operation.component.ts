import { Component, OnInit } from '@angular/core';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';

@Component({
  selector: 'app-operation',
  templateUrl: './operation.component.html',
  styleUrls: ['./operation.component.scss']
})
export class OperationComponent implements OnInit {
  CLIENT_ID:string = "02105ca1007bab3db720";
  CLIENT_SECRET:string = "933490fc379f175ce0cd89f093c9aca3a5cade37";
  isSubmitClicked:boolean = false;
  isInvalidUser:boolean = false;
  isShowRepositories:boolean = false;
  userName:string;
  URL:string;
  repository:string;
  company:string;
  userDetails:any;
  repoData: any[];
  followers: any[];
  followersDetails = new Map();
  constructor() { }

  ngOnInit() {
  }

  fetchUser = function(form:any){
    this.isShowRepositories = false;
    if(form.value.user != ""){
      this.getUser(form.value.user).then((res)=>{
        if(res.data.name == null){
          this.isInvalidUser = true;
          return;
        }
        this.userDetails = res.data,
        this.isInvalidUser = false;
        this.isSubmitClicked = true;
        this.userName = res.data.name;
        this.URL = res.data.url;
        this.repository = res.data.public_repos;
        this.company = res.data.company;
        if(this.company == null)
          this.company = "Personal"
      },(err)=>{
        console.error(err);
      })
    }
  };
  fetchFollowers = function(){
      this.getFollowers().then((res)=>{
        this.followers = res.data;
        for(let follower of this.followers){
          this.getUser(follower.login).then((res)=>{
            this.followersDetails.set(follower.login,res.data);
          },(err)=>{
            console.log("User not found "+err);
          })
        }
      },(err)=>{
        console.error(err);
      });
  }
 
  fetchRepo = function(){
      this.isShowRepositories = true;
      this.getRepoDetails().then((res)=>{
        this.repoData = res.data;
      },(err)=>{
        console.error(err);
      })
  }

  getUser = async function(user:string){
    var rquestURI = `https://api.github.com/users/${user}?client_id=${this.CLIENT_ID}&client_secret=${this.CLIENT_SECRET}`;
    var api_call = await fetch(rquestURI);
    var data = await api_call.json();
    return { data };
  };

  getRepoDetails = async function(){
    var api_call = await fetch(`${this.userDetails.repos_url}?client_id=${this.CLIENT_ID}&client_secret=${this.CLIENT_SECRET}`);
    var data = await api_call.json();
    return { data };
  }

  getFollowers = async function(){
    var api_call = await fetch(`${this.userDetails.followers_url}?client_id=${this.CLIENT_ID}&client_secret=${this.CLIENT_SECRET}`)
    var data = await api_call.json();
    return { data }; 
  }



}
