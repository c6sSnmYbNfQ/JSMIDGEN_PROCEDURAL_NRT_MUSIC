const fs = require('fs');
const { promisify } = require('util');
const StringQuartetGenerator = require('./stringQuartetGenerator');

async function generateAndSaveMIDIFile(index, numberOfEvents) {
    const generator = new StringQuartetGenerator();
    const midiData = generator.playMelody(numberOfEvents);
    const fileName = `string_quartet_${numberOfEvents}_events_${index + 1}.mid`;

    await promisify(fs.writeFile)(fileName, midiData.toBytes(), 'binary');

    console.log(`Generated MIDI file: ${fileName}, Event Count: ${generator.getEventCount()}`);
}

// Example usage
const numberOfEvents = 100; // Set the desired number of events

const promises = Array.from({ length: 10000 }, (_, index) =>
    generateAndSaveMIDIFile(index, numberOfEvents)
);

Promise.all(promises)
    .then(() => console.log('All MIDI files generated and saved successfully.'))
    .catch(error => console.error('Error generating MIDI files:', error));
