// global.d.ts

// Minimal definitions for recognized alternatives
interface SpeechRecognitionAlternative {
    transcript: string;
    confidence: number;
  }
  
  // Each recognized result can contain multiple alternatives
  interface SpeechRecognitionResult {
    readonly isFinal: boolean;
    readonly length: number;
    item(index: number): SpeechRecognitionAlternative;
    [index: number]: SpeechRecognitionAlternative;
  }
  
  // The results list from the recognition event
  interface SpeechRecognitionResultList {
    readonly length: number;
    item(index: number): SpeechRecognitionResult;
    [index: number]: SpeechRecognitionResult;
  }
  
  // The actual event that is fired on recognition
  interface SpeechRecognitionEvent extends Event {
    readonly results: SpeechRecognitionResultList;
    readonly resultIndex: number;
  }
  
  // The main recognition interface
  interface SpeechRecognition {
    lang: string;
    onresult: (event: SpeechRecognitionEvent) => void;
    start: () => void;
  }
  
  type SpeechRecognitionConstructor = new () => SpeechRecognition;
  
  declare global {
    interface Window {
      SpeechRecognition?: SpeechRecognitionConstructor;
      webkitSpeechRecognition?: SpeechRecognitionConstructor;
    }
  }
  
  export {};
  