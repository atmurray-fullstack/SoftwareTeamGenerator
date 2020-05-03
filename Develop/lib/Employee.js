// TODO: Write code to define and export the Employee class

class Employee {

    constructor(name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;

    }

    getName() {
        return this.name
    }

    getId() {
        return this.id
    }

    getEmail() {
        return this.email
    }

    getRole() {
        return "Employee"
    }

}
// const e = new Employee("andrew",100,"atmurray@pary.com")
// console.log(typeof e)
// console.log(e.name)
// console.log(e.id)
// console.log(e.email)
// console.log(e.getName())
// console.log(e.getId())
// console.log(e.getEmail())
module.exports = Employee;