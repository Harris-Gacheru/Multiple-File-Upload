import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';
  uploadForm!: FormGroup
  uploads = []
  uploadedImages: any[] = []

  constructor(private http: HttpClient, private fb: FormBuilder){
    this.uploadForm = this.fb.group({
      photos: [null],
      name: ['']
    })
  }

  onFileChange(e: any){
    if (e.target.files.length > 0) {
      this.uploads = e.target.files
    }
  }
  
  submit(){
    const formData = new FormData()

    for(let upload of  this.uploads){
      formData.append('uploads', upload)
    }
    
    formData.append('name', this.uploadForm.get('name')?.value)
    
    this.http.post<any>('http://localhost:3800/upload', formData).subscribe(
      res => {
        if (res.success) {
          this.uploadForm.reset()

          let filenames: any[] = []

          for(let photo of res.photos){
            filenames.push(photo.filename)
          }
          
          this.uploadedImages = [...this.uploadedImages, ...filenames]
        }
      },
      err => console.log(err)
    )
    
  }
}
