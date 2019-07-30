/**
 * 'hello types'
 *
 * literal & union types
 */
type fooString = 'foo';
type onlyFalse = false;

const thereIsOnlyOneFoo: fooString = "foo";
const isItStillWarmOutside: onlyFalse = false;

type fooObject = {
    name?: string | string[],
    string: fooString,
    hasToBeFalse: onlyFalse
}

const object: fooObject = {
    name: '',
    string: "foo",
    hasToBeFalse: false
}

type PersonTitle = 'Mr' | 'Mrs' | 'Miss' | 'Dr' | 'Other'

// const title: PersonTitle =

/**
 * enum
 *
 * outputs code and used during runtime
 *
 * const enum PersonTitleEnum... would prevent this, inlining the value
 */
enum PersonTitleEnum {
    Mr,
    Mrs,
    Miss,
    Dr,
    Other
}

console.log(PersonTitleEnum.Mr)

/**
 * interfaces
 *
 * Work like types but can be merged and extended
 */
interface PersonDetails {
    name: string,
    age?: number,
    dob: Date,
    hobbies?: string[]
}

interface PersonDetails {
    title: PersonTitle,
}

const me: PersonDetails = {
    name: 'Tris',
    dob: new Date(),
    age: 0,
    title: 'Mr'
}

/**
 * extending an interface
 */
interface MorePersonDetails extends PersonDetails {
    height?: number
}

// const someoneElse: MorePersonDetails = {
//
// }

/**
 * function type annotations
 */
function lengthOfArray(array: []): number {
    return array.length;
}

lengthOfArray([])
// lengthOfArray(true)

/**
 * function type alias
 */
type lengthOfArrayType = (array: []) => number
const lengthOfArrayFn: lengthOfArrayType = (array) => {
    return array.length;
}

lengthOfArrayFn([])
// lengthOfArrayFn('string')

/**
 * default params
 *
 * replace the type with the default value
 *
 * The type is inferered from it's value
 */
function buildName(firstName: string, lastName = "Smith") {
    return firstName + " " + lastName;
}

buildName('Foo');
buildName('Foo', 'Bar');

/**
 * readonly property
 *
 * - Compile-time immutability
 * - Value cannot be set after initialisation
 */
interface ReadOnlyPerson {
    readonly name: string,
    readonly age?: number
}

const personFrozen: ReadOnlyPerson = {
    name: 'Person'
}

// personFrozen.name = '';
// personFrozen.age = 100

/**
 * generics
 *
 * Allows for flexible, 'generic' typing
 */
type genericTypePassThrough<T> = {
    (thing: T) : T
}

const stringPassThrough: genericTypePassThrough<string> = function(thing: string) {
    return thing;
}

const boolPassThrough: genericTypePassThrough<boolean> = function(thing: boolean) {
    return thing;
}

/**
 * any type
 *
 * remove the type out of TypeScript,
 * break incase of emergency type,
 * voids your warrenty,
 * basically here be dragons...
 *
 */
function addTwoNumbersAny(number: any, number2: any): any {
    return number + number2;
}

addTwoNumbersAny(1, true);
addTwoNumbersAny(NaN, undefined);

// function changeReadonlyArrayToAString(array: readonly string[]) { // usage of .pop method dissalowed, as it would be mutating a readonly array
function changeReadonlyArrayToAString(array: any) { // any type removes readonly type, we can now do whatever we want with the contents
    // Array.prototype.pop mutates the array, removing the last element
    array.pop();

    return array;
}

var array: Readonly<string[]> = ['one', 'two', 'three'];

console.log(array); // BEFORE

changeReadonlyArrayToAString(array);

console.log(array); // AFTER

/**
 * 'as' keyword
 *
 * - 'weak-type casting' a type of one thing to another
 * - none of this touches runtime
 * - telling the compiler explicity what type it is and what it can be used for
 *
 */
// TS knows this will be a form, as we're grabbing a form element
var formElement = document.querySelector('form');

// TS doesn't know what type of element it is as we're going off a class
var formClassElement = document.querySelector('.payment-form') as HTMLFormElement;

// Can also use a generic value
var formClassElementGeneric = document.querySelector<HTMLFormElement>('.payment-form');

// compiler still has your back in some aspects though

// var obviouslyAString = 'totally-not-an-array';
//
// (obviouslyAString as []).join()

/**
 * The 'it's there, honest' operator
 *
 * Using '!.' we can tell TS that a nullable value exists no matter what
 */

const input = document.querySelector('input');

const inputValue = input!.value;

/**
 * function overloading
 */

// setting the overloaded methods - these are not included in runtime
function overloaded(): void;
function overloaded(one: string): void;
function overloaded(one: string, two: string): void;

//implementing overloads with a single method
function overloaded(one?: string, two?: string): void {
    if(one && two) {
        return console.log('overloaded with two arguments');
    }

    if(one) {
        return console.log('overloaded with one argument');
    }

    return console.log('no arguments passed, not overloaded');
}

overloaded();
overloaded('one arg');
overloaded('one arg', 'two arg');

/**
 * index types
 *
 * - Want to add abit of type safety to dynamic property names
 * - Super easy way to create hash maps
 *
 */

function pluckFromObject<T, K extends keyof T> (dataSet: T, propertyNames: K[]): T[K][] {
    return propertyNames.map(propertyName => dataSet[propertyName]);
}

interface Car {
    manufacturer: string;
    model: string;
    year: number;
}

let taxi: Car = {
    manufacturer: 'Toyota',
    model: 'Camry',
    year: 2014
};

// Manufacturer and model are both of type string,
// so we can pluck them both into a typed string array
let makeAndModel: string[] = pluckFromObject(taxi, ['manufacturer']);

// #Map
interface StatusCodeHashMap {
    [key: number]: string
}

const httpStatusCodes: StatusCodeHashMap = {
    200: "OK",
    404: "NOT FOUND",
    418: "I'M A TEAPOT"
}

/**
 * utility types
 *
 * - Built in TS types that take a type as a generic and returns a new type based on it.
 * - Allows a type to be tweaked without needing to make a seperate type
 *
 */
interface BaseInterface {
    name: string,
    title: string,
    age?: number
}

const allRequiredBase: Required<BaseInterface> = {
    name: 'name',
    age: 0,
    title: 'title'
}

const allOptional: Partial<BaseInterface> = {
    name: 'name'
}

const allReadOnly: Readonly<BaseInterface> = {
    name: 'name',
    title: 'title'
}

//
// allReadOnly.age = 20

/**
 * classes
 *
 * compiles to ES6 classes
 */
interface ClockConstructor {
    new (hour: number, minute: number): void
}

interface ClockInterface {
    hour: number,
    minute: number,
    tick(): void
}

class Clock implements ClockInterface {
    hour: number;
    minute: number;

    constructor(hour: number, minutes: number) {
        this.hour = hour;
        this.minute = minutes;
    }

    tick() {
        console.log("beep beep");
    }
}

new Clock(6, 34).tick()

/**
 * side note: limiting the range of a number...
 *
 * TypeScript currently doesn't have a 'nice' way of doing this
 *
 * but..
 *
 * Can use a number union to limit a value to specific range
 */

// requires this to be done by hand...
// this is only for hours...

type TwentyFourHours = 0|1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18|19|20|21|22|23;
const clockHour: TwentyFourHours = 17;

type NumberZeroToTen = 0|1|2|3|4|5|6|7|8|9|10
const number: NumberZeroToTen = 10;
