const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'frontend/src');

function walk(dir) {
    fs.readdirSync(dir).forEach(file => {
        let fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walk(fullPath);
        } else if (fullPath.endsWith('.scss') || fullPath.endsWith('.tsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let updated = content
                .replace(/rgba\(14, 165, 233/g, 'rgba(225, 29, 72') // Cyan to Crimson
                .replace(/rgba\(124, 58, 237/g, 'rgba(225, 29, 72') // Purple to Crimson
                .replace(/#0ea5e9/g, '#e11d48') // Cyan to Crimson hex
                .replace(/#38bdf8/g, '#f43f5e')
                .replace(/#7dd3fc/g, '#fb7185')
                .replace(/#8438f4/g, '#e11d48') // Purple to Crimson hex
                .replace(/#7c3aed/g, '#be123c')
                .replace(/#4c1d95/g, '#881337');
            fs.writeFileSync(fullPath, updated);
        }
    });
}
walk(dir);
