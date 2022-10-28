const winArray = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
let arr = [6, 7, 8];
for (const element of winArray) {
    console.log(element);
    console.log(element.toString() === arr.toString());
}