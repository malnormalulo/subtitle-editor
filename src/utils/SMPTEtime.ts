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
        this.frames = 0;
        this.setFrames(frames);
    }

    public setFrames(frames: Frames) {
        const maxFrames = Math.ceil(this.fps);

        if (frames >= 0 && frames < maxFrames) {
            this.frames = frames;
        } else {
            throw new RangeError(`Provided frames (${frames}) is out of range for FPS ${this.fps}`);
        }
    }

    public getFrames(): Frames {
        return this.frames;
    }

    /**
     * Creates a SMPTEtime from a timeString, returns null if timeString is invalid
     */
    public static createTimeFromString(timeString: string, fps: FPS): SMPTEtime | null{
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

    public toString() {
        const pad = (num: number) => num.toString().padStart(2, '0');
        return `${pad(this.hours)}:${pad(this.minutes)}:${pad(this.seconds)}:${pad(this.getFrames())}`;
    }
}

export default SMPTEtime;