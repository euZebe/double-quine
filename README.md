# Double-quine !

## What
This is a progressive web application enabling to follow numbers picked during "quine" games. It displays picked numbers both as a table and a list, and measures elapsed time till the game ends.

It works offline.

It can be added to android desktop, which makes it look like a beautiful installed app (landscape display, fullscreen...).

## How
Done with 
- React + typescript + mobx
- progressive web app (thanks create-react-app)

### tips
- to deploy on gh-pages, set homepage to package.json
- to make the app a PWA with offline mode, replace `serviceWorker.unregister();` by `serviceWorker.register();` in index.tsx
- to make give a PWA the ability to read/write data, use indexedDB
