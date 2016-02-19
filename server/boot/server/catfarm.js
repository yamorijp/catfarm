"use strict";

var path = require("path");
var colors = require("colors");
var fork = require("child_process").fork;

module.exports = app => {
  console.log("boot:", __filename);

  const
    master = "Master",
    color = "white",
    cats = [["Tama", "green"], ["Mike", "yellow"],
      ["Siro", "blue"], ["Kuro", "magenta"]];

  app.on("started", () => {
    // 準備が整い次第、にゃんこを投入
    cats.forEach((args, i, arr) => restart(args));
  });

  function restart(args) {
    var child = fork(path.join(__dirname, '../../jobs/cat.js'), args);

    child
      .on("message", (msg) => {
        if (msg == 'punch') {
          // 猫パンチをくらう
          console.log(`${master}: Ouch!`[color]);
          console.log(`${master}: ${args[0]}, wait a minutes.`[color]);
        }
        child.send("patting");
      })
      .on("close", () => {
        // いなくなったらすぐ連れ戻す
        console.log(`${master}: Come back, ${args[0]}.`[color]);
        restart(args);
      });
	}
};
