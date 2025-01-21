import * as segmentsRepository from "../repositories/segmentsRepository.js"
import fs from "fs";
import path from "path";

export const uploadSegment = async (segmentPath) => {
    if (!fs.existsSync(segmentPath)) {
        throw new Error(`File not found at path: ${segmentPath}`);
    }

    const segmentStream = fs.createReadStream(segmentPath);
    const segmentName = path.basename(segmentPath);

    const uploadedSegmentName = await segmentsRepository.uploadSegment(segmentStream, segmentName);

    return uploadedSegmentName;
};

export const getSegmentStream = async (channelName, segmentName) => {
    const segmentStream = await segmentsRepository.getSegment(channelName, segmentName);
    return segmentStream;
};
