import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl,FormGroup, Validators,FormArray} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ExamService } from '../../shared/services/exam.service';
import { questionService } from '../../shared/services/question.service';
import { CreateExam } from '../../shared/Models/questionExam.model';
import { A } from '../..//shared/Models/answers.model';


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  UserID = localStorage.getItem("userId");
  CourseName = "HTML";
  QsExam: CreateExam[] = [];

  Answers: A[] = [];

  finished = false;
  showSpinner = true;

  isLinear = false;
  createdForms=0;
  formGroup : FormGroup;
  form: FormArray;
  
  constructor(private _formBuilder: FormBuilder, private modalService: NgbModal,
    private examService:ExamService, private questionService:questionService) {  
  }

  ngOnInit() {
    this.examService.createExam({UserID:this.UserID, CourseName:this.CourseName})
    .subscribe(res => {
      this.questionService.getQuestion().subscribe(Qs => {
        for(let i=0; i<res.length; i++){
          this.QsExam.push({
            questId : res[i].questId,
            questName: res[i].questName,
            examId: res[i].examId,
            rightAns: res[i].rightAns
          })
        }
        for(let i=0; i<Qs.length; i++){
          for(let j=0; j<this.QsExam.length; j++){
            if(this.QsExam[j].questId == Qs[i].questId){
              this.QsExam[j].a = Qs[i].a;
              this.QsExam[j].b = Qs[i].b;
              this.QsExam[j].c = Qs[i].c;
              break;
            }
          }
        }
        console.log(this.QsExam);
        this.showSpinner = false
      })
    });

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

  // getAnswer(choice, id){
  //   for(let i of this.Answers){
  //     if(i.qNum == id){
  //       i.choice = choice;
  //       return;
  //     }
  //   }
  //   this.Answers.push({qNum: id, choice: choice});
  // }

  // showAnswers(){
  //   this.finished = true;
  //   console.log(this.Answers);
  //   this.modalService.dismissAll();
  // }
  openModal(content) {
    this.modalService.open(content, {centered: true, backdropClass: 'dark-modal'});
  }


}


