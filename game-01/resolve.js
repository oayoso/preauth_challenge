function findTwoNumbersSumEqualN(M, N) {
    const newSet = new Set();

    for (const num of M) {
        const add = N - num;
        if (newSet.has(complement)) {
            return [complement, num];
        }
        newSet.add(num);
    }

    return [];
}

console.log(findTwoNumbersSumEqualN([2, 5, 8, 14, 0], 10)); 
console.log(findTwoNumbersSumEqualN([1, 4, 2, 6], 3)); 
console.log(findTwoNumbersSumEqualN([1, 2, 3], 10));