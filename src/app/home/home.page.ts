import { Component } from '@angular/core';
import { File } from '@ionic-native/file/ngx';
import { HTTP } from '@ionic-native/http/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private downloadedFile;

  constructor(private file: File, private http: HTTP) { }

  downloadFile() {
    var url = "http://africau.edu/images/default/sample.pdf";
    this.http.sendRequest(url, { method: "get", responseType: "arraybuffer" }).then(
      httpResponse => {
        console.log("File dowloaded successfully")
        this.downloadedFile = new Blob([httpResponse.data], { type: 'application/pdf' });
      }
    ).catch(err => {
      console.error(err);
    })
  }

  async writeFile() {
    if (this.downloadedFile == null) return;
    var filename = 'myDownloadedPdfFile.pdf';
    await this.createFile(filename);
    await this.writeToFile(filename);
  }

  createFile(filename) {
    return this.file.createFile(this.file.externalRootDirectory, filename, false).catch(err => {
      console.error(err);
    })
  }

  writeToFile(filename) {
    return this.file.writeFile(this.file.externalRootDirectory, filename, this.downloadedFile, { replace: true, append: false }).then(createdFile => {
      console.log('File written successfully.');
      console.log(createdFile)
    }).catch(err => {
      console.error(err);
    });
  }
}
