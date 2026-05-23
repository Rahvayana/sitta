//Fahrul Sanjaya
//NIM : 055179048
//UT Surabaya
const nim: string = "055179048";
const lastTwoDigits: number = parseInt(nim.slice(-2));
const primeMax: number = lastTwoDigits + 10;
function isPrime(num: number): boolean {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

const primeNumbers: number[] = [];
for (let i = 2; i <= primeMax; i++) {
    if (isPrime(i)) {
        primeNumbers.push(i);
    }
}
console.log(primeNumbers.join(", "));