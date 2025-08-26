import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
/*export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
*/
export class MainComponent implements OnInit {
  images = [
    {
      url: 'assets/img1.jpg',
      title: 'Laboratoire CNSTN',
      description: 'Recherche scientifique et innovation'
    },
    {
      url: 'assets/img2.jpg',
      title: 'Technologie nucléaire',
      description: 'Sécurité et modernité au service de la science'
    },
    {
      url: 'assets/img3.jpg',
      title: 'Collaboration Internationale',
      description: 'Un avenir construit ensemble'
    }
  ];

  currentIndex = 0;

  ngOnInit() {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }, 5000); // Change every 5 seconds
  }
}