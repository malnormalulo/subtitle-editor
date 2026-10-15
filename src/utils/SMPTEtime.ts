// Source - https://stackoverflow.com/a/39495173
// Posted by AlexG, modified by community. See post 'Timeline' for change history
// Retrieved 2026-09-23, License - CC BY-SA 4.0

type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
    ? Acc[number]
    : Enumerate<N, [...Acc, Acc['length']]>

type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>


type Hours = IntRange<0, 100>   //[0, 99)
type Minutes = IntRange<0, 60>  //[0, 59)
type Seconds = IntRange<0, 60>  //[0, 59)
type Frames = IntRange<0, 60>  //[0, 59)

export type FPS = 23.976 | 24 | 25 | 29.97 | 30 | 50 | 59.94 | 60;

class SMPTEtime {
    // format 00:00:00:00
    public static readonly pattern: string = "^[0-9]{2}:[0-5][0-9]:[0-5][0-9]:[0-5][0-9]$";
    private static readonly extractPattern: string = "^([0-9]{2}):([0-5][0-9]):([0-5][0-9]):([0-5][0-9])$";

    readonly fps: FPS;

    public hours: Hours;
    public minutes: Minutes;
    public seconds: Seconds;
    private frames: Frames;

    public constructor(fps: FPS, hours: Hours, minutes: Minutes, seconds: Seconds, frames: Frames) {
        this.fps = fps;
        this.hours = hours;
        this.minutes = minutes;
        this.seconds = seconds;
        this.frames = SMPTEtime.correctFrames(this.fps, this.minutes, this.seconds, frames);
    }

    public setFrames(frames: Frames) {
        this.frames = SMPTEtime.correctFrames(this.fps, this.minutes, this.seconds, frames);
    }

    public getFrames(): Frames {
        return this.frames;
    }

    public addSeconds(seconds: number): SMPTEtime {
        const totalSeconds = (this.hours * 60 + this.minutes) * 60 + this.seconds + seconds;

        if (totalSeconds < 0)
            return new SMPTEtime(this.fps, 0, 0, 0, 0);

        return new SMPTEtime(
            this.fps,
            Math.floor(totalSeconds / 3600) as Hours,
            Math.floor(totalSeconds / 60) % 60 as Minutes,
            totalSeconds % 60 as Seconds,
            this.frames
        );
    }

    public toSeconds(): number {
        return (this.hours * 60 + this.minutes) * 60 + this.seconds + this.frames / this.fps;
    }

    public static correctFrames(fps: FPS, minutes: Minutes, seconds: Seconds, frames: Frames): Frames {
        const maxFrames = Math.ceil(fps);

        if (frames >= 0 && frames < maxFrames) {
            // drop-frame: only for 29.97 (skip frames 0-1) and 59.94 (skip frames 0-3)
            // at second 0 of any minute except 0, 10, 20, 30, 40, 50
            // 23.976 has no drop-frame
            const droppedFrames = fps === 29.97 ? 2 : fps === 59.94 ? 4 : 0;

            if (seconds === 0 && minutes % 10 !== 0 && frames < droppedFrames)
                return droppedFrames as Frames;
            else
                return frames;
        } else {
            throw new RangeError(`Provided frames (${frames}) is out of range for FPS ${fps}`);
        }
    }

    /**
     * Creates a SMPTEtime from a timeString, returns null if timeString is invalid
     */
    public static createTimeFromString(timeString: string, fps: FPS): SMPTEtime | null {
        const match = timeString.match(SMPTEtime.extractPattern);
        if (match) {
            const hours = Number(match[1]) as Hours;
            const minutes = Number(match[2]) as Minutes;
            const seconds = Number(match[3]) as Seconds;
            const frames = Number(match[4]) as Frames;

            try {
                return new SMPTEtime(fps, hours, minutes, seconds, frames);
            } catch {
                return null
            }
        }
        return null;
    }

    public static comparator(a: SMPTEtime, b: SMPTEtime): number {
        const aMetric = a.hours * 60 * 60 * 60 + a.minutes * 60 * 60 + a.seconds * 60 + a.frames;
        const bMetric = b.hours * 60 * 60 * 60 + b.minutes * 60 * 60 + b.seconds * 60 + b.frames;
        if (aMetric < bMetric)
            return -1;
        if (aMetric > bMetric)
            return 1;
        return 0;
    }

    public static min(a: SMPTEtime, b: SMPTEtime): SMPTEtime {
        return SMPTEtime.comparator(a, b) <= 0 ? a : b;
    }

    public static max(a: SMPTEtime, b: SMPTEtime): SMPTEtime {
        return SMPTEtime.comparator(a, b) >= 0 ? a : b;
    }

    public toString() {
        const pad = (num: number) => num.toString().padStart(2, '0');
        return `${pad(this.hours)}:${pad(this.minutes)}:${pad(this.seconds)}:${pad(this.getFrames())}`;
    }
}

export default SMPTEtime;