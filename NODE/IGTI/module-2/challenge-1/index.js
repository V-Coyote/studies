// import { promises as fs } from 'fs';
import fs from 'fs';
import readline from 'readline';

import file from './utils.js';

//2. Receive UF, read the file.json and return how many cities have in your STATE
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

init();

async function init() {
  try {
    let type = '';

    type = await question();
    await amountOfCity(type);

    // type = await question();
    await cityPopulation();

    await cityLongestName();
  } catch (err) {
    console.log(err);
  }
}

async function question() {
  return new Promise((resolve, reject) => {
    rl.question('Digit: ', (answer) => {
      resolve(answer);
      rl.close();
    });
  });
}

function fileRead(nameFile) {
  return JSON.parse(
    fs.readFileSync(`./city/${nameFile.toUpperCase()}.json`, 'utf-8')
  );
}

function readFolder() {
  return new Promise((resolve, reject) => {
    try {
      let list = [];

      fs.readdir('./city', (err, files) => {
        // console.log(files);

        files.map((file) => {
          let { state, cities } = fileRead(file.toString().split('.')[0]);
          // console.log(`${state.Sigla} - ${cities.length}`);
          list.push(`${state.Sigla} - ${cities.length}`);
          resolve(list);
        });
      });
    } catch (reject) {
      console.log(reject);
    }
  });
}

async function amountOfCity(name) {
  // let data = JSON.parse(await fs.readFileSync(`./city/${name}.json`, 'utf-8'));
  let { state, cities } = await fileRead(name);
  console.log(`City: ${state.Sigla} \nCities: ${cities.length}`);
}

async function cityPopulation() {
  let cities = [];

  cities = await readFolder();

  /* cities.map((city) => {
    console.log(city.split(' ')[2]);
  }); */
  cities.sort((a, b) => parseInt(b.split(' ')[2]) - parseInt(a.split(' ')[2]));
  console.log('MOST POPULATED');
  for (let i = 0; i < 5; i++) {
    console.log(cities[i]);
  }

  cities.sort((a, b) => parseInt(a.split(' ')[2]) - parseInt(b.split(' ')[2]));
  console.log('LESS POPULATED');
  for (let i = 0; i < 5; i++) {
    console.log(cities[i]);
  }
}

//----------------------------------------------------------------
//5. THE LONGEST CITY NAME OF EVERY STATE
//6. THE SHORTEST CITY NAME OF EVERY STATE

function readFileCity() {
  return new Promise((resolve, reject) => {
    try {
      let list = {
        short: [],
        large: [],
      };

      fs.readdir('./city', (err, files) => {
        // console.log(files);

        files.map((file) => {
          let { state, cities } = fileRead(file.toString().split('.')[0]);

          let city1 = cityBigName(cities);
          let city2 = cityShortName(cities);

          // console.log('\nCITY');
          // console.log(city1);
          // console.log(city2);
          // console.log(`${state.Sigla} - ${city1.Nome}`);
          // console.log(`${state.Sigla} - ${city2.Nome}`);

          list.large.push(`${city1.Nome} - ${state.Sigla}`);
          list.short.push(`${city2.Nome} - ${state.Sigla}`);
          resolve(list);
        });
      });
    } catch (reject) {
      console.log(reject);
    }
  });
}

function cityBigName(cities) {
  //alphabetical order
  cities.sort(function (a, b) {
    return a.Nome.localeCompare(b.Nome);
  });

  //order by length
  cities.sort(function (a, b) {
    return b.Nome.length - a.Nome.length;
  });

  return cities[0];
}

function cityShortName(cities) {
  //alphabetical order
  cities.sort(function (a, b) {
    return a.Nome.localeCompare(b.Nome);
  });

  //order by length
  cities.sort(function (a, b) {
    return a.Nome.length - b.Nome.length;
  });

  return cities[0];
}

async function cityLongestName() {
  let cities = [];
  cities = await readFileCity();

  console.log('KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKkk');
  // console.log(cities);

  // cities.large.sort((a, b) => b.split('-')[1].length - a.split('-')[1].length);
  console.log(cities.large);
  console.log(cities.short);

  cities.large.sort((a, b) => {
    let bLength = b.split(' ').length;
    let aLength = a.split(' ').length;

    let bName = b.split(' ', bLength - 2).join('');
    let aName = a.split(' ', bLength - 2).join('');

    // return b.split(' ', bLength - 2).length - a.split(' ', aLength - 2).length;
    // return bName - aName === -1 ? b : a;
    return (
      b.split(' ', bLength - 2).join('').length -
      a.split(' ', aLength - 2).join('').length
    );
  });

  /* cities.large.sort((a, b) => {
    return a.split('').length - b.split('').length === 0
      ? a.localeCompare(b)
      : '';
  }); */

  cities.short.sort((a, b) => {
    let bLength = b.split(' ').length;
    let aLength = a.split(' ').length;

    let bName = b.split(' ', bLength - 2).join('');
    let aName = a.split(' ', bLength - 2).join('');

    // return b.split(' ', bLength - 2).length - a.split(' ', aLength - 2).length;
    // return bName - aName === -1 ? b : a;
    return (
      a.split(' ', aLength - 2).join('').length -
      b.split(' ', bLength - 2).join('').length
    );
  });

  cities.short.sort((a, b) => {
    return a.length - b.length === 0 ? a.localeCompare(b) : '';
  });

  /*  cities.short.sort((a, b) => {
    return a.split('-')[1].length - b.split('-')[1].length;
  }); */
  // console.log(cities.large.slice(-2)[0].split('-')[1]);
  console.log(
    cities.large[0].split(' ', cities.large[0].split(' ').length - 2).join('')
      .length
  );
  console.log(cities.large);
  console.log(cities.short);
  /* cities.sort((a, b) => {
    a.split('-')[1].length - b.split('-')[1].length === 0
      ? a.split('-')[1].localeCompare(b.split('-')[1])
      : a.split('-')[1].length - b.split('-')[1].length;
  }); */

  // cities.sort((a, b) => a.split('-')[1].localeCompare(b.split('-')[1]));
  // console.log(cities[0].split('-')[1]);
}
