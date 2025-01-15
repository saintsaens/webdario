import { describe, it, vi, expect } from "vitest";
import { uploadSegment } from "../../repositories/segmentsRepository.js";
import { minioClient } from "../../db/index.js";

vi.mock("../../db/index.js", () => ({
    minioClient: {
        putObject: vi.fn(),
    },
}));

describe("uploadSegment", () => {
    const mockBucket = "testBucket";
    const mockPath = "lofi";
    const mockSegmentName = "track0_1.m4s";
    const mockSegmentStream = { stream: true };
    const mockObjectName = `${mockPath}/${mockSegmentName}`;

    beforeAll(() => {
        process.env.MINIO_SEGMENTS_BUCKET = mockBucket;
        process.env.MINIO_LOFI_SEGMENTS_PATH = mockPath;
    });

    it("should upload the segment and return the object name", async () => {
        minioClient.putObject.mockResolvedValueOnce();

        const result = await uploadSegment(mockSegmentStream, mockSegmentName);

        expect(result).toBe(mockObjectName);
    });

    it("should throw an error if upload fails", async () => {
        const mockError = new Error("Mock upload error");
        
        minioClient.putObject.mockRejectedValueOnce(mockError);

        await expect(uploadSegment(mockSegmentStream, mockSegmentName)).rejects.toThrow(
            `Failed to upload segment: ${mockError.message}`
        );
    });
});
