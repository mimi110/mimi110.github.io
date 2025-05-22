const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

let document;

beforeAll(() => {
  const html = fs.readFileSync(path.resolve(__dirname, 'project.html'), 'utf8');
  const dom = new JSDOM(html);
  document = dom.window.document;
});

test("renders page title as Mimi's Portfolio", () => {
  const title = document.querySelector('title');
  expect(title.textContent).toBe("Mimi's Portfolio");
});

test('renders Projects section heading', () => {
  const heading = document.querySelector('#project h1');
  expect(heading.textContent).toBe('Projects');
});

test('renders all project images', () => {
  const images = Array.from(document.querySelectorAll('.project img')).map(img => img.getAttribute('alt'));
  expect(images.length).toBeGreaterThanOrEqual(3);
});

test('renders all project titles', () => {
  const titles = Array.from(document.querySelectorAll('.project-details summary h2')).map(h2 => h2.textContent.trim());
  expect(titles).toEqual(expect.arrayContaining([
    'Data Automation',
    'Discord Music Bot',
    'Randomizer Website'
  ]));
});

test('renders all demo links', () => {
  const demoLinks = Array.from(document.querySelectorAll('nav a')).filter(link => link.textContent.includes('Demo'));
  expect(demoLinks.length).toBeGreaterThanOrEqual(3);
});

test('renders footer text', () => {
  const footerText = document.querySelector('footer p').textContent.trim();
  expect(footerText).toBe('@2024 Mimi Nguyen');
});
