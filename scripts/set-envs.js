const {writeFileSync, mkdirSync} = require('fs');

require('dotenv').config();

const targetPath = './src/environments/environments.ts';



const envFileContent = `
export const environment = {
  mapbox_key: "${process.env['MAPBOX_KEY']}",
  OTRA: "propiedad"
}`;


mkdirSync("'./src/envirionments", {recursive:true});

writeFileSync(targetPath, envFileContent);
