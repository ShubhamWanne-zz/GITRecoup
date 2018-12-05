import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RestDoaAdvanceService {

  constructor() { }

  getUsers = async function(userName: string) {
    var api_call = await fetch(`https://api.github.com/search/users?q=${userName}`);
    console.log(api_call);
    var data = await api_call.json();
    return {data};
  }

}
