import { describe, it } from "vitest";
import { extractAudioChannelConfiguration, extractMediaPresentationDuration, extractSegmentTemplateDuration, extractTimescale } from "../../services/mpdService.js";
import fs from "fs";

vi.mock("fs");
const mpdContentSingleAdaptationSet = `<?xml version="1.0" encoding="utf-8"?>
<MPD xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xmlns="urn:mpeg:dash:schema:mpd:2011"
	xmlns:xlink="http://www.w3.org/1999/xlink"
	xsi:schemaLocation="urn:mpeg:DASH:schema:MPD:2011 http://standards.iso.org/ittf/PubliclyAvailableStandards/MPEG-DASH_schema_files/DASH-MPD.xsd"
	profiles="urn:mpeg:dash:profile:isoff-live:2011"
	type="static"
	mediaPresentationDuration="PT2M12.0S"
	maxSegmentDuration="PT5.0S"
	minBufferTime="PT9.9S">
	<ServiceDescription id="0">
	</ServiceDescription>
	<Period id="0" start="PT0.0S">
		<AdaptationSet id="0" contentType="audio" startWithSAP="1" segmentAlignment="true" bitstreamSwitching="true">
			<Representation id="0" mimeType="audio/mp4" codecs="mp4a.40.2" bandwidth="128000" audioSamplingRate="44100">
				<AudioChannelConfiguration schemeIdUri="urn:mpeg:dash:23003:3:audio_channel_configuration:2011" value="2" />
				<SegmentTemplate timescale="1000000" duration="5000000" initialization="track6_init.mp4" media="track6_$Number$.m4s" startNumber="1">
				</SegmentTemplate>
			</Representation>
		</AdaptationSet>
	</Period>
</MPD>`;
const mpdContentDoubleAdaptationSet = `<?xml version="1.0" encoding="utf-8"?>
<MPD xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xmlns="urn:mpeg:dash:schema:mpd:2011"
	xmlns:xlink="http://www.w3.org/1999/xlink"
	xsi:schemaLocation="urn:mpeg:DASH:schema:MPD:2011 http://standards.iso.org/ittf/PubliclyAvailableStandards/MPEG-DASH_schema_files/DASH-MPD.xsd"
	profiles="urn:mpeg:dash:profile:isoff-live:2011"
	type="static"
	mediaPresentationDuration="PT0.0S"
	maxSegmentDuration="PT5.0S"
	minBufferTime="PT0.0S">
	<ServiceDescription id="0">
	</ServiceDescription>
	<Period id="0" start="PT0.0S">
		<AdaptationSet id="0" contentType="video" startWithSAP="1" segmentAlignment="true" bitstreamSwitching="true" frameRate="90000/1" maxWidth="700" maxHeight="700" par="1:1">
			<Representation id="0" mimeType="video/mp4" codecs="avc1.f4003e" bandwidth="658065408" width="700" height="700" sar="72:72">
				<SegmentTemplate timescale="1000000" duration="5000000" initialization="track0_init.mp4" media="track0_$Number$.m4s" startNumber="1">
				</SegmentTemplate>
			</Representation>
		</AdaptationSet>
		<AdaptationSet id="1" contentType="audio" startWithSAP="1" segmentAlignment="true" bitstreamSwitching="true">
			<Representation id="1" mimeType="audio/mp4" codecs="mp4a.40.2" bandwidth="128000" audioSamplingRate="44100">
				<AudioChannelConfiguration schemeIdUri="urn:mpeg:dash:23003:3:audio_channel_configuration:2011" value="2" />
				<SegmentTemplate timescale="1000000" duration="5000000" initialization="track0_init.mp4" media="track0_$Number$.m4s" startNumber="1">
				</SegmentTemplate>
			</Representation>
		</AdaptationSet>
	</Period>
</MPD>
`
const mpdPath = 'test.mpd';

describe('extractMediaPresentationDuration', () => {
    it('should return the media presentation duration from single AdaptationSet MPD', async () => {
        const expectedDuration = "PT2M12.0S";
        fs.readFileSync.mockReturnValue(mpdContentSingleAdaptationSet);
        
        const duration = await extractMediaPresentationDuration(mpdPath);
        
        expect(duration).toBe(expectedDuration);
    });
    
    it('should return the media presentation duration from double AdaptationSet MPD', async () => {
        const expectedDuration = "PT0.0S"
        fs.readFileSync.mockReturnValue(mpdContentDoubleAdaptationSet);
        
        const duration = await extractMediaPresentationDuration(mpdPath);
        
        expect(duration).toBe(expectedDuration);
    });
});

describe("extractTimescale", () => {
    it("should return the timescale from a single AdaptationSet MPD", async () => {
        const expectedTimescale = "1000000";
        fs.readFileSync.mockReturnValue(mpdContentSingleAdaptationSet);

        const timescale = await extractTimescale(mpdPath);

        expect(timescale).toBe(expectedTimescale);
    });

    it("should return the timescale from a double AdaptationSet MPD", async () => {
        const expectedTimescale = "1000000";
        fs.readFileSync.mockReturnValue(mpdContentDoubleAdaptationSet);
    
        const timescale = await extractTimescale(mpdPath);
    
        expect(timescale).toBe(expectedTimescale);
    });
});

describe("extractSegmentTemplateDuration", () => {
    it("should return the duration from a single AdaptationSet MPD", async () => {
        const expectedDuration = "5000000";
        fs.readFileSync.mockReturnValue(mpdContentSingleAdaptationSet);

        const duration = await extractSegmentTemplateDuration(mpdPath);

        expect(duration).toBe(expectedDuration);
    });

    it("should return the duration from a double AdaptationSet MPD", async () => {
        const expectedDuration = "5000000";
        fs.readFileSync.mockReturnValue(mpdContentDoubleAdaptationSet);
    
        const duration = await extractSegmentTemplateDuration(mpdPath);
    
        expect(duration).toBe(expectedDuration);
    });
});

describe("extractAudioChannelConfiguration", () => {
    it("should return the AudioChannelConfiguration from a single AdaptationSet MPD", async () => {
        const expectedAudioChannelConfiguration = `<AudioChannelConfiguration schemeIdUri="urn:mpeg:dash:23003:3:audio_channel_configuration:2011" value="2" />`;
        fs.readFileSync.mockReturnValue(mpdContentSingleAdaptationSet);

        const audioChannelConfiguration = await extractAudioChannelConfiguration(mpdPath);

        expect(audioChannelConfiguration).toBe(expectedAudioChannelConfiguration);
    });

    it("should return the AudioChannelConfiguration from a double AdaptationSet MPD", async () => {
        const expectedAudioChannelConfiguration = `<AudioChannelConfiguration schemeIdUri="urn:mpeg:dash:23003:3:audio_channel_configuration:2011" value="2" />`;
        fs.readFileSync.mockReturnValue(mpdContentDoubleAdaptationSet);

        const audioChannelConfiguration = await extractAudioChannelConfiguration(mpdPath);

        expect(audioChannelConfiguration).toBe(expectedAudioChannelConfiguration);
    });
});
