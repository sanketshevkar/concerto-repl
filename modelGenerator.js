const BenchmarkModelGenerator = require('@accordproject/concerto-codegen/lib/common/benchmarkModelGenerator');
const fs = require('fs');

const benchmarkModelGenerator = new BenchmarkModelGenerator;
const generated = benchmarkModelGenerator.generateConcertoModels({
    generateUpToSize: 10000000, // Target upper limit of growth in bytes
    growBy: 'declarations', // Element type by which the model should grow
    nProperties: 5, // Number of properties per declaration
});

fs.writeFileSync('./models.json', JSON.stringify(generated, null, 2));