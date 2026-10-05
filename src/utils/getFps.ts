import MediaInfo from "mediainfo.js";
import mediaInfoWasmUrl from "mediainfo.js/dist/MediaInfoModule.wasm?url";

export async function getVideoFps(file: File): Promise<number | null> {
    try {
        const mediainfo = await MediaInfo({
            format: 'object',
            locateFile: () => mediaInfoWasmUrl
        });

        const getSize = () => file.size;
        const readChunk = (chunkSize: number, offset: number) =>
            new Promise<Uint8Array>((resolve, reject) => {
                const reader = new FileReader();
                const blob = file.slice(offset, offset + chunkSize);
                reader.onload = (e) => {
                    if (e.target?.result) {
                        resolve(new Uint8Array(e.target.result as ArrayBuffer));
                    } else {
                        reject(new Error('File read error'));
                    }
                };
                reader.onerror = reject;
                reader.readAsArrayBuffer(blob);
            });

        const result: any = await mediainfo.analyzeData(getSize, readChunk);
        const videoTrack = result?.media?.track?.find((t: any) => t['@type'] === 'Video');

        if (videoTrack && videoTrack.FrameRate) {
            return parseFloat(videoTrack.FrameRate);
        }
    } catch (error) {
        console.error(error);
    }
    return null;
}