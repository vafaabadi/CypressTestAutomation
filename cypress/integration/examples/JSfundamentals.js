// type  node C:\Users\44741\CypressTestAutomation\cypress\integration\examples\JSfundamentals.js   in Terminal to obverse Hello World typed in the Terminal.

// 1. Hello World
console.log("Hello World!")

// variables - variable are mechanism to hold certain information during runtime/execution process
var firstName = "John"
let lastName = "Smith"
console.log(firstName)
console.log(lastName)

var age, DOB, sex   // values can be assigned to the variables later
age = "5"
sex = "male"
console.log(age)
age = "6"
console.log(age)

// constants - constant cannot create unless the value is assigned immiediately
const occupation = "engineer"
console.log(occupation)

// data types
var middleName = "David"        //string. every value in double quote is string.
var ageOfBorther = 25           //number. if I put number in quote, then computer thinks it is a string
var isHeMarried = false         //boolean. two values: true or false.
var yearsInMarriage = null      //null. null: no value.
var numberOfCars = undefined    //undefined. we cannot use something that is not defined.

//Concatenation and Interpolation
var price = 50
var itemName = "Cup"
var messageToPrint = "The price of your " +itemName+ " is " +price+ " dollars" //concatenation
var messageToPrint2 = `The price of your ${itemName} is ${price} dollars`       //interpolation
console.log(messageToPrint)
console.log(messageToPrint2)

//Objects 
var customer = {
    firstName: 'John',
    lastName: 'Smith',
    car: ["Volvo", "Toyota", "Tesla"]
}
customer.firstName = 'Mike'
console.log(customer)
console.log(customer.firstName)
console.log(customer['firstName'])
console.log(`${customer.firstName} ${customer.lastName}`)

//Arrays - Array has index 0, 1, 2
 var car = ["Volvo", "Toyota", "Tesla"]
 car[0] = "BMW"
 console.log(car[0])
 console.log(customer.car[1])

 //Relational or Comparison operators
 // > - more than
 // < - less than
 // >= - more than equal
 // <= - less than equal

 var result = 10 > 5
 console.log(result)    // returns true (or false)
 var result2 = 6 <= 5
 console.log(result2)   

 //equality operators
 var x = 1
 console.log(x == '1')  // returns true. lose comparison = compares value on the left to value on the right. we didnt compare data type. we just compared values.
 console.log(x === '1') // returns false. strict comparison = compares value and datatype of the value. 1 is a number but '1' is a tring. so datatypes are not equal. 
 console.log(x === 1)   // returns true. strict comparison. both values and both datatyps are equal.

 // Logical operator - "AND"
 console.log(true && true)   //all values have to be TRUE for expression to be TRUE. returns true.
 console.log(true && false)  //returns false.
 console.log(false && false) //returns false.

  // Logical operator - "OR"
  console.log(true || false) //any value should be TRUE for the expression to be TRUE

  var ageISMoreThanEighteen = true
  var isUSCitizen = true
  var eligibilityForDrivingLicence = ageISMoreThanEighteen && isUSCitizen
  console.log('This customer is eligible for DL: ' + eligibilityForDrivingLicence )     //returns true

  var ageISMoreThanEighteen2 = false
  var isUSCitizen2 = true
  var eligibilityForDrivingLicence2 = ageISMoreThanEighteen2 && isUSCitizen2
  console.log('This customer is eligible for DL: ' + eligibilityForDrivingLicence2 )    //returns false

  var ageISMoreThanEighteen = false
  var isUSCitizen = false
  var eligibilityForDrivingLicence = ageISMoreThanEighteen || isUSCitizen
  console.log('This customer is eligible for DL: ' + eligibilityForDrivingLicence )     //returns false

  // Logical operator - "NOT" - NOT is opposite to true
  console.log(!true)
  console.log(6 !== 10)

  // Conditional statement

  // If hour between 6 and 12, print "Good Morning"
  // If hour between 12 and 18, print "Good Afternoon"
  // Otherwise: Good Evening

  var hour = 6
  if(hour >= 6 && hour < 12)
  {
    console.log('Good Morning')
  } else if (hour >= 12 && hour < 18)
  {
    console.log('Good Afternoon')
  } else
  {
    console.log('Good Evening')
  }


  var ageISMoreThanEighteen = true
  var isUSCitizen = true
  if(ageISMoreThanEighteen && isUSCitizen)
  {
    console.log('Customer is eligible for DL')
  } else 
  {
    console.log('Customer is not eligible for DL')
  }

// Loops
for(let i = 0; i < 5; i++)
{
    console.log('Hello World!')
}

var cars = ["Volvo", "Toyota", "Tesla"]
for(let car of cars)
{
    console.log(car)
    if(car=="Toyota")
    {
        break
    }
}

cars.forEach(car =>
    {
        console.log(car)
    }
    )

//functions:

// declarative function - can be called at the beginning of the code even if the function is declared later on in the code.
helloOne()   //    <- invoke function

function helloOne()
{
    console.log('Hello One!')
}

// anonymous function - anonymous function is called after it is defined
var helloTwo = function()
{
    console.log('Hello Two!')
}
helloTwo()  //      <- invoke function 


//ES6 function syntax or arrow function
var helloThree = () => 
{
    console.log('Hello Three!')
}
helloThree()

//function with arguments
function printName(name1, name2)
{
    console.log(name1 + ' ' + name2)
}
printName('John', 'Smith')

// function with returns
function multiplyByTwo(number)
{
    var result = number * 2
    return result
}
var myResult = multiplyByTwo(8)
console.log(myResult)

// functions can be created in one file and called in another file.

// import function
//import { printName } from '../relativepath/functionsFile.js'        // make sure you type export before the name of fucntion in the functionFile folder.
//printName('kolooche','kachal')

// import everything
// * as helper from '../relativepath/functionsFile.js'
//helper.nameOfFunction()