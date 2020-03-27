export class DateParser {
    date: Date;
    inputDate: string;

    constructor(date) {

        this.inputDate = date.toLowerCase();
    }

    public dateValidator() {
        const months: string[][] = [
            ['януари', 'февруари', 'март', 'април', 'май', 'юни', 'юли', 'август', 'септември', 'октомври', 'ноември', 'декември'],
            [' January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
            ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
            ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        ];

        for (let i = 0; i < months.length; i++) {
            for (let j = 0; j < months[0].length; j++) {
                if (this.inputDate.includes(months[i][j]).toString().toLowerCase()) {
                    if (j > 9) {
                        this.inputDate = this.inputDate.replace(months[i][j].toLowerCase(), `0${j}`);
                    } else {
                        this.inputDate = this.inputDate.replace(months[i][j].toLowerCase(), `${j}`);
                    }
                }

            }
        }
        if (this.inputDate.includes('.')) {
            this.inputDate = this.inputDate.replace(/\./g, `-`);
        }
        if (this.inputDate.includes('г')) {
            this.inputDate = this.inputDate.replace('г', ``).trim();
        }
        if (this.inputDate.includes('/')) {
            this.inputDate = this.inputDate.replace(/\//g, `-`);
        }
        if (this.inputDate.includes(' ')) {
            this.inputDate = this.inputDate.replace(/ /g, `-`);
        }
        // }



        if (this.inputDate === 'NULL') {
            this.date = new Date();
        } else {
            // create the Date Object
            const toDate = (dateStr) => {
                if (this.inputDate === 'null') {
                    return new Date();
                }
                const [day, month, year] = dateStr.split('-');
                if (year) {
                    if (year.length > 2) {
                        return new Date(year, month, day);
                    } else {
                        return new Date(day, month, year);
                    }
                }
            };
            this.date = toDate(this.inputDate);
        }

        return this.date;
    }
}
