import fs from 'fs';
import xml2js from 'xml2js';
import * as trackEncodingService from './trackEncodingService.js';

// Extract media presentation duration from MPD
export const extractMediaPresentationDuration = async (mpdPath) => {
    const data = fs.readFileSync(mpdPath, 'utf8');
    const result = await xml2js.parseStringPromise(data);
    return result.MPD.$['mediaPresentationDuration'];
}

export const generateMPD = (tracks, durations, outputMPDPath) => {
    const mpdHeader = `<?xml version="1.0" encoding="UTF-8"?>
    <MPD xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns="urn:mpeg:dash:schema:mpd:2011"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        xsi:schemaLocation="urn:mpeg:DASH:schema:MPD:2011 http://standards.iso.org/ittf/PubliclyAvailableStandards/MPEG-DASH_schema_files/DASH-MPD.xsd"
        profiles="urn:mpeg:dash:profile:isoff-live:2011"
        type="static">`;

    const periods = tracks.map((track, index) => `
    <Period id="track${index}" duration="${durations[index]}">
        <AdaptationSet id="track${index}" contentType="audio" startWithSAP="1" segmentAlignment="true" bitstreamSwitching="true">
            <Representation id="track${index}" mimeType="audio/mp4" codecs="mp4a.40.2" bandwidth="128000" audioSamplingRate="44100">
                <SegmentTemplate media="track${index}_$Number$.m4s" initialization="track${index}_init.mp4" duration="2" startNumber="1">
                </SegmentTemplate>
            </Representation>
        </AdaptationSet>
    </Period>`).join('\n');
    const mpdFooter = `</MPD>`;
    
    const unifiedMPD = `${mpdHeader}\n${periods}\n${mpdFooter}`;
    fs.writeFileSync(outputMPDPath, unifiedMPD);
}

export const generateUnifiedMPD = async (playlist, channel) => {
    const channelPath = `./public/${channel}`;

    const testTracks = [playlist[0], playlist[1]];  // Use the first two tracks for testing
    const mpdPaths = await trackEncodingService.encodeTracks(testTracks, channel);

    // Process each MPD (you can use the mpdPaths array for further processing)
    const duration1 = await extractMediaPresentationDuration(mpdPaths[0]);
    const duration2 = await extractMediaPresentationDuration(mpdPaths[1]);
    
    const testDurations = [duration1, duration2];
    const unifiedMPDPath = `${channelPath}/unified.mpd`;

    generateMPD(testTracks, testDurations, unifiedMPDPath);  // Generate the unified MPD

    return unifiedMPDPath;
};
