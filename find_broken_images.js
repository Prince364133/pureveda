const fs = require('fs');
const path = require('path');

const projectRoot = 'c:\\Users\\saavi\\OneDrive\\Desktop\\Rahul bhaiya\\pureveda';
const imgDir = path.join(projectRoot, 'img');
const availableImages = new Set(fs.readdirSync(imgDir).map(f => f.toLowerCase()));

const htmlFiles = fs.readdirSync(projectRoot).filter(f => f.endsWith('.html'));

htmlFiles.forEach(file => {
    const content = fs.readFileSync(path.join(projectRoot, file), 'utf8');
    const matches = content.matchAll(/src=["']img\/([^"']+)["']/g);
    for (const match of matches) {
        const imgName = match[1].toLowerCase();
        if (!availableImages.has(imgName)) {
            console.log(`MISSING: ${file} Line: ${content.substring(0, match.index).split('\n').length} Image: ${imgName}`);
        }
    }
});
