const Midi = require('jsmidgen');

class StringQuartetGenerator {
    constructor() {
        this.file = new Midi.File();
        this.track = new Midi.Track();
        this.file.addTrack(this.track);
        this.eventCounter = 0;
    }

    incrementEventCounter() {
        this.eventCounter += 1;
    }

    getEventCount() {
        return this.eventCounter;
    }

    addNoteAndWait(channel, note, velocity, duration) {
        this.track.addNoteOn(channel, note, velocity);
        this.track.addNoteOff(channel, note, duration);
        this.incrementEventCounter();
    }

    rrand(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    playMelody(numberOfEvents) {
        const violin1 = 0;
        const violin2 = 1;
        const viola = 2;
        const cello = 3;

        const tempo = 120;
        const quarterNoteDuration = 60000 / tempo;

        // Melody pitches distributed across different octaves
        const melodyPitches = [60, 62, 64, 66, 68, 70, 72, 74, 76, 78, 80, 82];

        // Define the rhythm series
        const rhythmSeries = [1, 2, 1, 2]; // Example: quarter note, half note, quarter note, half note

        let eventIndex = 0;
        let currentTime = 0;

        while (this.getEventCount() < numberOfEvents) {
            const quartetNotes = Array.from({ length: 4 }, (_, j) =>
                melodyPitches[this.rrand(0, melodyPitches.length - 1)] +
                j * 12
            );

            const rhythm = rhythmSeries[eventIndex % rhythmSeries.length];

            // Play the notes for each part
            this.addNoteAndWait(violin1, quartetNotes[0], 64, rhythm * quarterNoteDuration);
            this.addNoteAndWait(violin2, quartetNotes[1], 64, rhythm * quarterNoteDuration);
            this.addNoteAndWait(viola, quartetNotes[2], 64, rhythm * quarterNoteDuration);
            this.addNoteAndWait(cello, quartetNotes[3], 64, rhythm * quarterNoteDuration);

            currentTime += rhythm * quarterNoteDuration;
            eventIndex += 1;
        }

        return this.file;
    }
}

module.exports = StringQuartetGenerator;
