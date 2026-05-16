const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

let rootCss = '';
let componentCss = '';
let remainingCss = '';

// We will extract the full <style> block(s)
let allStyles = '';
$('style').each(function() {
  allStyles += $(this).html() + '\n';
});

// Remove all style tags
$('style').remove();

// Now we want to split allStyles into design-tokens.css and components.css
// Finding the :root block
const rootMatch = allStyles.match(/:root\s*\{[\s\S]*?\}/);
if (rootMatch) {
  rootCss = rootMatch[0] + '\n\n/* Global Resets */\n* {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n}\n\nbody {\n  font-family: \'Inter\', -apple-system, BlinkMacSystemFont, sans-serif;\n  background: var(--bg);\n  color: var(--text);\n  font-size: 13px;\n  line-height: 1.5;\n}';
  allStyles = allStyles.replace(rootMatch[0], '');
  // Also remove the global reset from allStyles to avoid duplication
  allStyles = allStyles.replace(/\*\s*\{[\s\S]*?\}/, '');
  allStyles = allStyles.replace(/body\s*\{[\s\S]*?\}/, '');
}

// Write the files
fs.writeFileSync('design-tokens.css', rootCss);
// For safety, put the rest in components.css
fs.writeFileSync('components.css', allStyles);

// Add links to head
$('head').append('<link rel="stylesheet" href="design-tokens.css">\n');
$('head').append('<link rel="stylesheet" href="components.css">\n');

fs.writeFileSync('index.html', $.html());

console.log('Successfully extracted CSS to design-tokens.css and components.css');
