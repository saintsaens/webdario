import { getBucketByChannel, minioClient } from "../db/index.js";
import { Readable } from 'stream';

export const createPlaylist = async (name, content, channel) => {
    const bucket = getBucketByChannel(channel);
    if (!bucket) {
        throw new Error(`Invalid channel: ${channel}`);
    }
    const stream = Readable.from(content);
    await minioClient.putObject(bucket, name, stream);
    return name;
};

export const getPlaylist = async (name, channel) => {
    const bucket = getBucketByChannel(channel);
    if (!bucket) {
        throw new Error(`Invalid channel: ${channel}`);
    }

    const stream = await minioClient.getObject(bucket, name);
    return new Promise((resolve, reject) => {
        let data = '';
        stream.on('data', (chunk) => {
            data += chunk.toString();
        });
        stream.on('end', () => {
            resolve(data);
        });
        stream.on('error', (err) => {
            reject(err);
        });
    });
};
