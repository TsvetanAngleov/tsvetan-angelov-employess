
class Couple { // single couple
    empID1: string;
    empID2: string;
    projectID: string;
    daysWorked: number;

    constructor(currentEmp1, currentEmp2, workedTime, currenProjectID) {
        this.empID1 =  currentEmp1;
        this.empID2 =  currentEmp2;
        this.projectID =  currenProjectID;
        this.daysWorked =  workedTime;
    }
}

export class Couples {
 couples:Couple[] = []; // Array of all couples






    constructor(allUsers) {
        const projectsBuffer: string[] = []; // holds project ids
        const idsBuffer: any[] =  [];  // holds the ids of employees  for a couple pointed their index in allUsers
        let counter = 0;
        const workedDaysBuffer: number[] = []; // holds the  period as number for every single couple
        const millisecondsPerDay = 24 * 60 * 60 * 1000;
        let maxTime = 0; // holds the largest period as number
        let wdBuffer: number;  // buffer holding days worked together as decimal number in   milliseconds
        allUsers.forEach((currentUser) => {
            projectsBuffer.push(currentUser.projectID);
        });
        // GET COUPLES WITH THE SAME PROJECT ID
        // idsBuffer contains array with indexes of Users from allUsers as couple
        // idsBuffer[0] emp1 index from allUsers
        // idsBuffer[1] emp2 index from allUsers
        // idsBuffer[2] worked time together as number
        // idsBuffer[3] projectId
        for (let i = 0; i < projectsBuffer.length; i++) {
             for (let j = i + 1; j < projectsBuffer.length; j++) {

                // Match projects ids
                if (projectsBuffer[i] === projectsBuffer[j]) {
                    const prID = Number(projectsBuffer[i]);
                   const buffer = [i , j, 0, prID];
                   idsBuffer[counter] = buffer;
                    // buffer[0] = i;  // add emp1 index
                   //  buffer[1] = j;  // add emp2 index
                   //  buffer[2] = 0; // initialize worked time 0
                   //  buffer[3] = Number(projectsBuffer[i])); // add project id

                    counter++;

                }
        }
            }

            // Compare Dates
            for (let i = 0; i < idsBuffer.length; i++) { // Check  if 'from' is after 'to' workedDays=0
                if (
                     (allUsers[idsBuffer[i][0]].dateFrom > allUsers[idsBuffer[i][0]].dateTo)
                     ||
                     (allUsers[idsBuffer[i][1]].dateFrom > allUsers[idsBuffer[i][1]].dateTo)
                    ) {
        workedDaysBuffer[i] = 0;

      } else {
                // IF they have worked on the project together
                // workedDays buffer contains woked time as number in the same order as couples in idsBuffer
                // example: workedDays[1]is the time for idsBuffer[1]
             if (allUsers[idsBuffer[i][0]].dateFrom > allUsers[idsBuffer[i][1]].dateTo) {
                    workedDaysBuffer[i] = 0;
             } else { // calculating period worked together "lowles end date"-"biggest start date"
                   if (allUsers[idsBuffer[i][0]].dateTo <= allUsers[idsBuffer[i][1]].dateTo) {
                                if (allUsers[idsBuffer[i][0]].dateFrom >= allUsers[idsBuffer[i][1]].dateFrom) {
                                    wdBuffer = allUsers[idsBuffer[i][0]].dateTo - allUsers[idsBuffer[i][0]].dateFrom;
                            } else {
                                wdBuffer = allUsers[idsBuffer[i][0]].dateTo - allUsers[idsBuffer[i][1]].dateFrom;
                                }
                     } else {
                         if (allUsers[idsBuffer[i][0]].dateFrom >= allUsers[idsBuffer[i][1]].dateFrom) {
                                    wdBuffer = allUsers[idsBuffer[i][1]].dateTo - allUsers[idsBuffer[i][0]].dateFrom;
                            } else {
                                    wdBuffer = allUsers[idsBuffer[i][1]].dateTo - allUsers[idsBuffer[i][1]].dateFrom;
                                    }
                         }
                                 workedDaysBuffer[i] = Math.floor( wdBuffer / millisecondsPerDay);
                                 // console.log(workedDaysBuffer[i]); // CHECK CALCULATION HERE!!!

                }
            }
        }
        // Push the time to the ids

        for (let i = 0; i < idsBuffer.length; i++) {
            // adding time to all couples
            idsBuffer[i][2] = idsBuffer[i][2] + workedDaysBuffer[i];
            for (let j = i + 1; j < idsBuffer.length; j++) {
                // IF couple is same as another one and project id is the same add worked time in frst match of couples
                // idsBuffer[i][0] === idsBuffer[j][0] match emp1
                // idsBuffer[i][1] === idsBuffer[j][1] match emp2
               if (idsBuffer[i][0] === idsBuffer[j][0] && idsBuffer[i][1] === idsBuffer[j][1] && idsBuffer[i][3] === idsBuffer[j][3]) {
                   idsBuffer[i][2] = idsBuffer[i][2] + workedDaysBuffer[j];
            }
                }
        }
        // GETTING MAX TIME WORKED
        for (let i = 0; i < idsBuffer.length; i++) {
            if (idsBuffer[i][2] > maxTime) {
            maxTime = idsBuffer[i][2];
                     }
        }
        // Generating object
        for (let i = 0; i < idsBuffer.length; i++) {
            if (idsBuffer[i][2] === maxTime) {
                // Call Couple constructor(emp1Id,emp2Id,workedtime,projectID)
                /// add new couple
    this.couples.push(new Couple(allUsers[idsBuffer[i][0]].empID, allUsers[idsBuffer[i][1]].empID,idsBuffer[i][2], idsBuffer[i][3] ) );
            }
        }
    }

}



