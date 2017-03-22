class Person {
  constructor(name) {
    this._name = name
  }

  get name() { return this._name }
  set name(name) { return this._name = name }
}

class Teacher extends Person {
  constructor(name) {
    super(name);
  }
}

class Student extends Person {
  constructor(name, iq=110) {
    super(name)
    this._iq = iq
  }

  get iq() { return this._iq }
  learn() { ++this._iq; return this }
  responseTime() { return Math.floor(100000 / this._iq) }

  async answerQuestion(func, params_obj) {
    var that = this;

    var answer_after_thinking = function() {
      return new Promise( (res, rej) => {
        setTimeout( () => {
          res( func(params_obj) )
        }, that.responseTime() );
      });
    }
    return await answer_after_thinking(func, params_obj)
  }
}

// create a teacher and the teacher thinks up a question to ask a student
const teacher = new Teacher('Mrs. Lady');
function multiply_all(params_arr) {
  return params_arr.reduce( (a,b) => {return a * b} )
}

// student to answer a teachers question and their response time is based on their iq
const joe = new Student("Joe");
joe.answerQuestion(multiply_all, [1,2,3,4,5]).then(time_for_correct_student_response => {
  console.log( time_for_correct_student_response );
})

// show learning lowers response time for questions
console.log("joe can answer a question in " + joe.responseTime() + " milliseconds")
for(let i = 0; i < 10; i++) { joe.learn() }
console.log("joe can answer a question in " + joe.responseTime() + " milliseconds")
