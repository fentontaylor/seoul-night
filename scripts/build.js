'use strict';

const fs = require('fs-extra');
const path = require('path');
const mustache = require('mustache');

const globals = require('../src/globals.json');
const template = JSON.stringify(require(`../src/template.json`));
const themes = ['seoul-night'];

const dir = path.resolve(__dirname, '../themes');

if (fs.existsSync(dir)) {
  fs.emptyDirSync(dir);
} else {
  fs.ensureDirSync(dir);
}

for (const theme of themes) {
  const content = require(`../src/${theme}.json`);
  const out = mustache.render(template, { ...content, ...globals });

  fs.writeFileSync(path.join(dir, `${theme}-color-theme.json`), out);
}