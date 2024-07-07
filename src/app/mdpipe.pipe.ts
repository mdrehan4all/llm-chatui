import { Pipe, PipeTransform } from '@angular/core';
import { marked } from 'marked';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'mdpipe'
})
export class MdpipePipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  transform(value: unknown, ...args: unknown[]) {
    // console.log(value);
    let response: string = <string> value;
    response = response.replace(/>/g, "&gt;");
    response = response.replace(/</g, "&lt;");
    response = response.replace(/\n/g, "<br/>");
    response = response.replace(/  /g, "&nbsp;&nbsp;");
    response = response.replace(/   /g, "&nbsp;&nbsp;&nbsp;");
    response = response.replace(/    /g, "&nbsp;&nbsp;&nbsp;");
    // return response;
    //const html: any = marked.parse(response);
    const html: any = response;
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

}
