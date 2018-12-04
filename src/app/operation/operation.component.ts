import { Component, OnInit } from '@angular/core';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
import { ColorGenerator } from '../../Color';
import { truncate } from 'fs';
import { DateUtil } from '../utils/Date'
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-operation',
  templateUrl: './operation.component.html',
  styleUrls: ['./operation.component.scss']
})
export class OperationComponent implements OnInit {
  CLIENT_ID: string = "02105ca1007bab3db720";
  CLIENT_SECRET: string = "933490fc379f175ce0cd89f093c9aca3a5cade37";
  dateUtil: DateUtil = new DateUtil();
  isSubmitClicked: boolean = false;
  isInvalidUser: boolean = false;
  isShowRepositories: boolean = false;
  isShowRepoDetails = false;
  showRepoButtonTag: string = "Show Repositories";
  isShowChart: boolean = false;
  showChartButtonTag: string = "View";
  user: string;
  URL: string;
  repository: string;
  company: string;
  userDetails: any;
  repoData: any[];
  followers: any[];
  forksData: any[]= new Array();
  followersDetails = new Map();
  colorGenerator = new ColorGenerator();
  currentRepo:any;
  /*
  ---- Chart Details
  */
  isChartCreated: boolean = false;
  public chartType: string = 'polarArea';
  public chartData = new Array();
  public chartLabels = new Array();
  public backgroundColor = new Array();
  public chartColors: Array<any> = [{
    hoverBorderColor: ['rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.1)'],
    hoverBorderWidth: 0,
  }];
  public chartOptions: any = {
    responsive: true
  };

  /*
  -------- Methods
  */
  constructor() {
  }

  ngOnInit() {
  }

  resetData = function () {
    isSubmitClicked: false;
    this.isInvalidUser= false;
    isShowRepositories: false;
    showRepoButtonTag: "Show Repositories";
    isShowChart: false;
    this.isChartCreated = false;
    showChartButtonTag: "View";
    user: "";
    URL: "";
    repository: "";
    company: "";
    userDetails: { };
    repoData: [];
    followers: [];
    followersDetails: new Map();
    colorGenerator: { };
    this.chartData.length = 0;
    this.chartLabels.length = 0;
    this.backgroundColor.length = 0;
    this.currentRepo={};
  }

  fetchUser = function (form: any) {

    this.resetData();
    this.isShowRepositories = false;
    this.showRepoButtonTag = "Show Repositories";
    this.isShowChart = false;
    this.showChartButtonTag = "View";

    if (form.value.user && form.value.user != "") {
      this.getUser(form.value.user).then((res) => {
        if(this.isInvalidUser)
          return;
        this.userDetails = res.data,
        this.isInvalidUser = false;
        this.isSubmitClicked = true;
        this.user = res.data.login;
        this.URL = res.data.url;
        this.repository = res.data.public_repos;
        this.company = res.data.company;

        if (this.company == null)
          this.company = "Personal"

        this.getRepoDetails(this.userDetails.repos_url).then((res) => {
          this.repoData = res.data;
        }, (err) => {
          console.error(err);
        })

      }, (err) => {
        console.error(err);
      })
    }
  }

  fetchFollowers = function () {
    this.getFollowers(this.userDetails.followers_url).then((res) => {
      this.followers = res.data;
      for (let follower of this.followers) {
        this.getUser(follower.login).then((res) => {
          this.followersDetails.set(follower.login, res.data);
        }, (err) => {
          console.log("User not found " + err);
        })
      }
    }, (err) => {
      console.error(err);
    });
  }

  fetchRepo = function () {
    this.isShowChart = false;
    this.showChartButtonTag = "View";

    this.isShowRepositories = !this.isShowRepositories;
    this.showRepoButtonTag = this.isShowRepositories ? "Hide Repositories" : "Show Repositories";
    if (!this.repoData) {
      this.getRepoDetails(this.userDetails.repos_url).then((res) => {
        console.log(res.data);
        this.repoData = res.data;
      }, (err) => {
        console.error(err);
      })
    }
  }

  getUser = async function (user: string) {
    var rquestURI = `https://api.github.com/users/${user}?client_id=${this.CLIENT_ID}&client_secret=${this.CLIENT_SECRET}`;
    var api_call = await fetch(rquestURI);
    if(api_call.status == 404){
      this.isInvalidUser =  true;
      return;
    }
    var data = await api_call.json();
    return { data };
  }

  getRepoDetails = async function (repoURL:string) {
    var api_call = await fetch(`${repoURL}?client_id=${this.CLIENT_ID}&client_secret=${this.CLIENT_SECRET}`);
    var data = await api_call.json();
    return { data };
  }

  getFollowers = async function (followerURL: string) {
    var api_call = await fetch(`${followerURL}?client_id=${this.CLIENT_ID}&client_secret=${this.CLIENT_SECRET}`)
    var data = await api_call.json();
    return { data };
  }

  getChart = function () {
    this.isShowRepositories = false;
    this.showRepoButtonTag = "Show Repositories";

    this.isShowChart = true;
    if (!this.isChartCreated) {
      for (let repo of this.repoData) {
        this.chartData.push(repo.forks_count);
        this.chartLabels.push(
          repo.name
        );
        this.backgroundColor.push(this.colorGenerator.materialColor());
      }
      this.chartColors[0].backgroundColor = this.backgroundColor;
    }
    this.isChartCreated = true;
  }

  public chartClicked(e: any): void { }

  public chartHovered(e: any): void { }
  
  public getStartCount(numberOfForks, numberOfIssues): any[] {
    if (numberOfIssues >= numberOfForks || numberOfForks == 0) {
      return new Array(1);
    }
    if (Math.abs(numberOfForks - numberOfIssues) <= 25) {
      return new Array(2);
    }
    else if (Math.abs(numberOfForks - numberOfIssues) <= 50) {
      return new Array(3);
    }
    else if (Math.abs(numberOfForks - numberOfIssues) <= 75) {
      return new Array(4);
    }
    else {
      return new Array(5);
    }
  }
  
  getFormattedDate(dateFrom){
    return this.dateUtil.getTimeLapsed(new Date(dateFrom));
  }
  
  getCurrentRepo(repo: any){
    this.forksData.length = 0;
    this.isShowRepoDetails = true;
    this.currentRepo = repo;
    this.getForksList(repo.name).then((res)=>{
      this.forksData = res.data;
      for(let item of this.forksData){
        this.getUser(item.owner.login).then((data)=>{
          item.userDetails = data;
          console.log("Details for "+ item.owner.login);
          console.log(JSON.stringify(item.userDetails))
        },(err)=>{
          console.error(err);
        })
      }  
    },(err)=>{
      console.error(err);
    })
  }

  getForksList = async function(repoName: string){
    const api = `https://api.github.com/repos/${this.userDetails.login}/${repoName}/forks?client_id=${this.CLIENT_ID}&client_secret=${this.CLIENT_SECRET}`;
    var api_call = await fetch(api);
    if(api_call.status != 404){
      var data = await api_call.json();
      return {data};
    } 
  }

}
