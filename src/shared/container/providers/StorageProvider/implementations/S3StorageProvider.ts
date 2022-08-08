import { S3 } from 'aws-sdk';
import fs from 'fs';
import mime from 'mime';
import { resolve } from 'path';

import upload from '@config/upload';
import { IStorageProvider } from "../IStorageProvider";



class S3StorageProvider implements IStorageProvider {
    private client: S3;

    constructor() {
        this.client = new S3({
            region: process.env.AWS_BUCKET_REGION,
        })
    }

    async save(file: string, folder: string): Promise<string> {
        const originalName = resolve(upload.tmpFolder, file); //aqui so tenho o path

        const fileContent = await fs.promises.readFile(originalName); //aqui tenho o arquivo em si

        const ContentType = mime.getType(originalName); //pega o tipo de arquivo

        await this.client.putObject({
            Bucket: `${process.env.AWS_BUCKET}/${folder}`,
            Key: file,
            Body: fileContent,
            ContentType,
        }).promise();

        await fs.promises.unlink(originalName); //remover de dentro do tmp

        return file;
    }
    async delete(file: string, folder: string): Promise<void> {
        await this.client.deleteObject({
            Bucket: `${process.env.AWS_BUCKET}/${folder}`,
            Key: file,
        }).promise();
    }

}

export { S3StorageProvider }