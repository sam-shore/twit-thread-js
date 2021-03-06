"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
var twit_1 = __importDefault(require("twit"));
var Trimmer_1 = __importDefault(require("../Trimmer"));
var tweetMax_1 = require("../../constants/tweetMax");
var errors_1 = require("../../constants/errors");
var twitterText_1 = __importDefault(require("twitter-text"));

var TwitThread = /** @class */ (function (_super) {
    __extends(TwitThread, _super);
    function TwitThread(config) {
        var _this = _super.call(this, config) || this;
        _this.tweetThread = function (thread) { return __awaiter(_this, void 0, void 0, function () {
            var trimmedTweets, tweets, result, options, i, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        trimmedTweets = this.trimmer.trim(thread.map(function (tweet) { return tweet.text; }));
                        tweets = this.matchParamsToTweets(thread, trimmedTweets);
                        result = [];
                        options = {};
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < tweets.length)) return [3 /*break*/, 4];
                        options = __assign({ in_reply_to_status_id: options.in_reply_to_status_id }, tweets[i].options);
                        return [4 /*yield*/, this.tweet(tweets[i].text, options)];
                    case 2:
                        data = _a.sent();
                        options.in_reply_to_status_id = data.id_str;
                        result.push(data);
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, result];
                }
            });
        }); };
        _this.tweet = function (text, options) { return __awaiter(_this, void 0, void 0, function () {
            var mediaData, data_1, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (twitterText_1.default.parseTweet(text).weightedLength > 280)
                            return [2 /*return*/, new Promise(function (res, rej) { return rej(errors_1.ERROR_TWEET_LENGTH); })];
                        mediaData = undefined;
                        if (!(options === null || options === void 0 ? void 0 : options.media_data)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.mediaUpload(options.media_data)];
                    case 1:
                        data_1 = (_a.sent());
                        console.log(data_1, "DATA");
                        mediaData = data_1;
                        console.log(mediaData, "MEDIA DATA");
                        _a.label = 2;
                    case 2: return [4 /*yield*/, this.post(tweetMax_1.TWEET_ROUTE, __assign(__assign({}, options), { status: text, media_ids: mediaData ? [mediaData] : [], media_data: undefined }))];
                    case 3:
                        data = (_a.sent()).data;
                        return [2 /*return*/, data];
                }
            });
        }); };

        //create a function that takes in a array of media_data and returns an array of media_id_strings
        //if you see this its updated
        _this.mediaUpload = function (media_data) { return __awaiter(_this, void 0, void 0, function () {
            var media_id_strings, i, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        media_id_strings = [];
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < media_data.length)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.post(tweetMax_1.MEDIA_UPLOAD_ROUTE, {
                                media_data: media_data[i],
                            })];
                    case 2:
                        data = (_a.sent()).data;
                        media_id_strings.push(data.media_id_string);
                        console.log(data.media_id_string, "MEDIA ID STRING");
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, media_id_strings];
                }
            });
        }); };


        _this.matchParamsToTweets = function (tweets, trimmedTweets) {
            var result = trimmedTweets.map(function (t) { return ({ text: t }); });
            var j = 0;
            for (var i = 0; i < result.length; i++) {
                result[i].options = tweets[j].options;
                i += _this.howManyTimesTweetHasBeenTrimmed(tweets[j].text);
                j++;
            }
            return result;
        };
        _this.howManyTimesTweetHasBeenTrimmed = function (tweet) {
            return Math.floor((twitterText_1.default.parseTweet(tweet).weightedLength - 1) / 280);
        };
        _this.trimmer = new Trimmer_1.default(280);
        return _this;
    }
    return TwitThread;
}(twit_1.default));
exports.TwitThread = TwitThread;
