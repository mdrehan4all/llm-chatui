import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-chatui',
  templateUrl: './chatui.component.html',
  styleUrl: './chatui.component.scss'
})
export class ChatuiComponent implements OnInit{
  
  response: any;

  input: any;
  message: any = [];
  model: string = '';

  form: any;
  btnSend: string = 'Send';

  constructor(private dataService: DataService){}

  ngOnInit(): void {
    this.response = "";
    this.model = '@cf/gemma-7b-it' //'@cf/meta/llama-2-7b-chat-int8';

    this.form = new FormGroup({
      prompt: new FormControl()
    });

    this.resetMessage();
  }

  resetMessage(){
    this.message = [];
    this.message.push({
      role: "system",
      content: "You are a friendly assistan that helps write stories"
    });

    this.input = {
      messages: this.message
    };
  }

  submit(){
    let val = this.form.get('prompt').value;
    /*
    let input = {
      messages: [
        {
          role: "system",
          content: "You are a friendly assistan that helps write stories"
        },
        {
          role: "user",
          content: "What is comman @angular/common "
        }
      ]
    };
    */

    this.message.push({role: "user", content: val});

    let input = this.input;
    console.log(input);
    this.btnSend = 'Fetching...'
    this.dataService.get_result(this.model, input).subscribe((response: any) => {
      this.response = response.result.response;
      //console.log(JSON.stringify(response.result.response));
      this.message.push({role: "system", content: this.response});
      this.form.patchValue({ prompt: '' }); // reset input
      this.btnSend = 'Send';
    });
  }
}
