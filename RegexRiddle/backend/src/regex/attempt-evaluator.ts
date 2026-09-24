import { RegexEngine } from './regex-engine.js';
export class AttemptEvaluator {
  static evaluate(
    regexPattern: string,
    positiveChecks: string[],
    negativeChecks: string[]
  ) {
    if (!RegexEngine.isRegexValid(regexPattern)) {
      return {
        isSuccess: false,
        positiveMatches: 0,
        negativeMatches: 0,
        error: 'Invalid or unsupported regular expression.'
      };
    }
    let positiveMatches = 0;
    for (const p of positiveChecks) {
      if (RegexEngine.evaluateString(regexPattern, p)) {
        positiveMatches++;
      }
    }
    let negativeMatches = 0;
    for (const n of negativeChecks) {
      if (RegexEngine.evaluateString(regexPattern, n)) {
        negativeMatches++;
      }
    }
    const isSuccess =
      positiveMatches === positiveChecks.length && negativeMatches === 0;
    return {
      isSuccess,
      positiveMatches,
      negativeMatches,
      error: null
    };
  }
}