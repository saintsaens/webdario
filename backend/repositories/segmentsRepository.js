import { minioClient } from "../db/index.js";

const bucket = process.env.MINIO_SEGMENTS_BUCKET;

export const uploadSegment = async (segmentStream, segmentName) => {
    const objectName = `${process.env.MINIO_LOFI_SEGMENTS_PATH}/${segmentName}`;
    try {
        await minioClient.putObject(bucket, objectName, segmentStream);
        return objectName;
    } catch (error) {
        throw new Error(`Failed to upload segment: ${error.message}`);
    }
};
