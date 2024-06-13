#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import { differenceInSeconds } from "date-fns";
console.log(chalk.italic.bgCyan.underline('\n\t>>>>>>>>>>>>>>CountDown Timer<<<<<<<<<<<<<<'));
const res = await inquirer.prompt([
    {
        name: "userInput",
        type: "number",
        message: "please Enter the amount of second",
        validate: (input) => {
            if (isNaN(input)) {
                return "Please Enter Valid Number";
            }
            else if (input > 60) {
                return "second must be in 60";
            }
            else {
                return true;
            }
        }
    }
]);
let input = res.userInput;
function startTime(value) {
    const intTime = new Date().setSeconds(new Date().getSeconds() + value);
    const inetervalTime = new Date(intTime);
    setInterval((() => {
        const currTime = new Date();
        const timeDiff = differenceInSeconds(inetervalTime, currTime);
        if (timeDiff <= 0) {
            console.log("Timer has Expired");
            process.exit();
        }
        const min = Math.floor((timeDiff % (3600 * 24)) / 3600);
        const sec = Math.floor(timeDiff % 60);
        console.log(`${min.toString().padStart(2, "0")}: ${sec.toString().padStart(2, "0")}`);
    }), 1000);
}
startTime(input);
