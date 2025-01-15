import * as segmentsService from "../services/segmentsService.js";
import fs from "fs";

export const getSegment = async (req, res) => {
    try {
        const { segmentName } = req.params;
        if (!segmentName) {
            return res.status(400).send('Segment name is required');
        }

        const segmentStream = await segmentsService.getSegmentStream(segmentName)

        res.setHeader('Content-Type', 'audio/mp4');  // For .m4s and .mp4 segments

        segmentStream.pipe(res);
        segmentStream.on('error', (err) => {
            console.error('Error streaming file:', err.message);
            res.status(500).send('Error streaming segment file');
        });

    } catch (error) {
        console.error('Error retrieving segment:', error.message);
        res.status(500).send('Error retrieving segment');
    }
};