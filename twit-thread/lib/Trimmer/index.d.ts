export default class Trimmer {
    private maxLength;
    constructor(maxLength: number);
    trim: (textArr: string[]) => string[];
    private trimText;
    private isGreaterThanMaxLength;
    private getSeparationIndex;
    private getEndIndex;
    private isSpace;
    private findLeftSpace;
}
