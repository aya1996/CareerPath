import { Component, OnInit } from '@angular/core';
import { sliderService } from '../../../../shared/services/slider.service';
import { slider } from '../../../../shared/Models/slider.model';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-silder',
  templateUrl: './add-silder.component.html',
  styleUrls: ['./add-silder.component.css']
})


export class AddSilderComponent implements OnInit {
  slider: FormGroup;
  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;

  submitted: boolean = false;

  registerForm = new FormGroup({

    title : new FormControl(),
    link : new FormControl(),
    description : new FormControl(),
    files : new FormControl()

    
   });
   public imagePath;
   imgURL: any;
   public defaultImage = true;
  constructor(private sliderService: sliderService,
    private _snackBar: MatSnackBar,
    private router: Router, private fb: FormBuilder) { }

  ngOnInit() { 
   
    
  }
//   get f() {
//     return this.registerForm.controls;
//  }

  register() {
    // this.submitted = true;
    // console.log("subm", this.submitted)
    // if (this.registerForm.invalid) {
    //   return;
    // }
   
      const model = new FormData();

      model.append("title", this.registerForm.value.title);
      model.append("link", this.registerForm.value.link);
      model.append("description", this.registerForm.value.description);
      model.append("files", this.registerForm.value.files);

      console.log('model', this.registerForm.value.files);
      console.log('model', this.registerForm.value.description);
      console.log('model', this.registerForm.value.link);
      console.log('model', this.registerForm.value.title);


      // const formData = new FormData();
      // formData.append('file', this.registerForm.get('file').value);

      // const formData = new FormData();
      // formData.append('file', this.registerForm.get('file').value);

      this.sliderService.postSlider(model)
        .subscribe(res => {

        console.log(res)
        // this.router.navigateByUrl('/dummy', { skipLocationChange: true }).then(() => {
        //   this.router.navigate(['/admin/track']);
        // });
      },
      error => {
        console.log("error", error)
      }
      );
    
  }
  // register()
  // {
  //   this.registerForm = new FormGroup({
  
  //     'title': new FormControl(this.registerForm.value.title),
  //     'link': new FormControl(this.registerForm.value.link),
  //     'description': new FormControl(this.registerForm.value.description),
  //     'files' :new FormControl(this.registerForm.value.files)
  //   });

  //   this.sliderService.postSlider(this.registerForm)
  //   .subscribe((res: any) => {

  //   console.log(res)
  //   // this.router.navigateByUrl('/dummy', { skipLocationChange: true }).then(() => {
  //   //   this.router.navigate(['/admin/track']);
  //   // });
  // },
  // error => {
  //   console.log("error", error)
  // }
  // );
  // }
  // saveData(data){
  //   const formData = new FormData();
  //     formData.append('file', this.fileData);

  //   const c = new slider;
  //   c.title = data.title;
  //   c.sliderLink = data.link;
  //   c.description=data.desc;
  //   c.image=this.fileData.name;
  //   console.log(data.desc)
  //   console.log(c.image)
  //   console.log(data.link)
  //   console.log(data.title)


  //   this.sliderService.postSlider(c)
  //     .subscribe(res => console.log(res));
  //   // this.router.navigateByUrl('/dummy', { skipLocationChange: true }).then(() => {
  //   //   this.router.navigate(['/admin/track']);
  //   // });
  // }
  // onFileChange(event, field,files) {
  //   console.log("Event", event);
  //   console.log("field",field);
  //   //  this.preview();
  //   if (event.target.files && event.target.files.length) {

  //     const [file] = event.target.files;

  //     // just checking if it is an image, ignore if you want
  //     if (!file.type.startsWith('image')) {
  //       this.registerForm.patchValue({
  //         [field]: null
  //       });
  //     } else {
  //       // unlike most tutorials, i am using the actual Blob/file object instead of the data-url
  //       this.registerForm.patchValue({
  //         [field]: file
  //       });
  //       // need to run CD since file load runs outside of zone
  //      // this.cd.markForCheck();
  //     }


  //   }
  // }
  
  // fileProgress(fileInput: any) {
  //   this.fileData = <File>fileInput.target.files[0];
  //   this.preview();
  // }

  // preview() {
  //   // Show preview 
  //   var mimeType = this.fileData.type;
  //   if (mimeType.match(/image\/*/) == null) {
  //     return;
  //   }

  //   var reader = new FileReader();
  //   reader.readAsDataURL(this.fileData);
  //   reader.onload = (_event) => {
  //     this.previewUrl = reader.result;
  //   }
  // }
  preview(files) {
    if (files.length === 0) {

      return;
    }
    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
    
      return;
    }

    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
      this.defaultImage = false;
    };
  }


  onFileChange(event, field, files) {
    console.log("Event", event);
    console.log("field",field);
    this.preview(files);
    if (event.target.files && event.target.files.length) {
      
      const [file] = event.target.files;

      // just checking if it is an image, ignore if you want
      if (!file.type.startsWith('image')) {
        this.registerForm.patchValue({
          [field]: null
        });
      } else {
        // unlike most tutorials, i am using the actual Blob/file object instead of the data-url
        this.registerForm.patchValue({
          [field]: file
        });
        // need to run CD since file load runs outside of zone
       // this.cd.markForCheck();
      }


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
