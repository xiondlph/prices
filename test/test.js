var http = require('http'),
    assert = require('assert');

describe('Запросы', function(){
    it('к API', function(done){
        http.get('http://market.icsystem.ru/v1/search.xml?text=htc', function(res) {
            assert.equal(res.statusCode, 200);
            done();
        }).on('error', function(err) {
            done(err);
        });
    })
})