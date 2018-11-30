import { Component, OnInit } from '@angular/core';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
import { ColorGenerator } from '../../Color';

@Component({
  selector: 'app-operation',
  templateUrl: './operation.component.html',
  styleUrls: ['./operation.component.scss']
})
export class OperationComponent implements OnInit {
  CLIENT_ID: string = "02105ca1007bab3db720";
  CLIENT_SECRET: string = "933490fc379f175ce0cd89f093c9aca3a5cade37";
  isSubmitClicked: boolean = false;
  isInvalidUser: boolean = false;
  isShowRepositories: boolean = false;
  showRepoButtonTag: string = "Show Repositories";
  isShowChart: boolean = false;
  showChartButtonTag: string = "View";
  userName: string;
  URL: string;
  repository: string;
  company: string;
  userDetails: any;
  repoData: any[];
  followers: any[];
  followersDetails = new Map();
  colorGenerator = new ColorGenerator();

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

  constructor() {
  }

  ngOnInit() {
  }

  resetData = function () {
    isSubmitClicked: false;
    isInvalidUser: false;
    isShowRepositories: false;
    showRepoButtonTag: "Show Repositories";
    isShowChart: false;
    this.isChartCreated = false;
    showChartButtonTag: "View";
    userName: "";
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
  }

  fetchUser = function (form: any) {

    this.resetData();
    this.isShowRepositories = false;
    this.showRepoButtonTag = "Show Repositories";
    this.isShowChart = false;
    this.showChartButtonTag = "View";

    if (form.value.user != "") {
      this.getUser(form.value.user).then((res) => {
        if (res.data.name == null) {
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

        if (this.company == null)
          this.company = "Personal"

        this.getRepoDetails().then((res) => {
          this.repoData = res.data;
        }, (err) => {
          console.error(err);
        })

      }, (err) => {
        console.error(err);
      })
    }
  };
  fetchFollowers = function () {
    this.getFollowers().then((res) => {
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
      this.getRepoDetails().then((res) => {
        this.repoData = res.data;
      }, (err) => {
        console.error(err);
      })
    }
  }

  getUser = async function (user: string) {
    var rquestURI = `https://api.github.com/users/${user}?client_id=${this.CLIENT_ID}&client_secret=${this.CLIENT_SECRET}`;
    var api_call = await fetch(rquestURI);
    var data = await api_call.json();
    return { data };
  };

  getRepoDetails = async function () {
    console.log(`${this.userDetails.repos_url}?client_id=${this.CLIENT_ID}&client_secret=${this.CLIENT_SECRET}`);
    var api_call = await fetch(`${this.userDetails.repos_url}?client_id=${this.CLIENT_ID}&client_secret=${this.CLIENT_SECRET}`);
    var data = await api_call.json();
    return { data };
  }

  getFollowers = async function () {
    var api_call = await fetch(`${this.userDetails.followers_url}?client_id=${this.CLIENT_ID}&client_secret=${this.CLIENT_SECRET}`)
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
  public chartOptions: any = {
    responsive: true
  };
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
}
