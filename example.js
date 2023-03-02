// Sample JSON data
const jsonData = [
    {
        "Name": "John",
        "Age": "30",
        "City": "New York"
    },
    {
        "Name": "Mary",
        "Age": "25",
        "City": "Los Angeles"
    },
    {
        "Name": "Mike",
        "Age": "35",
        "City": "Chicago"
    },
];

// Define search criteria
const searchCriteria = {
    "Name": "John",
    "Age": "30",
};

// Find the matching row
const row = jsonData.find((row) => {
    return Object.entries(searchCriteria).every(([key, value]) => {
        return row[key] === value;
    });
});

if (row) {
    console.log("Matching row:", row);
} else {
    console.log("No matching row found.");
}