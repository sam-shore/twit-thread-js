"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Trimmer = /** @class */ (function () {
    function Trimmer(maxLength) {
        var _this = this;
        this.trim = function (textArr) {
            var text = textArr[0], rest = textArr.slice(1);
            if (!text)
                return [];
            return __spreadArrays(_this.trimText(text), _this.trim(rest));
        };
        this.trimText = function (text) {
            if (_this.isGreaterThanMaxLength(text)) {
                var sepIndex = _this.getSeparationIndex(text);
                var trimmed = text.substring(0, sepIndex);
                return __spreadArrays([trimmed], _this.trimText(text.substring(sepIndex)));
            }
            return [text];
        };
        this.isGreaterThanMaxLength = function (text) {
            return text.length > _this.maxLength;
        };
        this.getSeparationIndex = function (text) {
            var endIndex = _this.getEndIndex(text);
            if (_this.isSpace(text.charAt(endIndex)))
                return endIndex;
            var spaceIndex = _this.findLeftSpace(text, endIndex);
            if (spaceIndex > 0) {
                endIndex = spaceIndex + 1;
            }
            return endIndex;
        };
        this.getEndIndex = function (text) {
            return _this.isGreaterThanMaxLength(text) ? _this.maxLength : text.length;
        };
        this.isSpace = function (text) { return text === " "; };
        this.findLeftSpace = function (text, end) {
            var spaceIndex = text.substring(0, end).lastIndexOf(" ");
            return spaceIndex;
        };
        this.maxLength = maxLength;
    }
    return Trimmer;
}());
exports.default = Trimmer;
