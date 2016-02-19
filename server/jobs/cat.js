"use strict";
let path = require("path");
let colors = require("colors");
let loopback = require('loopback');
let boot = require('loopback-boot');
let app = module.exports = loopback();

boot(app, path.join(__dirname, '..'), function(err) {
  if (err) throw err;
  main();
});

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function main() {

  let name = process.argv[2];
  let color = process.argv[3];

  console.log(`-- ${name} join. --`.grey);

  setInterval(() => {
    // 腹が減ったら猫パンチ
    console.log(`${name}: Feed me!`[color]);
    console.log(`-- ${name} send PUNCH! --`.grey);
    process.send('punch');
  }, random(10000, 30000));

  setInterval(() => {
    // よく"にゃー"と鳴く
    console.log(`${name}: Nyaa.`[color])
  }, random(5000, 10000));

  setInterval(() => {
    // たまに"みゃー"と鳴く
    console.log(`${name}: Mew.`[color])
  }, random(7000, 20000));

  setInterval(() => {
    // 稀にいなくなる
    console.log(`-- ${name} lost. --`[color]);
    process.exit();
  }, random(20000, 50000));

  process.on("message", (msg) => {
    // 飼い主のいうことは全て無視
    console.log(`${name}: ...`[color]);
  });

}
