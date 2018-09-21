// export default forbiddenNameValidator(nameRe: RegExp): ValiditorFn {
//     return (control: AbstractControl): {[key: string]: any} => {
//         const forbidden = nameRe.test(control.value);
//         return forbidden ? {'forbiddenName': {value: control.value}} : null;
//     };
// }