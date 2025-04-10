// build-blog-index.js
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Cartella contenente i post in formato markdown
const POSTS_DIR = path.join(__dirname, 'content/blog');
// File di output
const OUTPUT_FILE = path.join(__dirname, 'content/blog/index.json');

// Assicurati che la directory esista
if (!fs.existsSync(path.dirname(OUTPUT_FILE))) {
  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
}

// Leggi tutti i file markdown nella directory
const postFiles = fs.readdirSync(POSTS_DIR).filter(file => file.endsWith('.md'));

// Estrai i metadati da ogni file
const posts = postFiles.map(filename => {
  const filePath = path.join(POSTS_DIR, filename);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  
  // Usa gray-matter per estrarre i metadati dal frontmatter
  const { data } = matter(fileContent);
  
  // Estrai lo slug dal nome del file
  const slug = filename.replace(/\.md$/, '');
  
  return {
    ...data,
    slug
  };
});

// Ordina i post per data (dal più recente)
posts.sort((a, b) => new Date(b.date) - new Date(a.date));

// Scrivi il JSON nel file di output
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(posts, null, 2));

console.log(`Generato file index con ${posts.length} post`);