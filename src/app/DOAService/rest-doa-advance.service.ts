import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RestDoaAdvanceService {

  constructor() { }

  getUsers = async function(userName: string, page: number) {
    var api_call = await fetch(`https://api.github.com/search/users?q=${userName}&page=${page}`);
    var data = await api_call.json();
    return {data};
  }
  getTopics = async function(topic: string, page: number) {
    var api_call = await fetch(`https://api.github.com/search/topics?q=${topic}&page=${page}`,{
      method: 'GET',
      headers : {
        'Content-Type' : 'application/json',
        'Accept': 'application/vnd.github.mercy-preview+json'
      }
    });
    var data = await api_call.json();
    return {data};
  }
  getRepositories = async function (search: string, page: number) {
    var api_call = await fetch(`https://api.github.com/search/repositories?q=${search}&page=${page}`,{
      method: 'GET',
      headers : {
        'Content-Type' : 'application/json',
        'Accept': 'application/vnd.github.mercy-preview+json'
      }
    });
    var data = await api_call.json();
    return {data};
  }
}
