import dotenv from 'dotenv';
import ftp from "basic-ftp";
import fs from "node:fs";
// @ts-ignore
import yaml from "js-yaml";

dotenv.config();

const ftpConfig = {
    host: process.env.FTP_HOST,
    port: 21,
    user: process.env.FTP_USER,
    password: process.env.FTP_PASSWORD,
};

const updateRegions = async () => {
    const client = new ftp.Client();
    client.ftp.verbose = true;

    try {
        await client.access(ftpConfig);
        console.log("Connected to FTP server");

        const remoteFilePath = "/plugins/WorldGuard/worlds/DIM100/regions.yml";
        const localFilePath = "./data/regions.yml";
        const jsonFilePath = "./data/regions.json";

        await client.downloadTo(localFilePath, remoteFilePath);

        const fileContents = fs.readFileSync(localFilePath, 'utf8');
        const jsonData = yaml.load(fileContents);
        fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2));
        fs.unlinkSync(localFilePath);

    } catch (err) {
        console.error( err);
    } finally {
        client.close();
    }
};

updateRegions().catch(console.error);
