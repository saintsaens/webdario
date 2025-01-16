import fs from 'fs';
import xml2js from 'xml2js';
import * as trackEncodingService from './trackEncodingService.js';
import * as mpdRepository from "../repositories/mpdRepository.js"
import { encodeTracks } from "./trackEncodingService.js";

export const extractMediaPresentationDuration = async (mpdPath) => {
    const data = fs.readFileSync(mpdPath, 'utf8');
    const result = await xml2js.parseStringPromise(data);
    const duration = result.MPD.$['mediaPresentationDuration'];
    return duration;
}

export const extractTimescale = async (mpdPath) => {
    const data = fs.readFileSync(mpdPath, 'utf8');
    const options = {
        explicitArray: false,
        mergeAttrs: true,
        xmlns: true,
    };
    const result = await xml2js.parseStringPromise(data, options);
    const timescale = result.MPD?.Period?.AdaptationSet?.Representation?.SegmentTemplate?.timescale?.value;
    if (!timescale) {
        throw new Error(`SegmentTemplate attribute "timescale" not found in the provided MPD file.`);
    }
    return timescale;
};

export const extractSegmentTemplateDuration = async (mpdPath) => {
    const data = fs.readFileSync(mpdPath, 'utf8');
    const options = {
      explicitArray: false,
      mergeAttrs: true,
      xmlns: true,
    };
    const result = await xml2js.parseStringPromise(data, options);
    const duration = result.MPD?.Period?.AdaptationSet?.Representation?.SegmentTemplate?.duration?.value;
    if (!duration) {
      throw new Error(`SegmentTemplate attribute "duration" not found in the provided MPD file.`);
    }
    return duration;
  };

  export const extractAudioChannelConfiguration = async (mpdPath) => {
    const data = fs.readFileSync(mpdPath, 'utf8');
    const options = {
        explicitArray: false,  // Avoid wrapping tags in arrays if there's only one occurrence
        mergeAttrs: true,      // Merge attributes into the tag object
        xmlns: true,           // Enable namespace handling
    };
    const result = await xml2js.parseStringPromise(data, options);
    
    const audioChannelConfiguration = result['MPD']?.['Period']?.['AdaptationSet']?.['Representation']?.['AudioChannelConfiguration'];
    if (!audioChannelConfiguration) {
        throw new Error('AudioChannelConfiguration not found in the MPD.');
    }

    // Extract the values from the audioChannelConfiguration object
    const schemeIdUri = audioChannelConfiguration['schemeIdUri']?.value;
    const value = audioChannelConfiguration['value']?.value;

    if (!schemeIdUri || !value) {
        throw new Error('Required attributes (schemeIdUri, value) missing from AudioChannelConfiguration.');
    }

    // Return the correctly formatted tag
    return `<AudioChannelConfiguration schemeIdUri="${schemeIdUri}" value="${value}" />`;
};

export const createUnifiedMPD = async (playlist, channel) => {
    const singleMpdPaths = await encodeTracks(playlist, channel);

    const unifiedMPDPath = createUnifiedMpdPath(channel);
    const unifiedMPDHeader = createUnifiedMpdHeader();
    const unifiedMPDFooter = createUnifiedMpdFooter();
    const unifiedMPDPeriods = await createUnifiedMpdPeriods(playlist, singleMpdPaths);

    console.log(`Creating unified MPD…`);
    const unifiedMPD = [
        unifiedMPDHeader,
        unifiedMPDPeriods,
        unifiedMPDFooter
    ].join('\n');
    fs.writeFileSync(unifiedMPDPath, unifiedMPD);

    return unifiedMPDPath;
};

const createUnifiedMpdHeader = () => {
    const mpdHeader = `<?xml version="1.0" encoding="UTF-8"?>
    <MPD xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns="urn:mpeg:dash:schema:mpd:2011"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        xsi:schemaLocation="urn:mpeg:DASH:schema:MPD:2011 http://standards.iso.org/ittf/PubliclyAvailableStandards/MPEG-DASH_schema_files/DASH-MPD.xsd"
        profiles="urn:mpeg:dash:profile:isoff-live:2011"
        type="static">`;

    return mpdHeader;
};

const createUnifiedMpdFooter = () => {
    const mpdFooter = `</MPD>`;

    return mpdFooter;
}

const createUnifiedMpdPath = (channel) => {
    const mpdPath = `${process.env.PUBLIC_MPD_PATH}/${channel}.mpd`;

    return mpdPath;
};

const createUnifiedMpdPeriod = async (track, index, sourceMpd) => {
    const periodDuration = await extractMediaPresentationDuration(sourceMpd);
    const audioChannelConfiguration = await extractAudioChannelConfiguration(sourceMpd);
    const timescale = await extractTimescale(sourceMpd);
    const segmentTemplateDuration = await extractSegmentTemplateDuration(sourceMpd);
    const initSegmentRoute = createInitSegmentRoute(index);
    const mediaSegmentRoute = createMediaSegmentRoute(index);

    return `
      <Period id="track${index}" duration="${periodDuration}">
        <AdaptationSet id="track${index}" contentType="audio" startWithSAP="1" segmentAlignment="true" bitstreamSwitching="true">
          <Representation id="track${index}" mimeType="audio/mp4" codecs="mp4a.40.2" bandwidth="128000" audioSamplingRate="44100">
            ${audioChannelConfiguration}
            <SegmentTemplate timescale="${timescale}" duration="${segmentTemplateDuration}" initialization="${initSegmentRoute}" media="${mediaSegmentRoute}" startNumber="1">
            </SegmentTemplate>
          </Representation>
        </AdaptationSet>
      </Period>`;
};

const createUnifiedMpdPeriods = async (tracks, singleMpdPaths) => {
    const mpdPeriods = await Promise.all(
      tracks.map((track, index) =>
        createUnifiedMpdPeriod(track, index, singleMpdPaths[index])
      )
    );
  
    return mpdPeriods.join('\n');
  };

const createInitSegmentRoute = (trackIndex) => {
    return `${process.env.BACKEND_URL}/api/segment/track${trackIndex}_init.mp4`;
};

const createMediaSegmentRoute = (trackIndex) => {
    return `${process.env.BACKEND_URL}/api/segment/track${trackIndex}_$Number$.m4s`;
};

export const uploadMpd = async (mpdPath) => {
    if (!fs.existsSync(mpdPath)) {
        throw new Error(`File not found at path: ${mpdPath}`);
    }

    const mpdStream = fs.createReadStream(mpdPath);
    const mpdName = path.basename(mpdPath);

    const uploadedMpdName = await mpdRepository.uploadMpd(mpdStream, mpdName);

    return uploadedMpdName;
};

export const getMpdStream = async (mpdName) => {
    const mpdStream = await mpdRepository.getMpd(mpdName);
    return mpdStream;
};