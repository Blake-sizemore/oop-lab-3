"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jquery_1 = require("jquery");
(0, jquery_1.default)(document).ready(function () {
    // global items
    (0, jquery_1.default)("body").addClass("contianer bg-dark");
    (0, jquery_1.default)("header").addClass("row justify-content-center").append("<div></div");
    (0, jquery_1.default)("div").text("Generate Die").addClass("col col-4 btn bg-primary m-1 gen");
    (0, jquery_1.default)('main').addClass("row bg-dark justify-content-center my-3").append("<div>");
    (0, jquery_1.default)("main div").addClass("dieHold row justify-content-center");
    (0, jquery_1.default)("main").append('<div id="rr">');
    (0, jquery_1.default)("main").append("<div id=sum></div>");
    var diceGen = document.querySelector("div.gen");
    var rr = document.getElementById("rr");
    var sumBtn = document.getElementById("sum");
    var dieCount = 0;
    var diceArrayVal = [];
    var buttonDefine = "col col-4 btn bg-primary text-center borader boarder rounded-2 m-3";
    var dieDefine = "die bg-light text-center borader boarder rounded-2 m-2";
    var Die = /** @class */ (function () {
        function Die(add, search) {
            var _this = this;
            this.add = add;
            this.search = search;
            (0, jquery_1.default)("div.dieHold").append(this.add);
            // die function
            (0, jquery_1.default)(this.search).addClass(dieDefine).text(this.roll()).width("100px").height("100px").attr("value", (0, jquery_1.default)(this.search).text()).on("click", function () {
                _this.reRoll();
                _this.arrUpdate();
            }).on("dblclick", function () {
                _this.remove();
                _this.arrSplice();
            });
            this.arrPush();
            // make button for reRoll
            (0, jquery_1.default)(rr).addClass(buttonDefine)
                .text("reroll all dice")
                .on("click", function () {
                _this.reRoll();
                _this.arrSplice();
                _this.arrUpdate();
            });
            (0, jquery_1.default)(sumBtn).addClass(buttonDefine)
                .text("test for Sum - work in progress").on("click", function () { return console.log(diceArrayVal); });
        }
        Die.prototype.roll = function () {
            return Math.floor(Math.random() * (6 - 1)) + 1;
        };
        Die.prototype.reRoll = function () {
            (0, jquery_1.default)(this.search).text(this.roll()).attr("value", (0, jquery_1.default)(this.search).text());
        };
        Die.prototype.arrPush = function () {
            diceArrayVal.push((0, jquery_1.default)(this.search).attr("value"));
        };
        Die.prototype.arrUpdate = function () {
            var value = (0, jquery_1.default)(this.search).attr("value");
            var index = (0, jquery_1.default)(this.search).index();
            diceArrayVal[index] = value;
        };
        Die.prototype.arrSplice = function () {
            var index = (0, jquery_1.default)(this.search).index();
            diceArrayVal.splice(index, index);
        };
        Die.prototype.remove = function () {
            (0, jquery_1.default)(this.search).remove();
        };
        Die.prototype.sumDice = function () {
            diceArrayVal.reduce(function (acc, val) {
                return acc + val;
            });
        };
        Die.prototype.test = function () {
            console.log("test");
        };
        return Die;
    }());
    diceGen.addEventListener('click', function () {
        new Die("<div id=".concat(dieCount, "></div>"), "div#".concat(dieCount));
        ++dieCount;
    });
});
