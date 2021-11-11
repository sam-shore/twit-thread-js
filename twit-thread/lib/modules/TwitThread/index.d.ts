import Twit from "twit";
var twitter = require('twitter-text')
interface TweetThread {
    text: string;
    options?: Twit.Params;
}
export declare type Thread = TweetThread[];
declare type TweetFn = (text: string, options?: Twit.Params) => Promise<Twit.Twitter.Status>;
export declare class TwitThread extends Twit {
    private trimmer;
    constructor(config: Twit.Options);
    tweetThread: (thread: Thread) => Promise<Twit.Twitter.Status[]>;
    tweet: TweetFn;
    private matchParamsToTweets;
    private howManyTimesTweetHasBeenTrimmed;
}
export {};
