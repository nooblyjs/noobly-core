var connect = require('../../../common/schema').connect;
var Document = require('../../../common/schema').Document;
var EmbeddedDocument = require('../../../common/schema').EmbeddedDocument;

var sim = require('../../../common/loadtest');

var workFunctionFactory = function (userIndex) {

    return function (waitTime) {

        return new Promise(function (res) {

            class Money extends EmbeddedDocument {
                constructor() {
                    super();

                    this.value = {
                        type: Number,
                        choices: [1, 5, 10, 20, 50, 100]
                    };

                    this.currency = {
                        type: String,
                        default: 'usd'
                    }
                }
            }

            class Wallet extends Document {
                constructor() {
                    super();
                    this.contents = [Money];
                }
            }


            var uri = 'nedb://financials';
            connect(uri).then(function (db) {

                var wallet = Wallet.create();
                wallet.contents.push(Money.create());
                wallet.contents[0].value = 5;
                wallet.contents.push(Money.create());
                wallet.contents[1].value = 100;

                wallet.save().then(function () {
                });
            });
        });
    };
};

sim.simulate(10, 1, 60, workFunctionFactory).then(function () {
    console.log(`Total work count: ${reqCount}`);
});



