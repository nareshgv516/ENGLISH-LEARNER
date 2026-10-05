// Speech Service - Text-to-Speech (TTS) and Speech-to-Text (STT)

class SpeechService {
  constructor() {
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.recognition = null;
    this.isSupported = {
      tts: typeof window !== 'undefined' && 'speechSynthesis' in window,
      stt: typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)
    };
  }

  // Speak a word or phrase with optimal English voice settings
  speak(text, { rate = 0.9, pitch = 1.0, lang = 'en-US' } = {}) {
    if (!this.isSupported.tts || !this.synth) {
      console.warn('Speech synthesis is not supported on this browser.');
      return false;
    }

    try {
      this.synth.cancel(); // Cancel any existing speech

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = rate;
      utterance.pitch = pitch;
      utterance.lang = lang;

      // Select preferred natural English voice if available
      const voices = this.synth.getVoices();
      const preferredVoice = voices.find(v => (v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Daniel')))) || voices.find(v => v.lang.startsWith('en'));

      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      this.synth.speak(utterance);
      return true;
    } catch (err) {
      console.error('Error during speech synthesis:', err);
      return false;
    }
  }

  // Initialize Speech Recognition for pronunciation tests
  createRecognition({ onResult, onError, onStart, onEnd }) {
    if (!this.isSupported.stt) {
      onError?.({ error: 'not-supported', message: 'Speech recognition is not supported in this browser. Please try Google Chrome or Edge.' });
      return null;
    }

    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRec();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
    recognition.maxAlternatives = 3;

    recognition.onstart = () => {
      onStart?.();
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      const confidence = event.results[0][0].confidence;
      onResult?.({ transcript, confidence });
    };

    recognition.onerror = (event) => {
      let friendlyMessage = 'Microphone error occurred.';
      if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        friendlyMessage = 'Microphone permission was denied. Please allow microphone access in your browser address bar.';
      } else if (event.error === 'no-speech') {
        friendlyMessage = 'No speech detected. Please speak clearly into your microphone.';
      } else if (event.error === 'network') {
        friendlyMessage = 'Network error while contacting speech recognition service.';
      }
      onError?.({ error: event.error, message: friendlyMessage });
    };

    recognition.onend = () => {
      onEnd?.();
    };

    return recognition;
  }

  // Calculate similarity percentage between target phrase and spoken text
  calculateAccuracy(target, spoken) {
    if (!target || !spoken) return 0;

    const clean = (str) => str.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim().split(/\s+/);
    const targetWords = clean(target);
    const spokenWords = clean(spoken);

    let matches = 0;
    targetWords.forEach(word => {
      if (spokenWords.includes(word)) {
        matches++;
      }
    });

    // Score based on word presence + length similarity
    const wordScore = (matches / targetWords.length) * 100;
    const lengthPenalty = Math.abs(targetWords.length - spokenWords.length) * 10;
    const finalScore = Math.max(0, Math.min(100, Math.round(wordScore - lengthPenalty)));

    return finalScore;
  }

  // Returns word-by-word breakdown comparison between target and spoken
  analyzePronunciation(target, spoken) {
    if (!target) return [];
    const targetWords = target.split(/\s+/);
    const spokenTokens = (spoken || '').toLowerCase().replace(/[^a-z0-9\s]/g, '').trim().split(/\s+/).filter(Boolean);

    return targetWords.map((originalWord) => {
      const cleanWord = originalWord.toLowerCase().replace(/[^a-z0-9]/g, '');
      const isExact = spokenTokens.includes(cleanWord);

      // Check if partially matched
      const isPartial = !isExact && spokenTokens.some(token => 
        (token.length >= 3 && cleanWord.includes(token)) || 
        (cleanWord.length >= 3 && token.includes(cleanWord))
      );

      return {
        word: originalWord,
        clean: cleanWord,
        status: isExact ? 'correct' : isPartial ? 'near' : 'missed'
      };
    });
  }
}

export const speechService = new SpeechService();
