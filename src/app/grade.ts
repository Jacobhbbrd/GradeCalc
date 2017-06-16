export class Grade {
    name: string;
    weight: number;
    percent: number;

    constructor(
        nameInput: string,
        weightInput: number,
        percentInput: number) {
        this.name = nameInput;
        this.weight = weightInput;
        this.percent = percentInput;
    }
}
