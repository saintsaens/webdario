import { describe, it } from "vitest";
import { extractMediaPresentationDuration } from "../../services/mpdService.js";
import fs from "fs";

vi.mock("fs");

describe('extractMediaPresentationDuration', () => {
    it('should return the media presentation duration from an MPD file', async () => {
        const mpdContent = `<?xml version="1.0" encoding="utf-8"?>
        <MPD xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            mediaPresentationDuration="PT2M12.8S">
            <ProgramInformation>
                <Title>Our Hideaway</Title>
            </ProgramInformation>
            <ServiceDescription id="0">
            </ServiceDescription>
            <Period id="0" start="PT0.0S">
                <AdaptationSet id="0" contentType="audio" startWithSAP="1" segmentAlignment="true" bitstreamSwitching="true">
                    <Representation id="0" mimeType="audio/mp4" codecs="mp4a.40.2" bandwidth="128000" audioSamplingRate="44100">
                        <AudioChannelConfiguration schemeIdUri="urn:mpeg:dash:23003:3:audio_channel_configuration:2011" value="2" />
                        <SegmentTemplate timescale="1000000" duration="5000000" initialization="track3_init.mp4" media="track3_$Number$.m4s" startNumber="1">
                        </SegmentTemplate>
                    </Representation>
                </AdaptationSet>
            </Period>
        </MPD>`
        fs.readFileSync.mockReturnValue(mpdContent);
        const mpdPath = 'test.mpd';
        
        const duration = await extractMediaPresentationDuration(mpdPath);
        
        expect(duration).toBe('PT2M12.8S');
    });
});
