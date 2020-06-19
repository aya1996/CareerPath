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

  Answers: A = {};

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

      // this.Answers.Q1 = res[0].questId.toString();
      // this.Answers.Q2 = res[1].questId.toString();
      // this.Answers.Q3 = res[2].questId.toString();
      // this.Answers.Q4 = res[3].questId.toString();
      // this.Answers.Q5 = res[4].questId.toString();
      // this.Answers.Q6 = res[5].questId.toString();
      // this.Answers.Q7 = res[6].questId.toString();
      // this.Answers.Q8 = res[7].questId.toString();
      // this.Answers.Q9 = res[8].questId.toString();
      // this.Answers.Q10 = res[9].questId.toString();
      this.Answers.ExamID = res[0].examId;
      this.Answers.UserID = this.UserID;

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
        //console.log(this.QsExam);
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
  
  Arr:IAnswer[] = [];

  getAnswer(choice, id){
    for(let i=0; i<this.Arr.length; i++){
      if(this.Arr[i].qnum == id)
        this.Arr[i].qAns = choice;
    }
    this.Arr.push({qnum:id, qAns:choice});
  }

  assingAnswers(){
    this.Answers.Q1 = this.Arr[0].qnum;
    this.Answers.Q2 = this.Arr[1].qnum;
    this.Answers.Q3 = this.Arr[2].qnum;
    this.Answers.Q4 = this.Arr[3].qnum;
    this.Answers.Q5 = this.Arr[4].qnum;
    this.Answers.Q6 = this.Arr[5].qnum;
    this.Answers.Q7 = this.Arr[6].qnum;
    this.Answers.Q8 = this.Arr[7].qnum;
    this.Answers.Q9 = this.Arr[8].qnum;
    this.Answers.Q10 = this.Arr[9].qnum;

    this.Answers.Ans1 = this.Arr[0].qAns;
    this.Answers.Ans2 = this.Arr[1].qAns;
    this.Answers.Ans3 = this.Arr[2].qAns;
    this.Answers.Ans4 = this.Arr[3].qAns;
    this.Answers.Ans5 = this.Arr[4].qAns;
    this.Answers.Ans6 = this.Arr[5].qAns;
    this.Answers.Ans7 = this.Arr[6].qAns;
    this.Answers.Ans8 = this.Arr[7].qAns;
    this.Answers.Ans9 = this.Arr[8].qAns;
    this.Answers.Ans10 = this.Arr[9].qAns;
  }

  userGrade;

  showAnswers(){
    this.finished = true;
    this.assingAnswers();
    console.log(this.Answers);
    this.examService.correctExam(this.Answers)
    .subscribe(res => this.userGrade=res[0].gradeOfUser);
    this.modalService.dismissAll();
  }
  
  remainTime;

  openModal(content, c) {
    // console.log(c);
    // console.log(c.config.leftTime);
    let newC = c.i.text.split(":");
    const remainMin = 14 - parseInt(newC[0]);
    const remainSec = 60 - parseInt(newC[1]);
    this.remainTime = `${remainMin}:${remainSec}`;

    //c.pause();
    console.log(this.remainTime)
    this.modalService.open(content, {centered: true});
  }

  // cancel(c){
  //   c.resume();
  //   this.modalService.dismissAll();
  // }
}

interface IAnswer{
  qnum: string;
  qAns: string;
}

