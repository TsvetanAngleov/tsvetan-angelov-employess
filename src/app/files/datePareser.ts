export  class DateParser {
 date: Date;

constructor(date)  {
if (date === 'NULL') {
   this.date = new Date();
} else {
    this.date = new Date(date);
    }



}

}


