const { ModelManager, DecoratorManager, ModelFile } = require('../concerto/packages/concerto-core');
const fs = require('fs');

const testModel = require('./test.json');
const { VocabularyManager } = require('@accordproject/concerto-vocabulary');
const { Printer } = require('@accordproject/concerto-cto');

const mm = new ModelManager();
const mf = new ModelFile(mm, testModel);
mm.addModelFile(mf);

const vm = new VocabularyManager({missingTermGenerator: VocabularyManager.englishMissingTermGenerator});

const vocDcs = vm.generateDecoratorCommands(mm, 'es');
console.log(vocDcs);
const start = performance.now();
// const nmm = DecoratorManager.decorateModels(mm, vocDcs);
// const nmodelAst = nmm.getModelFile('generated.model@1.0.0').getAst();
const omm = DecoratorManager.optimizedDecorateModels(mm, vocDcs);

const end = performance.now();
console.log(`Execution time: ${end - start} ms`);
