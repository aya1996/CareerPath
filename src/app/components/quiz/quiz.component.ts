import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl,FormGroup, Validators,FormArray} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

interface Q{
  id:number,
  head:string,
  choice1: string,
  choice2: string,
  choice3: string,
}

interface A{
  qNum: number,
  choice: string
}


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {


   Qs: Q[] = [
    {
      id:1,
      head:'HTML stands for?',
      choice1:'Hyper Text Markup Language',
      choice2:'High Text Markup Languag',
      choice3:'Hyper Tabular Markup Language'
    },
    {
      id:2,
      head:'Who is making the Web standards?',
      choice1:'Microsoft',
      choice2:'Mozilla',
      choice3:'W3Consortium'
    },
    {
      id:10,
      head:'Choose the correct HTML element for the largest heading:',
      choice1:'<h6>',
      choice2:'<h1>',
      choice3:'<head>'
    },
    {
      id:20,
      head:'What is the correct HTML element for inserting a line break?',
      choice1:'<br>',
      choice2:'<break>',
      choice3:'<lb>'
    },
    {
      id:11,
      head:'HTML stands for?',
      choice1:'Hyper Text Markup Language',
      choice2:'High Text Markup Languag',
      choice3:'Hyper Tabular Markup Language'
    },
    {
      id:22,
      head:'HTML stands for?',
      choice1:'Hyper Text Markup Language',
      choice2:'High Text Markup Languag',
      choice3:'Hyper Tabular Markup Language'
    },
    {
      id:13,
      head:'HTML stands for?',
      choice1:'Hyper Text Markup Language',
      choice2:'High Text Markup Languag',
      choice3:'Hyper Tabular Markup Language'
    },
    {
      id:14,
      head:'HTML stands for?',
      choice1:'Hyper Text Markup Language',
      choice2:'High Text Markup Languag',
      choice3:'Hyper Tabular Markup Language'
    },
    {
      id:21,
      head:'HTML stands for?',
      choice1:'Hyper Text Markup Language',
      choice2:'High Text Markup Languag',
      choice3:'Hyper Tabular Markup Language'
    },
    {
      id:31,
      head:'HTML stands for?',
      choice1:'Hyper Text Markup Language',
      choice2:'High Text Markup Languag',
      choice3:'Hyper Tabular Markup Language'
    }
  ]

  Answers: A[] = [];

  finished = false;

  isLinear = false;
  createdForms=0;
  formGroup : FormGroup;
  form: FormArray;
  constructor(private _formBuilder: FormBuilder, private modalService: NgbModal) {  
  }

  ngOnInit() {
    this.formGroup = this._formBuilder.group({
      form : this._formBuilder.array([this.init()])
    }) 
    this.addItem();
  }

  init(){
    return this._formBuilder.group({
      cont :new FormControl('', [Validators.required]),
    })
  }

  addItem(){
    if(this.createdForms < 9)
    {
      this.form = this.formGroup.get('form') as FormArray;
      this.form.push(this.init());
    }
    this.createdForms++;
  }

  getAnswer(choice, id){
    for(let i of this.Answers){
      if(i.qNum == id){
        i.choice = choice;
        return;
      }
    }
    this.Answers.push({qNum: id, choice: choice});
  }
  showAnswers(){
    this.finished = true;
    console.log(this.Answers);
    this.modalService.dismissAll();
  }
  openModal(content) {
    this.modalService.open(content, {centered: true, backdropClass: 'dark-modal'});
  }


}


