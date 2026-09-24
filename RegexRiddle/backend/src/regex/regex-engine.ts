import RE2 from 're2';
export class RegexEngine {
  static evaluateString(regexPattern: string, testString: string): boolean {
    try {
      const re = new RE2(regexPattern);
      return re.test(testString);
    } catch (err) {
      return false;
    }
  }
  static isRegexValid(regexPattern: string): boolean {
    try {
      new RE2(regexPattern);
      return true;
    } catch (err) {
      return false;
    }
  }
}