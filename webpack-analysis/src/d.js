export class D {
    constructor() {
        console.log('classD');
    }
}
export function d() {
    const test1 = new D();
    console.log(test1);
    console.log('functionD');
}

