import { Component } from '@angular/core';
import { Grade } from './grade';

@Component({
    selector: 'app-grades',
    templateUrl: './grades.component.html'
})
export class GradesComponent {
    //  used to keep up with grades
    grades: Grade[] = [];
    finalGrade = 0;
    weightTotal = 0;

    // form values
    name = '';
    weight = null;
    percent = null;
    pointsEarned = null;
    pointsPossible = null;

    // validation and ui controls
    percentMode = true;
    nameValid = true;
    percentValid = true;
    weightValid = true;
    enoughWeight= false;
    overflowWeight = false;
    pointsPossibleValid = true;
    pointsEarnedValid = true;

    // take user input from the form and create a new grade from it if the input was valid
    add(): void {
        // doing some validation resets to be safe
        this.nameValid = true;
        this.percentValid = true;
        this.weightValid = true;
        this.pointsEarnedValid = true;
        this.pointsPossibleValid = true;
        this.overflowWeight = false;

        if (this.name.length === 0 || this.name.length > 15) {
            // name wasn't entered or is too long
            this.nameValid = false;
        }

        if (this.weight > 100 || this.weight <= 0) {
            // weight cannot be more than 100 or less than or equal to 0
            this.weightValid = false;
        }

        if (this.percentMode) {
            if (this.percent < 0 || this.percent > 200 || this.percent === null) {
                // percent must be between 0 and 200 (inclusive of 200)
                this.percentValid = false;
            }
        }else {
            if (this.pointsPossible < 0 || this.pointsPossible >= 10000 || this.pointsPossible === null) {
                this.pointsPossibleValid = false;
            }
            if (this.pointsEarned < 0 || this.pointsEarned >= 10000 || this.pointsEarned === null) {
                this.pointsEarnedValid = false;
            }

            // convert points back to percent
            this.percent = (this.pointsEarned / this.pointsPossible) * 100;
        }

         // check that the weight total is still equal to or less than 100 after new grade
        if ((this.weightTotal + this.weight) <= 100) {
            // check that all user input was valid
            if (this.nameValid && this.weightValid && this.percentValid) {
                this.weightTotal += this.weight;
                this.grades.push(new Grade(this.name, this.weight, this.percent));
                this.calculateFinalGrade();

                // reset input values
                this.name = '';
                this.percent = null;
                this.weight = null;
                this.pointsEarned = null;
                this.pointsPossible = null;

                if (this.weightTotal === 100) {
                    this.enoughWeight = true;
                }else {
                    this.enoughWeight = false;
                }
            }
        }else {
            this.overflowWeight = true;
        }
    }

    // removes a grade from the grade array
    remove(grade: Grade): void {
        this.weightTotal -= grade.weight;
        this.overflowWeight = false;
        this.enoughWeight = false;
        this.grades.splice(this.grades.indexOf(grade), 1);
    }

    // calculates the user's final grade based on their input
    calculateFinalGrade(): void {
        this.finalGrade = 0;

        // take the weight and percent of each grade and multiply them together
        // then add the result from each grade together to get final score
        for (const grade of this.grades) {
            this.finalGrade += (grade.percent * grade.weight);
        }

        this.finalGrade /= 100;
    }

    // toggles between percent and point mode based off state of checkbox
    check(checked) {
        if (checked) {
        this.percentMode = false;
        }else {
        this.percentMode = true;
        }
  }
}
