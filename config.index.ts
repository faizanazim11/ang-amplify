import { writeFile } from 'fs';

const targetPath = './src/environments/environment.prod.ts';

const envConfigFile = `export const environment = {
  cognito: {
    userPoolId: '${process.env["COGNITO_USER_POOL_ID"]}',
    userPoolWebClientId: '${process.env["COGNITO_USER_POOL_WEB_CLIENT_ID"]}',
    region: '${process.env["COGNITO_REGION"]}',
  },
  sdk: {
    accessKey: '${process.env["SDK_ACCESS_KEY"]}',
    accessSecret: '${process.env["SDK_ACCESS_SECRET"]}'
  }
};
`;

writeFile(targetPath, envConfigFile, 'utf8', (err) => {
  if (err) {
    return console.log(err);
  }
});
