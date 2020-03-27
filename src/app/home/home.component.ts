import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { element } from '@angular/core/src/render3';
import { User } from '../files/user';
import { Couples } from '../files/couple-employees';
import { Couple } from '../files/couple-employees';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users: User[] = [];
  couples: Couples;
  singleCouples: Couple[] = [];
  text: string[];

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getUsers().subscribe(data => {
      this.text = data.split('\n');
      this.createCouples(this.text);
    });

  }

  createCouples(currentData) {
    this.users = [];
    currentData.forEach((currentUser) => {

      this.users.push(new User(currentUser));

     });

       this.couples = new Couples(this.users);

        // console.log(this.couples); // Check the object
    // Console OUTPUT
 this.couples.couples.forEach((currentCouple) => {
  console.log(`Emp1ID: ${currentCouple.empID1} Emp2ID: ${currentCouple.empID1}
  projectID: ${currentCouple.projectID} WorkedDays: ${currentCouple.daysWorked}`);
});


  }



  handleFileSelect(evt)  {
      const files = evt.target.files; // FileList object
      // Loop through the FileList and render image files as thumbnails.
      for (let i = 0, f; f = files[i]; i++) {
          const reader = new FileReader();
          reader.onload = ((Currentreader) =>
          {
              return () =>
              {
                  const contents = reader.result;
                  const lines = contents.split('\n');
                  this.createCouples(lines);
              }
          })(reader);

          reader.readAsText(f);
      }
  }



}
