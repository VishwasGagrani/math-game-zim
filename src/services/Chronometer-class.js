export default class Chronometer {
    
	constructor(autoStart = true) 
	{
        this.countdownMode = false;
        this.time = 0;
        this.tempTimeCalculation = 0;
        this.startingMilliseconds = 0;
        this.running = false;

        if (autoStart) {
            this.Start();
        }
    }

    Start(startingMilliseconds = 0, countdownMode = false) {
        this.countdownMode = countdownMode;
        this.startingMilliseconds = startingMilliseconds;
        this.time = performance.now();
        this.running = true;
    }

    Stop() {
        this.time = 0;
        this.countdownMode = false;
        this.startingMilliseconds = 0;
        this.running = false;
    }

    Pause() {
        this.startingMilliseconds = this.tempTimeCalculation;
        this.running = false;
    }

    Resume() {
        this.Start(this.startingMilliseconds, this.countdownMode);
    }

    Get_total_milliseconds() {
        if (this.running) {
            if (!this.countdownMode) {
                this.tempTimeCalculation = performance.now() - this.time + this.startingMilliseconds;
            } else {
                this.tempTimeCalculation = -(performance.now() - this.time - this.startingMilliseconds);
            }
            return this.tempTimeCalculation > 0 ? this.tempTimeCalculation : 0;
        } else {
            return 0;
        }
    }

    static Get_total_seconds(totalMilliseconds) {
        return Math.floor(totalMilliseconds / 1000);
    }

    static Get_total_minutes(totalMilliseconds) {
        return Math.floor(Chronometer.Get_total_seconds(totalMilliseconds) / 60);
    }

    static Get_total_hours(totalMilliseconds) {
        return Math.floor(Chronometer.Get_total_minutes(totalMilliseconds) / 60);
    }

    static Get_milliseconds(totalMilliseconds) {
        return Chronometer.zero100Format(Math.floor(totalMilliseconds - Chronometer.Get_total_seconds(totalMilliseconds) * 1000));
    }

    static Get_seconds(totalMilliseconds) {
        return Chronometer.Zero_10_format(Math.floor(Chronometer.Get_total_seconds(totalMilliseconds) - Chronometer.Get_total_minutes(totalMilliseconds) * 60));
    }

    static Get_minutes(totalMilliseconds) {
        return Chronometer.Zero_10_format(Math.floor(Chronometer.Get_total_minutes(totalMilliseconds) - Chronometer.Get_total_hours(totalMilliseconds) * 60));
    }

    static Get_HHMMSSMMM(totalMilliseconds) {
        return Chronometer.Get_total_hours(totalMilliseconds) + ":" + Chronometer.Get_minutes(totalMilliseconds) + ":" + Chronometer.Get_seconds(totalMilliseconds) + ":" + Chronometer.Get_milliseconds(totalMilliseconds);
    }

    static Get_HHMMSS(totalMilliseconds) {
        return Chronometer.Get_total_hours(totalMilliseconds) + ":" + Chronometer.Get_minutes(totalMilliseconds) + ":" + Chronometer.Get_seconds(totalMilliseconds);
    }

    static Get_MMSSMMM(totalMilliseconds) {
        return Chronometer.Get_minutes(totalMilliseconds) + ":" + Chronometer.Get_seconds(totalMilliseconds) + ":" + Chronometer.Get_milliseconds(totalMilliseconds);
    }

    static Get_MMSS(totalMilliseconds) {
        return Chronometer.Get_minutes(totalMilliseconds) + ":" + Chronometer.Get_seconds(totalMilliseconds);
    }

    static Get_SSMMM(totalMilliseconds) {
        return Chronometer.Get_seconds(totalMilliseconds) + ":" + Chronometer.Get_milliseconds(totalMilliseconds);
    }

    static Zero_10_format(number) {
        return number < 10 ? "0" + number : number.toString();
    }

    static Zero_100_format(number) {
        if (number < 10) {
            return "00" + number;
        } else if (number < 100) {
            return "0" + number;
        } else {
            return number.toString();
        }
    }
}

// Example usage
/*
const chrono = new Chronometer();
chrono.Start();
setTimeout(() => {
    chrono.Pause();
    console.log("Paused at: " + chrono.Get_total_milliseconds() + " ms");
    chrono.Resume();
    setTimeout(() => {
        chrono.Stop();
        console.log("Stopped at: " + chrono.Get_total_milliseconds() + " ms");
    }, 2000);
}, 1000);
*/