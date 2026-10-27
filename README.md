# World Detective

A daily geography puzzle for the browser. Five places, four clues each, played in English or Chinese. Progress stays in `localStorage`. There is no account or server in this version.

```bash
npm install
npm run dev
npm test
npm run build
```

The daily set is a deterministic shuffle of the local question bank, seeded by the UTC date and the bank version. The same date always produces the same five puzzles.

Practice rounds are stored separately and do not replace the day's official score.
