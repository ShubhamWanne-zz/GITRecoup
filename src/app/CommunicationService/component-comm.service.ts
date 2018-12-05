import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs'

@Injectable({
  providedIn: 'root'
})

export class ComponentCommService {
  private subject= new Subject<any>();

  public sendMessage(message: any){
    this.subject.next(message);
  }

  public getMessage(): Observable<any>{
    return this.subject.asObservable();
  }

  constructor() { }
}
