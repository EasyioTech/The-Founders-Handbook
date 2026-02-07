const fs = require('fs');
const path = require('path');

const jsonPath = 'f:/Devlopment Projects/The-Founders-Handbook/public/data/investors.json';
const outputPath = 'f:/Devlopment Projects/The-Founders-Handbook/check_presence_node.txt';
const searchTerm = 'Dale Ventures';

try {
    console.log('Reading from:', jsonPath);
    const content = fs.readFileSync(jsonPath, 'utf8');

    if (content.includes(searchTerm)) {
        fs.writeFileSync(outputPath, 'Found');
        console.log('Found');
    } else {
        fs.writeFileSync(outputPath, 'Not Found');
        console.log('Not Found');
    }
} catch (error) {
    console.error('Error:', error);
    fs.writeFileSync(outputPath, 'Error: ' + error.message);
}
