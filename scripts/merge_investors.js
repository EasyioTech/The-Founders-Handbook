const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../public/data');
const RESOURCES_DIR = path.join(__dirname, '../resources');
const INVESTORS_FILE = path.join(DATA_DIR, 'investors.json');

// Simple CSV Parser
function parseCSV(content) {
    const lines = content.split(/\r?\n/);
    const headers = parseLine(lines[0]);
    const results = [];

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        const values = parseLine(line);
        if (values.length === 0) continue;

        const record = {};
        for (let j = 0; j < headers.length; j++) {
            record[headers[j]] = values[j] || '';
        }
        results.push(record);
    }
    return results;
}

function parseLine(text) {
    const results = [];
    let entry = [];
    let inQuote = false;

    for (let i = 0; i < text.length; i++) {
        const char = text[i];

        if (char === '"') {
            inQuote = !inQuote;
        } else if (char === ',' && !inQuote) {
            results.push(entry.join('').trim());
            entry = [];
        } else {
            entry.push(char);
        }
    }
    results.push(entry.join('').trim());
    return results.map(val => val.replace(/^"|"$/g, '').replace(/""/g, '"'));
}

// Helper to clean strings
function clean(str) {
    return str ? str.trim() : '';
}

async function mergeInvestors() {
    console.log('Reading existing investors.json...');
    let investors = [];
    try {
        if (fs.existsSync(INVESTORS_FILE)) {
            investors = JSON.parse(fs.readFileSync(INVESTORS_FILE, 'utf8'));
        }
    } catch (err) {
        console.error('Error reading investors.json:', err);
        return;
    }

    const initialCount = investors.length;
    console.log(`Initial investor count: ${initialCount}`);

    // 1. Process US UAE EU VC List.csv
    const usUaeEuFile = path.join(RESOURCES_DIR, 'US UAE EU VC List.csv');
    if (fs.existsSync(usUaeEuFile)) {
        console.log(`Processing ${usUaeEuFile}...`);
        const fileContent = fs.readFileSync(usUaeEuFile, 'utf8');
        const records = parseCSV(fileContent);
        let addedCount = 0;

        for (const record of records) {
            const name = clean(record['VC Firm name']);
            if (!name) continue;

            // Check for duplicates based on name
            const exists = investors.some(inv => inv.name && inv.name.toLowerCase() === name.toLowerCase());
            if (exists) continue;

            const newInvestor = {
                name: name,
                website: clean(record['Website']),
                "company address": clean(record['Global HQ']),
                focus: clean(record['Countries of investment']),
                stage: clean(record['Stage of investment']),
                contact_person: clean(record['Contact']),
                source: 'us_uae_eu',
                source_geography: 'International' // Default
            };

            // Attempt to infer geography
            const addr = newInvestor["company address"];
            if (addr.includes("UAE") || addr.includes("Dubai") || addr.includes("Abu Dhabi") || addr.includes("United Arab Emirates")) {
                newInvestor.geography = "UAE";
                newInvestor.source_geography = "Middle East";
            } else if (addr.includes("USA") || addr.includes("United States") || addr.includes("San Francisco") || addr.includes("New York")) {
                newInvestor.geography = "USA";
                newInvestor.source_geography = "USA";
            } else if (addr.includes("UK") || addr.includes("London") || addr.includes("United Kingdom")) {
                newInvestor.geography = "UK";
                newInvestor.source_geography = "Europe";
            }

            investors.push(newInvestor);
            addedCount++;
        }
        console.log(`Added ${addedCount} records from US UAE EU VC List.`);
    } else {
        console.warn(`File not found: ${usUaeEuFile}`);
    }

    // 2. Process UAE-Middle East Angel Investors List.csv
    const uaeMeFile = path.join(RESOURCES_DIR, 'UAE-Middle East Angel Investors List.csv');
    if (fs.existsSync(uaeMeFile)) {
        console.log(`Processing ${uaeMeFile}...`);
        const fileContent = fs.readFileSync(uaeMeFile, 'utf8');
        const records = parseCSV(fileContent);
        let addedCount = 0;

        for (const record of records) {
            const company = clean(record['Company']);
            const personName = clean(record['Name']);

            const mainName = company || personName;

            if (!mainName) continue;

            // Check for duplicates
            const exists = investors.some(inv => {
                if (inv.name && inv.name.toLowerCase() === mainName.toLowerCase()) return true;
                if (personName && inv.name && inv.name.toLowerCase() === personName.toLowerCase()) return true;
                return false;
            });

            if (exists) continue;

            const newInvestor = {
                name: mainName,
                title: clean(record['Position']),
                "personal linkedin url": clean(record['LinkedIn']),
                source: 'uae_middle_east',
                source_geography: 'Middle East',
                geography: 'Middle East'
            };

            if (personName) {
                const parts = personName.split(' ');
                if (parts.length > 0) newInvestor["first name"] = parts[0];
                if (parts.length > 1) newInvestor["last name"] = parts.slice(1).join(' ');
                if (!company) {
                    newInvestor.name = personName;
                } else {
                    newInvestor.contact_person = personName;
                }
            }

            investors.push(newInvestor);
            addedCount++;
        }
        console.log(`Added ${addedCount} records from UAE-Middle East Angel Investors List.`);
    } else {
        console.warn(`File not found: ${uaeMeFile}`);
    }

    console.log(`Total investor count after merge: ${investors.length}`);

    // Write back to file
    fs.writeFileSync(INVESTORS_FILE, JSON.stringify(investors, null, 2), 'utf8');
    console.log(`Successfully updated ${INVESTORS_FILE}`);
}


try {
    mergeInvestors();
} catch (error) {
    fs.writeFileSync(path.join(__dirname, '../error.log'), 'Global error: ' + error.stack);
}
