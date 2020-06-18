import { Component, OnInit } from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';

@Component({
  selector: 'app-roadmap',
  templateUrl: './roadmap.component.html',
  styleUrls: ['./roadmap.component.css']
})
export class RoadmapComponent implements OnInit {

  treeControl = new NestedTreeControl<FoodNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<FoodNode>();

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: FoodNode) => !!node.children && node.children.length > 0;

  ngOnInit() {
  }

}



interface FoodNode {
  name: string;
  desc?: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Mobile',
    children: [
      {name: 'IOS', 
      desc:'dajpppposajdajpppposajopajOJSpofjopsaopo dajpppposajdajpppposajopajOJSpofjopsaopodajpppposajdajpppposajopajOJSpofjopsaopodajpppposajdajpppposajopajOJSpofjopsaopodajpppposajdajpppposajopajOJSpofjopsaopojsapogJSOjgpsodajpppposajopajOJSpofjopsaopo jsapogJSOjgpsoopajOJSpofjopsaopo jsapogJSOjgpso'},
      {name: 'Android', desc:'dajpppposajopajOJSpofjopsaopo jsapogJSOjgpso'},
      {name: 'Cross-Platform', desc:'dajpppposajopajOJSpofjopsaopo jsapogJSOjgpso'},
    ]
  }, {
    name: 'Web Dev',
    children: [
      {
        name: 'Frontend',
        children: [
          {name: 'UI Designer'},
          {name: 'UI/UX'},
        ]
      }, {
        name: 'Backend',
        children: [
          {name: 'Nodejs'},
          {name: '.Net'},
          {name: 'Python'},
        ]
      },
    ]
  },
];

