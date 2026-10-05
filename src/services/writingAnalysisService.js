// Writing Analysis Service
// Analyzes user paragraphs across grammar, vocabulary variety, sentence length, and readability

export function analyzeWriting(text, topic = {}) {
  const cleanText = text.trim();
  if (!cleanText) {
    return null;
  }

  // Split into sentences and words
  const sentences = cleanText.split(/[.!?]+/).map(s => s.trim()).filter(Boolean);
  const words = cleanText.toLowerCase().replace(/[^a-z0-9\s'-]/g, ' ').split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const sentenceCount = Math.max(1, sentences.length);
  const avgWordsPerSentence = Math.round((wordCount / sentenceCount) * 10) / 10;

  // Vocabulary variety (Type-Token Ratio)
  const uniqueWords = new Set(words);
  const vocabVarietyPercent = Math.min(100, Math.round((uniqueWords.size / Math.max(1, wordCount)) * 100));

  // Check for common grammatical flaws in text
  const grammarIssues = [];

  // Check 1: Sentence capitalization
  sentences.forEach((s) => {
    if (s.length > 0 && s[0] !== s[0].toUpperCase()) {
      grammarIssues.push({
        type: 'Capitalization',
        snippet: s.slice(0, 20) + '...',
        advice: 'Start every sentence with an uppercase letter.'
      });
    }
  });

  // Check 2: Very long run-on sentences (> 30 words)
  sentences.forEach((s) => {
    const sWords = s.split(/\s+/).filter(Boolean).length;
    if (sWords > 30) {
      grammarIssues.push({
        type: 'Run-on Sentence',
        snippet: s.slice(0, 35) + '...',
        advice: 'This sentence is over 30 words long. Consider dividing it with a period or semicolon for clarity.'
      });
    }
  });

  // Check 3: Very short fragments (< 3 words)
  if (sentenceCount > 2) {
    sentences.forEach((s) => {
      const sWords = s.split(/\s+/).filter(Boolean).length;
      if (sWords <= 2) {
        grammarIssues.push({
          type: 'Potential Fragment',
          snippet: s,
          advice: 'Sentence might be an incomplete fragment. Ensure it has both a subject and verb.'
        });
      }
    });
  }

  // Check 4: Subject-Verb Agreement checks
  if (/\b(he|she|it)\s+(don't|go|come|see|make)\b/i.test(cleanText)) {
    grammarIssues.push({
      type: 'Subject-Verb Agreement',
      snippet: 'he/she/it + base verb',
      advice: 'Ensure 3rd person singular subjects take verbs ending with -s/-es (e.g., "he doesn\'t", "she goes").'
    });
  }

  // Check 5: Transition words usage
  const transitionWords = ['furthermore', 'moreover', 'however', 'consequently', 'therefore', 'in addition', 'on the other hand', 'for example', 'although', 'because', 'firstly', 'finally'];
  const transitionsFound = transitionWords.filter(t => cleanText.toLowerCase().includes(t));

  // Check 6: Topic suggested vocabulary usage
  const suggestedUsed = [];
  if (topic.suggestedVocab && Array.isArray(topic.suggestedVocab)) {
    topic.suggestedVocab.forEach(vocab => {
      if (cleanText.toLowerCase().includes(vocab.toLowerCase())) {
        suggestedUsed.push(vocab);
      }
    });
  }

  // Readability estimate (Flesch-Kincaid inspired approximation)
  let readabilityGrade = 'Optimal';
  if (avgWordsPerSentence > 24) readabilityGrade = 'Complex / Dense';
  else if (avgWordsPerSentence < 8) readabilityGrade = 'Elementary / Choppy';
  else readabilityGrade = 'Well-Balanced (College / Professional)';

  // Calculate Subscores
  let grammarScore = Math.max(30, 100 - (grammarIssues.length * 15));
  let vocabScore = Math.min(100, Math.max(40, vocabVarietyPercent + (suggestedUsed.length * 5)));
  let structureScore = Math.min(100, Math.max(40, (sentences.length >= 3 ? 80 : 50) + (transitionsFound.length * 7)));
  let lengthBonus = wordCount >= 60 ? 10 : (wordCount >= 30 ? 5 : 0);

  const overallScore = Math.min(100, Math.round((grammarScore * 0.4) + (vocabScore * 0.3) + (structureScore * 0.3) + lengthBonus));

  // Generate actionable tailored suggestions
  const suggestions = [];
  if (wordCount < 40) {
    suggestions.push('Expand your thoughts by adding concrete examples, reasons ("because..."), or personal feelings.');
  }
  if (transitionsFound.length === 0) {
    suggestions.push('Enhance sentence connectivity by including cohesive transition words such as "Furthermore", "However", or "For instance".');
  }
  if (suggestedUsed.length < 2 && topic.suggestedVocab) {
    suggestions.push(`Try incorporating more theme-related vocabulary, such as: ${topic.suggestedVocab.slice(0, 4).join(', ')}.`);
  }
  if (grammarIssues.length === 0 && wordCount >= 40) {
    suggestions.push('Excellent clarity and grammatical precision! Experiment with varied sentence structures like inverted phrases or participial clauses.');
  }

  return {
    wordCount,
    sentenceCount,
    avgWordsPerSentence,
    vocabVarietyPercent,
    readabilityGrade,
    grammarScore,
    vocabScore,
    structureScore,
    overallScore,
    grammarIssues,
    transitionsFound,
    suggestedUsed,
    suggestions
  };
}
