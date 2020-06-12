import { Component, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

interface Questions {
  id: number;
  title: string;
  choice1: string;
  choice2: string;
  choice3: string;
}
const QUESTIONS: Questions[] = [
  {
    id: 1,
    title:'What is HTML stands for?',
    choice1:'hijkl,',
    choice2:'hijkl,',
    choice3:'hijkl,'
  },
  {
    id: 2,
    title:'sample questionfks ?',
    choice1:'hijkl,',
    choice2:'hijkl,',
    choice3:'hijkl,'
  },
  {
    id: 3,
    title:'Wfgfdslm omes?',
    choice1:'hijkl,',
    choice2:'hijkl,',
    choice3:'hijkl,'
  },
  {
    id: 4,
    title:'What is HTML stands for?',
    choice1:'hijkl,',
    choice2:'hijkl,',
    choice3:'hijkl,'
  }
];


function search(text: string, pipe: PipeTransform): Questions[] {
  return QUESTIONS.filter(q => {
    const term = text.toLowerCase();
    return q.title.toLowerCase().includes(term);
  });
}

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
  providers: [DecimalPipe]
})

export class QuestionComponent {

  question$: Observable<Questions[]>;
  filter = new FormControl('');

  constructor(pipe: DecimalPipe) {
    this.question$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => search(text, pipe))
    );
  }
  page = 1;
  pageSize = 4;
  collectionSize = QUESTIONS.length;

  get questions(): Questions[] {
    return QUESTIONS
      .map((q, i) => ({id: i + 1, ...q}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

}