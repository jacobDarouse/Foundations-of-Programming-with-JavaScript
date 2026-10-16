# Foundations of Programming with JavaScript

An interactive JavaScript textbook for high school, adapted from
[Foundations of Python Programming](https://runestone.academy/ns/books/published/fopp/index.html).
It teaches programming fundamentals that carry over to any language.

The book is written in [PreTeXt](https://pretextbook.org) and published with GitHub Pages:
https://jacobdarouse.github.io/foundations-of-programming-with-javascript/

This book is not made, approved, or endorsed by Operation Spark.
It was written with help from AI and may contain mistakes.

## Building the book

```
pip install -r requirements.txt
pretext build web
pretext view web
```

Every push to `main` builds the book and publishes it to GitHub Pages.
Pull requests build the book to check for errors but do not publish it.

## Layout

- `source/` the book itself. `main.ptx` lists the units and chapters.
- `source/front/`, `source/back/` front and back matter, including the original book's sections and the license.
- `assets/js/book.js` shows `console.log` output under code boxes and saves students' code in their browser.
- `assets/css/book.css` small style fixes.
- `publication/publication.ptx` how the web version looks and behaves.

## License

Copyright (C) 2026 Jacob Darouse, for the changes made in this version.
Copyright (C) Brad Miller, Paul Resnick, Lauren Murphy, Jeffrey Elkner, Peter Wentworth,
Allen B. Downey, Chris Meyers, and Dario Mitchell.

Permission is granted to copy, distribute and/or modify this document under the terms of
the GNU Free Documentation License, Version 1.3 or any later version published by the
Free Software Foundation; with Invariant Sections being Forward, Prefaces, and Contributor
List, no Front-Cover Texts, and no Back-Cover Texts. A copy of the license is in
[LICENSE](LICENSE) and in the book's appendix.
