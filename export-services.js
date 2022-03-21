const { resolve } = require('path');
const { readdirSync, readFileSync } = require('fs');

/**
 * This exports the available AWS services (Icon SVGs, hints and name) into a single JSON file.
 * It references the assets zip that can be downloaded from https://aws.amazon.com/architecture/icons/.
 */

function* getServices(dir) {
  for (const dirent of readdirSync(dir, { withFileTypes: true })) {
    const res = resolve(dir, dirent.name);

    if (dirent.isDirectory()) {
      yield* getServices(res);
      continue;
    }

    if (res.includes('Light') || res.includes('Dark')) continue;

    const [, category, name] =
      res.match(/Arch_(.+)\/.+\/Arch_(.+)_64\.svg/) || [];

    if (!category || !name) continue;

    const icon = readFileSync(res).toString();

    yield {
      category: category.replace(/-/g, ' '),
      name: name.replace(/-/g, ' '),
      icon: icon
        .replace(/<\?xml.+/, '')
        .replace(/<title>(.+)<\/title>\n/, '')
        .trim(),
    };
  }
}

const assets = process.argv[2];

console.log(JSON.stringify([...getServices(assets)]));
