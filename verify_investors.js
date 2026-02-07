const fs = require('fs');
const path = require('path');

const jsonPath = path.join(process.cwd(), 'public/data/investors.json');

try {
    const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    const sources = {};

    data.forEach(item => {
        const s = item.source || 'Unknown';
        sources[s] = (sources[s] || 0) + 1;
    });

    console.log('Unique sources found:');
    console.log(JSON.stringify(sources, null, 2));
} catch (error) {
    console.error('Error reading file:', error);
}
