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
    /*
    const reqHeader = new HttpHeaders().set('Authorization', 'Bearer GFCabbU5_Bi8KKqxVsKXRqfqCyQIg1whdbvePD5y').set('Content-Type', 'application/json').set('Connection', 'keep-alive').set('User-Agent', 'PostmanRuntime/7.39.0')
    console.log(reqHeader)
    const options = {
      headers: reqHeader,
      body: JSON.stringify(input),
    }; 
    let body = JSON.stringify(input)
    //return this.http.post(url, body, options);*/
    let body = input;
    console.log(body)
    return this.http.post(url, body);
  }
}
