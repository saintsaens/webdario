import fs from 'fs';
import xml2js from 'xml2js';
import * as trackEncodingService from './trackEncodingService.js';
import { encodeTracks } from "./trackEncodingService.js";

export const extractDurationFromSingleTrackMpd = async (mpdPath) => {
    const data = fs.readFileSync(mpdPath, 'utf8');
    const result = await xml2js.parseStringPromise(data);
    const duration = result.MPD.$['mediaPresentationDuration'];
    return duration;
}

export const createUnifiedMPD = async (playlist, channel) => {
    const singleMPDPaths = await encodeTracks(playlist, channel);
    const durations = await Promise.all(
        singleMPDPaths.map((mpdPath) => extractDurationFromSingleTrackMpd(mpdPath))
    );

    const unifiedMPDPath = createUnifiedMPDPath(channel);
    const unifiedMPDHeader = createUnifiedMPDHeader();
    const unifiedMPDFooter = createUnifiedMPDFooter();
    const unifiedMPDPeriods = createUnifiedMPDPeriods(playlist, durations);

    console.log(`Creating unified MPD…`);
    const unifiedMPD = [
        unifiedMPDHeader,
        unifiedMPDPeriods,
        unifiedMPDFooter
    ].join('\n');
    fs.writeFileSync(unifiedMPDPath, unifiedMPD);

    return unifiedMPDPath;
};

const createUnifiedMPDHeader = () => {
    const mpdHeader = `<?xml version="1.0" encoding="UTF-8"?>
    <MPD xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns="urn:mpeg:dash:schema:mpd:2011"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        xsi:schemaLocation="urn:mpeg:DASH:schema:MPD:2011 http://standards.iso.org/ittf/PubliclyAvailableStandards/MPEG-DASH_schema_files/DASH-MPD.xsd"
        profiles="urn:mpeg:dash:profile:isoff-live:2011"
        type="static">`;

    return mpdHeader;
};

const createUnifiedMPDFooter = () => {
    const mpdFooter = `</MPD>`;

    return mpdFooter;
}

const createUnifiedMPDPath = (channel) => {
    const mpdPath = `${process.env.PUBLIC_MPD_PATH}/${channel}.mpd`;

    return mpdPath;
};

const createUnifiedMPDPeriods = (tracks, durations) => {
    const mpdPeriods = tracks.map((track, index) => {
        const initializationSegmentRoute = createInitializationSegmentRoute(index);
        const mediaSegmentRoute = createMediaSegmentRoute(index);
        
        const period = `
            <Period id="track${index}" duration="${durations[index]}">
                <AdaptationSet id="track${index}" contentType="audio" startWithSAP="1" segmentAlignment="true" bitstreamSwitching="true">
                    <Representation id="track${index}" mimeType="audio/mp4" codecs="mp4a.40.2" bandwidth="128000" audioSamplingRate="44100">
                        <SegmentTemplate initialization="${initializationSegmentRoute}" media="${mediaSegmentRoute}" duration="2" startNumber="1">
                        </SegmentTemplate>
                    </Representation>
                </AdaptationSet>
            </Period>`;
        
        return period;
    }).join('\n');  // Join the periods array with line breaks

    return mpdPeriods;
};

const createInitializationSegmentRoute = (trackIndex) => {
    return `http://localhost:3001/api/segment/track${trackIndex}_init.mp4`;
};

const createMediaSegmentRoute = (trackIndex) => {
    return `http://localhost:3001/api/segment/track${trackIndex}_$Number$.m4s`;
};
