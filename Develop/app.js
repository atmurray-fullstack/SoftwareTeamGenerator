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
                                    name: "name",
                                    validate: async (input) => {
                                        if (await input.trim().length === 0) {
                                            return "not valid entry brah!";
                                        } else if (input.match(/^[a-zA-Z]+( [a-zA-Z]+)*$/i)) {
                                            return true;
                                        } else {
                                            return "Not a valid entry brah!"
                                        }
                                    }
                                },
                                {
                                    type: "input",
                                    message: "What is the persons id",
                                    name: "id",
                                },
                                {
                                    type: "input",
                                    message: "What is the person's email?",
                                    name: "email",
                                    validate: async (input) => {
                                        if (input.match(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/i)) {
                                            return true;
                                        } else {
                                            return "Not valid email."
                                        }
                                    }
                                },
                                {
                                    type: "input",
                                    message: "What is the person's office number?",
                                    name: "officeNumber",
                                    validate: async (input) => {
                                        if (input.match(/^[0-9]+$/i)) {
                                            return true;
                                        } else {
                                            return "Not valid. Enter office number."
                                        }
                                    }
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
                                    name: "name",
                                    validate: async (input) => {
                                        if (await input.trim().length === 0) {
                                            return "not valid entry brah!";
                                        } else if (input.match(/^[a-zA-Z]+( [a-zA-Z]+)*$/i)) {
                                            return true;
                                        } else {
                                            return "Not a valid entry brah!"
                                        }
                                    }
                                },
                                {
                                    type: "input",
                                    message: "What is the persons id",
                                    name: "id",
                                },
                                {
                                    type: "input",
                                    message: "What is the person's email?",
                                    name: "email",
                                    validate: async (input) => {
                                        if (input.match(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/i)) {
                                            return true;
                                        } else {
                                            return "Not valid email."
                                        }
                                    }
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
                                    name: "name",
                                    validate: async (input) => {
                                        if (await input.trim().length === 0) {
                                            return "not valid entry brah!";
                                        } else if (input.match(/^[a-zA-Z]+( [a-zA-Z]+)*$/i)) {
                                            return true;
                                        } else {
                                            return "Not a valid entry brah!"
                                        }
                                    }
                                },
                                {
                                    type: "input",
                                    message: "What is the persons id",
                                    name: "id",
                                },
                                {
                                    type: "input",
                                    message: "What is the person's email?",
                                    name: "email",
                                    validate: async (input) => {
                                        if (input.match(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/i)) {
                                            return true;
                                        } else {
                                            return "Not valid email."
                                        }
                                    }
                                },
                                {
                                    type: "input",
                                    message: "What is the person's school?",
                                    name: "school",
                                    validate: async (input) => {
                                        if (await input.trim().length === 0) {
                                            return "not valid entry brah!";
                                        } else if (input.match(/^[a-zA-Z]+( [a-zA-Z]+)*$/i)) {
                                            return true;
                                        } else {
                                            return "Not a valid entry brah!"
                                        }
                                    }
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
        let html = render(allArr);
        let val = fs.existsSync(OUTPUT_DIR)

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
        } else if (val === true) {
            fs.writeFile(outputPath, html, (err) => {
                if (err) {
                    console.log(err);
                }
            });
        }



    });

