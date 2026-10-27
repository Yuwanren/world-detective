# World Detective

A daily geography puzzle for the browser. Five places, four clues each, played in English or Chinese. Progress stays in `localStorage`. There is no account or server in this version.

```bash
npm install
npm run dev
npm test
npm run build
```

The daily set is a deterministic shuffle of the local question bank, seeded by the calendar date in the browser's timezone and the bank version. A page opened in China changes at midnight Beijing time; another country changes at midnight there. The same local date and bank version always produce the same five puzzles.

Practice rounds are stored separately and do not replace the day's official score.
