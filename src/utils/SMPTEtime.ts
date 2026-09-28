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

type FPS = 23.976 | 24 | 25 | 29.97 | 30 | 50 | 59.94 | 60;

class SMPTEtime {
    public fps: FPS;
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
}

export default SMPTEtime;