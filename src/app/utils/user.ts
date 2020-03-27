import {DateParser} from '../utils/dataParser';

export class User {
    empID: string;
    projectID: string;
    dateFrom: Date;
    dateTo: Date;
    daysWorked: number;

    constructor(currentUser) {
        {
            // Buffer Vars
            let buffer: string[];
            const dateBuffer: DateParser[] = [];
            const millisecondsPerDay = 24 * 60 * 60 * 1000;
               buffer = currentUser.split(',');
              // console.log(buffer);               // full string buffer // check here
               dateBuffer[0] = new DateParser(buffer[2].trim()); // parse date from
               dateBuffer[1] = new DateParser(buffer[3].trim()); // parse date to

                // Set propertis of the instace
               this.empID = buffer[0].trim();
        this.projectID = buffer[1].trim();
        this.dateFrom = dateBuffer[0].dateValidator() ;
        this.dateTo = dateBuffer[1].dateValidator() ;
        this.daysWorked = Math.floor(( Number(this.dateTo) - Number(this.dateFrom)) / millisecondsPerDay);
          }

    }

}
