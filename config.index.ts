import { writeFile } from 'fs';

const targetPath = './src/environments/environment.prod.ts';

const envConfigFile = `export const environment = {
  cognito: {
    userPoolId: '${process.env["UPID"]}',
    userPoolWebClientId: '${process.env["UPWID"]}',
    region: '${process.env["CR"]}',
  },
  sdk: {
    accessKey: '${process.env["SDKAK"]}',
    accessSecret: '${process.env["SDKAS"]}'
  }
};
`;

writeFile(targetPath, envConfigFile, 'utf8', (err) => {
  if (err) {
    return console.log(err);
  }
});
