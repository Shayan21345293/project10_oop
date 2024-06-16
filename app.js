#!/usr/bin/env node 
import inquirer from "inquirer";
class Student {
    name;
    constructor(n) {
        this.name = n;
    }
}
class Person {
    students = [];
    addStudent(obj) {
        this.students.push(obj);
    }
}
const persons = new Person();
let programStart = async (persons) => {
    console.log("Welcome!");
    let continueProgram = true;
    while (continueProgram) {
        const ans = await inquirer.prompt([{
                name: "select",
                type: "list",
                message: "Whom would you like to interact with?",
                choices: ["staff", "student", "exit"]
            }]);
        if (ans.select == "staff") {
            console.log("You approach the staff room. Please feel free to ask any questions.");
        }
        else if (ans.select == "student") {
            let addingStudents = true;
            while (addingStudents) {
                let ans = await inquirer.prompt([{
                        name: "student",
                        type: "input",
                        message: "ENTER THE STUDENT NAME: "
                    }]);
                let student = persons.students.find(val => val.name == ans.student);
                if (!student) {
                    let newStudent = new Student(ans.student);
                    persons.addStudent(newStudent);
                    console.log(`Hello, I am ${newStudent.name}`);
                    console.log("New student added.");
                }
                else {
                    console.log(`Hello, I am ${student.name}`);
                }
                console.log("Current student list: ");
                persons.students.forEach(s => console.log(s.name));
                let moreStudents = await inquirer.prompt([{
                        name: "addMore",
                        type: "confirm",
                        message: "Do you want to add more students?"
                    }]);
                addingStudents = moreStudents.addMore;
            }
        }
        else if (ans.select == "exit") {
            console.log("Exiting the program...");
            continueProgram = false;
        }
    }
};
programStart(persons);
