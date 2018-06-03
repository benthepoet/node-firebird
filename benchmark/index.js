const Benchmark = require('benchmark');

const xdr = require('./xdr');
const serialize = require('../lib/serialize');

const suite = new Benchmark.Suite();

const values = [];

for (let i = 0; i < 100; i++) {
  values.push(i);
}

suite
  .add('New Writer', function () {
    const newWriter = new xdr.XdrWriter();
    values.forEach(i => newWriter.addInt(i));
    newWriter.toBuffer();
  })
  .add('Old Writer', function () {
    const oldWriter = new serialize.XdrWriter(1);
    values.forEach(i => oldWriter.addUInt(i));  
  })
  .on('cycle', function(event) {
    console.log(String(event.target));
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  .run({ async: true });