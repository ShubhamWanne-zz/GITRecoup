import { Injectable } from '@angular/core';
import { stringify } from '@angular/core/src/util';

@Injectable({
  providedIn: 'root'
})
export class RestDOAService {

  CLIENT_ID: string = "MDIxMDVjYTEwMDdiYWIzZGI3MjA=";
  CLIENT_SECRET: string = "OTMzNDkwZmMzNzlmMTc1Y2UwY2Q4OWYwOTNjOWFjYTNhNWNhZGUzNw==";

  constructor() {
    this.CLIENT_ID = atob(this.CLIENT_ID);
    this.CLIENT_SECRET = atob(this.CLIENT_SECRET);

    console.log("this.CLIENT_ID : "+this.CLIENT_ID);
    console.log("this.CLIENT_SECRET : "+this.CLIENT_SECRET);
  }

  getReadme = async function (repoName: string, username: string){
    var api_call = await fetch(`https://raw.githubusercontent.com/${username}/${repoName}/master/README.md?client_id=${this.CLIENT_ID}&client_secret=${this.CLIENT_SECRET}`);
    var data = await api_call.text();
    return { data };
  }

  getUser = async function (user: string) {
    var rquestURI = `https://api.github.com/users/${user}?client_id=${this.CLIENT_ID}&client_secret=${this.CLIENT_SECRET}`;
    var api_call = await fetch(rquestURI);
    let data: any= {
      DOAServiceStatus: ""
    }
    if (api_call.status == 404) {
      data.DOAServiceStatus = api_call.status;
    }else{
      data = await api_call.json();
    }
    return { data };
  }

  getRepoDetails = async function (repoURL: string) {
    var api_call = await fetch(`${repoURL}?client_id=${this.CLIENT_ID}&client_secret=${this.CLIENT_SECRET}`);
    var data = await api_call.json();
    return { data };
  }

  getFollowers = async function (followerURL: string) {
    var api_call = await fetch(`${followerURL}?client_id=${this.CLIENT_ID}&client_secret=${this.CLIENT_SECRET}`)
    var data = await api_call.json();
    return { data };
  }

  getForksList = async function (repoName: string, username: string) {
    const api = `https://api.github.com/repos/${username}/${repoName}/forks?client_id=${this.CLIENT_ID}&client_secret=${this.CLIENT_SECRET}`;
    var api_call = await fetch(api);
    if (api_call.status != 404) {
      var data = await api_call.json();
      return { data };
    }
  }

}
