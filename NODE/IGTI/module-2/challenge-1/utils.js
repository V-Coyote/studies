import { promises as fs } from 'fs';

async function readFile(nameFile) {
  try {
    const data = JSON.parse(await fs.readFile(nameFile, 'utf-8'));

    return data;
  } catch (err) {
    console.log(err);
  }
}

async function writeFile(fileName, obj) {
  try {
    await fs.writeFile(`./city/${fileName}.json`, JSON.stringify(obj));
  } catch (err) {
    console.log(err);
  }
}

async function amountOfCities(state) {
  try {
    return readFile(`./city/${state}.json`);
  } catch (err) {
    console.log(err);
  }
}

async function newFileState() {
  try {
    const statesList = await readFile(
      './cidades-estados-brasil-json/Estados.json'
    );
    const citiesList = await readFile(
      './cidades-estados-brasil-json/Cidades.json'
    );

    let obj = {};

    statesList.map((state) => {
      obj = {
        state,
        cities: [],
      };

      citiesList.filter((city) => {
        state.ID === city.Estado ? obj.cities.push(city) : '';
      });

      writeFile(state.Sigla, obj);
    });

    console.log(obj);
  } catch (err) {
    console.log(err);
  }
}

// newFileState();

export default { readFile, writeFile, amountOfCities };
