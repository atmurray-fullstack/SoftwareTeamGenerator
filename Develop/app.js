const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
var validator = require("email-validator");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");

const managerArr = [];
const engineerArr = [];
const internArr = [];


function startTeam() {
    return inquirer.prompt([
        {
            type: "confirm",
            message: "Are you ready to start the team?",
            name: "start",

        },
    ])
}


function promptUser() {
    return inquirer.prompt([
        {
            type: "list",
            message: "What is the person's role?",
            name: "role",
            choices: ["Manager", "Engineer", "Intern"],
        },
    ])
}




startTeam()
    .then(async function (reply) {

        if (reply.start === true) {
            let moreEmployees = true;

            while (moreEmployees === true) {

                await promptUser()
                    .then(async function (ans) {
                        if (ans.role === "Manager" && managerArr.length === 0) {
                            await inquirer.prompt([
                                {
                                    type: "input",
                                    message: "What is the persons name?",
                                    name: "name"
                                },
                                {
                                    type: "input",
                                    message: "What is the persons id",
                                    name: "id"
                                },
                                {
                                    type: "input",
                                    message: "What is the person's email?",
                                    name: "email",
                                },
                                {
                                    type: "input",
                                    message: "What is the person's office number?",
                                    name: "officeNumber",
                                },
                            ]).then(async function (ans) {
                                const { name, id, officeNumber, email } = await ans
                                let manager = new Manager(name, id, email, officeNumber);
                                managerArr.push(manager);

                            })
                        } else if (ans.role === "Engineer") {
                            await inquirer.prompt([
                                {
                                    type: "input",
                                    message: "What is the persons name?",
                                    name: "name"
                                },
                                {
                                    type: "input",
                                    message: "What is the persons id",
                                    name: "id"
                                },
                                {
                                    type: "input",
                                    message: "What is the person's email?",
                                    name: "email",
                                },
                                {
                                    type: "input",
                                    message: "What is the person's Github username?",
                                    name: "github",
                                },
                            ]).then(async function (ans) {
                                const { name, id, github, email } = await ans
                                let engineer = new Engineer(name, id, email, github);
                                engineerArr.push(engineer);


                            })
                        } else if (ans.role === "Intern") {
                            await inquirer.prompt([
                                {
                                    type: "input",
                                    message: "What is the persons name?",
                                    name: "name"
                                },
                                {
                                    type: "input",
                                    message: "What is the persons id",
                                    name: "id"
                                },
                                {
                                    type: "input",
                                    message: "What is the person's email?",
                                    name: "email",
                                },
                                {
                                    type: "input",
                                    message: "What is the person's school?",
                                    name: "school",
                                },
                            ]).then(async function (ans) {
                                const { name, id, school, email } = await ans
                                let intern = new Intern(name, id, email, school);
                                internArr.push(intern);


                            })
                        } else if (ans.role === "Manager" && managerArr.length > 0) {
                            console.log("There is already a Manager for this project")
                        }



                    });


                await inquirer.prompt([
                    {
                        type: "confirm",
                        name: "moreEmployees",
                        message: "Add another person?",
                    },
                ]).then(function (ans) {
                    if (ans.moreEmployees == false) {
                        return moreEmployees = false;
                    }
                })



            }
        } else {
            return
        }

        let allArr = [...managerArr, ...engineerArr, ...internArr];

        console.log(allArr)
        // console.log(render(allArr));
        let html = render(allArr);

        let val = fs.existsSync(OUTPUT_DIR)
        
        console.log(val);
        if (val === false) {
            fs.mkdir(OUTPUT_DIR, (err) => {
                if (err) {
                    console.log(err);
                }
            });
            fs.writeFile(outputPath, html, (err) => {
                if (err) {
                    console.log(err);
                }
            });
        } else if (val===true) {
            fs.writeFile(outputPath, html, (err) => {
                if (err) {
                    console.log(err);
                }
            });
        }



    });



// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```
