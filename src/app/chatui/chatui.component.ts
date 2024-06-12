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
  modelList: any = [];

  form: any;
  btnSend: string = 'Send';

  constructor(private dataService: DataService){}

  ngOnInit(): void {
    this.modelList = [
      '@cf/meta/llama-2-7b-chat-int8',
      '@cf/meta/llama-2-7b-chat-fp16',
      '@hf/nexusflow/starling-lm-7b-beta',
      '@cf/mistral/mistral-7b-instruct-v0.1-vllm',
      '@cf/mistral/mistral-7b-instruct-v0.1-vllm',
      '@cf/qwen/qwen1.5-0.5b-chat'
    ]

    this.response = "";
    this.model = '@hf/nexusflow/starling-lm-7b-beta' //'@cf/meta/llama-2-7b-chat-int8';

    this.form = new FormGroup({
      prompt: new FormControl()
    });

    this.resetMessage();
  }

  resetMessage(){
    console.log("RESET");

    this.model = localStorage.getItem("model") ?? '@cf/meta/llama-2-7b-chat-int8';
    console.log(`Model: ${this.model}`);

    this.message = [];
    this.message.push({
      role: "system",
      content: ""
    });

    this.input = {
      messages: this.message,
      max_tokens : 1024
    };
  }

  selectModel(val: string){
    localStorage.setItem("model", val);
    this.resetMessage();
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
      this.message.push({role: "assistant", content: this.response});
      this.form.patchValue({ prompt: '' }); // reset input
      this.btnSend = 'Send';
    });
  }
}
