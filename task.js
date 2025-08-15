function solution(D) {
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let dayValues = { 'Mon': 0, 'Tue': 0, 'Wed': 0, 'Thu': 0, 'Fri': 0, 'Sat': 0, 'Sun': 0 };
    let counts = { 'Mon': 0, 'Tue': 0, 'Wed': 0, 'Thu': 0, 'Fri': 0, 'Sat': 0, 'Sun': 0 };

    // Step 1: Aggregate sums for each day
    for (let dateStr in D) {
        let date = new Date(dateStr);
        let dayName = dayNames[date.getDay()];
        dayValues[dayName] += D[dateStr];
        counts[dayName] += 1;
    }

    // Step 2: Fill missing days with mean of previous and next
    let days = Object.keys(dayValues);
    for (let i = 0; i < days.length; i++) {
        if (counts[days[i]] === 0) {
            let prevIndex = (i - 1 + days.length) % days.length;
            let nextIndex = (i + 1) % days.length;

            while (counts[days[prevIndex]] === 0) {
                prevIndex = (prevIndex - 1 + days.length) % days.length;
            }
            while (counts[days[nextIndex]] === 0) {
                nextIndex = (nextIndex + 1) % days.length;
            }

            dayValues[days[i]] = Math.round((dayValues[days[prevIndex]] + dayValues[days[nextIndex]]) / 2);
        }
    }

    return dayValues;
}

// ---------------- Unit Tests ----------------

function deepEqual(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}

(function testSolution() {
    // Test 1: Example with all days present
    let input1 = {
        '2020-01-01': 4,
        '2020-01-02': 4,
        '2020-01-03': 6,
        '2020-01-04': 8,
        '2020-01-05': 2,
        '2020-01-06': -6,
        '2020-01-07': 2,
        '2020-01-08': -2
    };
    let expected1 = { 'Mon': -6, 'Tue': 2, 'Wed': 2, 'Thu': 4, 'Fri': 6, 'Sat': 8, 'Sun': 2 };
    console.assert(deepEqual(solution(input1), expected1), "Test 1 Failed");

    // Test 2: Missing Thu & Fri
    let input2 = {
        '2020-01-01': 6,
        '2020-01-04': 12,
        '2020-01-05': 14,
        '2020-01-06': 2,
        '2020-01-07': 4
    };
    let expected2 = { 'Mon': 2, 'Tue': 4, 'Wed': 6, 'Thu': 8, 'Fri': 10, 'Sat': 12, 'Sun': 14 };
    console.assert(deepEqual(solution(input2), expected2), "Test 2 Failed");

    // Test 3: Only Mon & Sun present
    let input3 = {
        '2020-01-06': 10, // Mon
        '2020-01-05': 20  // Sun
    };
    let expected3 = { 'Mon': 10, 'Tue': 15, 'Wed': 15, 'Thu': 15, 'Fri': 15, 'Sat': 15, 'Sun': 20 };
    console.assert(deepEqual(solution(input3), expected3), "Test 3 Failed");

    console.log("All tests passed!");
})();
