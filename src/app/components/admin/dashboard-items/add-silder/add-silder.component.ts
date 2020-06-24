import { Component, OnInit } from '@angular/core';
import { sliderService } from '../../../../shared/services/slider.service';
import { slider } from '../../../../shared/Models/slider.model';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-silder',
  templateUrl: './add-silder.component.html',
  styleUrls: ['./add-silder.component.css']
})


export class AddSilderComponent implements OnInit {
  slider: FormGroup;
  fileData: File = null;
  previewUrl:any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  constructor(private sliderService:sliderService,
    private _snackBar: MatSnackBar,
    private router:Router) { }

  ngOnInit() {
   
   
  }
  saveData(data){
    const formData = new FormData();
      formData.append('file', this.fileData);
      
    const c = new slider;
    c.title = data.title;
    c.sliderLink = data.link;
    c.description=data.desc;
    c.image=this.fileData.name;
    console.log(data.desc)
    console.log(c.image)
    console.log(data.link)
    console.log(data.title)


    this.sliderService.postSlider(c)
      .subscribe(res => console.log(res));
    // this.router.navigateByUrl('/dummy', { skipLocationChange: true }).then(() => {
    //   this.router.navigate(['/admin/track']);
    // });
  }
  // onFileChange(event, field,files) {
  //   console.log("Event", event);
  //   console.log("field",field);
  //   // this.preview(files);
  //   if (event.target.files && event.target.files.length) {
      
  //     const [file] = event.target.files;

  //     // just checking if it is an image, ignore if you want
  //     if (!file.type.startsWith('image')) {
  //       this.slider.patchValue({
  //         [field]: null
  //       });
  //     } else {
  //       // unlike most tutorials, i am using the actual Blob/file object instead of the data-url
  //       this.slider.patchValue({
  //         [field]: file
  //       });
  //       // need to run CD since file load runs outside of zone
  //      // this.cd.markForCheck();
  //     }


  //   }
  // }
  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview();
}

preview() {
  // Show preview 
  var mimeType = this.fileData.type;
  if (mimeType.match(/image\/*/) == null) {
    return;
  }

  var reader = new FileReader();      
  reader.readAsDataURL(this.fileData); 
  reader.onload = (_event) => { 
    this.previewUrl = reader.result; 
  }
}



  openSnackBar() {
    this._snackBar.open('Added..', 'X', {
      duration: 2000,
      horizontalPosition: "right",
      verticalPosition: "bottom",
    });
}
}
