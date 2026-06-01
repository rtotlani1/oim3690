# Week 2 Log

Week: 05/25 - 06/01


## What I worked on

Built hello.html and aboutme.html this week.


## What I learned

Learned about the HTML skeleton, how to read HTML nicely so we don't blindly follow AI.
Learned and understood semantic tags like <nav>, which have a different purpose for every tag rather than generic tags for everything like <div>
- 

## AI interactions

<!--
One block per interaction. Add more as needed.
-->

### Interaction 1

- **What I asked**: 
take my hello.html and add a navigation bar, a section with a list of my interests, and a footer. Use different HTML tags I haven't seen before
- **What AI gave me**:
Two things I'm noticing from this screenshot:

The file is called hello.html, not index.html — that's why the URL isn't updating. GitHub Pages serves index.html by default. If there's no index.html at the root, it won't know what to show.
This looks like it's open in VS Code, not on github.com — so I can't tell yet if the push went through.

But let's solve both at once. Here's your hello.html expanded with new tags — and once this is working, you'll want to either rename it to index.html or create a separate index.html that links to it.
New tags you'll see for the first time: <nav>, <ul> / <li>, <footer>, <section>, <hr>, <strong>, <em>, <abbr>Created a file, read a fileCreated a file, read a fileNew tags introduced and what they do:

<nav> — marks a navigation section, links jump to page anchors (#about, #interests)
<section> — groups related content, the id is what the nav links point to
<hr> — horizontal rule, just a visual divider line
<ul> / <li> — unordered list and its items
<strong> — bold, signals importance
<em> — italic, signals emphasis
<abbr> — abbreviation, hover over "Babson" in the browser and you'll see the full tooltip
<footer> — semantic tag for the bottom of the page

No CSS yet — that's intentional since the course hasn't hit CSS. Replace your current hello.html with this, commit, and push. And separately, make sure your index.html exists at the root so your GitHub Pages URL actually loads something.HelloCode · HTML Open in Google ChromeYou said: give me the codegive me the codeMay 27Claude responded: Here's the full code — copy and paste this directly into your hello.Here's the full code — copy and paste this directly into your hello.html:
html<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Hello</title>
  </head>
  <body>

    <nav>
      <a href="#about">About</a> |
      <a href="#interests">Interests</a> |
      <a href="#footer">Contact</a>
    </nav>

    <hr>

    <section id="about">
      <h1>Hello, my name is Rasesh Totlani</h1>
      <p>This is my first hand-written HTML page.</p>
      <p>
        I am a student at
        <abbr title="Babson College">Babson</abbr>
        studying <em>AI-Powered Web Development</em>.
      </p>
      <img src="images/photo.jpg" alt="A test image">
    </section>

    <hr>

    <section id="interests">
      <h2>My Interests</h2>
      <ul>
        <li>🏗️ <strong>Real Estate Development</strong> — my family's business</li>
        <li>🤖 <strong>Artificial Intelligence</strong> — especially how it changes the way we work</li>
        <li>🏏 <strong>Cricket</strong> — Delhi Capitals fan</li>
        <li>📊 <strong>Business Strategy</strong> — brand, finance, operations</li>
      </ul>
    </section>

    <hr>

    <footer id="footer">
      <p>Rasesh Totlani &mdash; Babson College &mdash; OIM3690, Summer 2026</p>
    </footer>

 
- **What I kept / changed / rejected**:

### Interaction 2

- **What I asked**: 
I want you to create for me, an about-me.html, with the semantic structure : <header>, <main>, <footer> with proper heading hierarchy and no skipping. One local image and one URL, both with descriptive alt. atleast one link, one list and a paragraph
- **What AI gave me**: 
Here's about-me.html. Here's what's in it and why:
Semantic structure

<header> — your name, tagline, and nav
<main> — all the actual content
<footer> — credit line at the bottom

Heading hierarchy (no skips)

<h1> → your name in the header
<h2> → each major section (Who I Am, Where I'm From, etc.)
<h3> → subsections within those (Cricket, Other Courses, Interests)

Images

Local: images/delhi.jpg — you'll need to add a photo of Delhi to your images/ folder with that filename
URL: Babson campus photo pulled directly from Wikipedia, no download needed

Everything else

Two <ul> lists, multiple <p> paragraphs, one <a> link to the course syllabus

One thing to do on your end — add a delhi.jpg to your images/ folder, same place your photo.jpg lives. Otherwise that image just won't show.
- **What I kept / changed / rejected**:

### Interaction 3

- **What I asked**: 
how do I upload the delhi.jpg
- **What AI gave me**: 
Since your images/ folder already exists in your repo (that's where photo.jpg lives), here's how to add delhi.jpg to it:
In VS Code (easiest):

Find the images/ folder in the left sidebar
Drag and drop your Delhi photo directly into it
Rename it to delhi.jpg if it isn't already
Then commit and push like normal in GitHub Desktop

In GitHub Desktop:

Just drag the file into your repo folder in Finder/Explorer
Put it inside the images/ folder
GitHub Desktop will automatically detect the new file
Commit and push

One thing to check — whatever photo you use, make sure the filename is exactly delhi.jpg (all lowercase). If it's Delhi.jpg or delhi.JPG it won't match the src in the HTML and the image won't load.
- **What I kept / changed / rejected**:



## Questions

<!--
Things you're confused about, want to explore, or want help with.
As many as you have.
-->

- 