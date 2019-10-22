var casper = require('casper').create({
//  verbose: true,
//  logLevel: "info",
  pageSettings: {
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36"
  }
})
var fs = require('fs')
var utils = require('utils')
var username = casper.cli.get('username')
var password = casper.cli.get('password')

casper.clickWhileSelector = function(selector) {
    return this.then(function() {
        if (this.exists(selector)) {
//            this.echo('Liked -> ' + this.getElementInfo(selector).tag)
            this.click(selector)
            return this.clickWhileSelector(selector)
        }else{
//            this.echo('There is no new Post')
        }
    })
}

casper.start('https://www.instagram.com/accounts/login/', function() {
  this.waitForSelector('form', function then(){
    console.log("Form page loaded successfully")
    this.capture(username+'-1-loaded.png')
    this.fillSelectors('form', {
      'input[name="username"]': username,
      'input[name="password"]': password
    }, false)
    this.capture(username+'-2-filled.png')
    this.click('button[class="_ah57t _84y62 _i46jh _rmr7s"]')
  }, null, 10000)
})

// casper.options.onResourceReceived = function(C, response) {utils.dump(response)}

casper.then(function() {
  this.wait(10000, function() {
    console.log("Logged in as "+username)
    this.capture(username+'-3-logged.png')
    i=0
    while(i<9999){
      casper.wait(20000, function(){
        casper.clickWhileSelector('span[class="_soakw coreSpriteHeartOpen"]').run() //iOS
	casper.clickWhileSelector('span[class="_soakw coreSpriteLikeHeartOpen"]').run() //Android
        casper.reload()
      })
      i++
    }
  })
})

casper.then(function() {
  this.wait(5000, function() {
      this.capture(username+'-4-liked.png')
      var f = fs.open(username+'.html', 'w')
      f.write(this.getHTML())
      f.close()
  })
})


casper.run(function() {
	this.exit()
})