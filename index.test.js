const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');


let document;

beforeAll(() => {
  const html = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf8');
  const dom = new JSDOM(html);
  document = dom.window.document;
});

test('renders page title', () => {
  const title = document.querySelector('title');
  expect(title.textContent).toBe('Mimi Nguyen');
});

test('renders intro heading', () => {
  const h1 = document.querySelector('#intro h1');
  expect(h1.textContent).toBe('Mimi Nguyen');
});

test('renders typed-text span and cursor', () => {
  expect(document.querySelector('.typed-text')).toBeTruthy();
  expect(document.querySelector('.cursor')).toBeTruthy();
});

test('renders navigation links', () => {
  const navLinks = Array.from(document.querySelectorAll('nav a')).map(a => a.textContent.trim());
  expect(navLinks).toEqual(expect.arrayContaining([
    'About',
    'Projects',
    'Resume',
    'Contact',
    'GitHub',
    'LinkedIn'
  ]));
});

test('renders footer text', () => {
  const footerText = document.querySelector('footer p').textContent.trim();
  expect(footerText).toBe('@2024 Mimi Nguyen');
});

// Language icons
test('renders Python icon', () => {
  const element = document.querySelector('img[alt="Python"]');
  expect(element).toBeTruthy();
});

test('renders SQL icon', () => {
  const element = document.querySelector('img[alt="SQL"]');
  expect(element).toBeTruthy();
});

test('renders JavaScript icon', () => {
  const element = document.querySelector('img[alt="JavaScript"]');
  expect(element).toBeTruthy();
});

test('renders C++ icon', () => {
  const element = document.querySelector('img[alt="C++"]');
  expect(element).toBeTruthy();
});

test('renders HTML icon', () => {
  const element = document.querySelector('img[alt="HTML"]');
  expect(element).toBeTruthy();
});

test('renders CSS icon', () => {
  const element = document.querySelector('img[alt="CSS"]');
  expect(element).toBeTruthy();
});
