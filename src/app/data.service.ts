import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  get_result(model: string, input: any) {
    let url = `https://coderelisher.com/ai/fetch/?model=${model}`;
    //let url = `https://coderelisher.com/ai/fetch/`;
    //let url = `http://localhost:8080/ai/fetch/`;
    let body = input;
    console.log(body)
    return this.http.post(url, body);
  }
}
