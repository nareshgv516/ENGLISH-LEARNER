// Audio Recorder Service - Captures raw microphone audio using MediaRecorder API
// Allows students to record their voice, listen back, and compare with native AI models

class AudioRecorderService {
  constructor() {
    this.mediaRecorder = null;
    this.audioChunks = [];
    this.stream = null;
    this.isRecording = false;
    this.startTime = null;
    this.timerInterval = null;
  }

  isSupported() {
    return (
      typeof window !== 'undefined' &&
      navigator.mediaDevices &&
      typeof navigator.mediaDevices.getUserMedia === 'function' &&
      typeof window.MediaRecorder !== 'undefined'
    );
  }

  // Start recording audio from user's microphone
  async startRecording({ onTick, onError } = {}) {
    if (!this.isSupported()) {
      const err = new Error('Audio recording is not supported in this browser. Please use Chrome, Edge, or Firefox.');
      onError?.(err);
      throw err;
    }

    try {
      // Release any previous stream
      this.cleanup();

      this.stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });

      // Determine best supported mimeType
      let mimeType = '';
      const types = ['audio/webm;codecs=opus', 'audio/webm', 'audio/ogg;codecs=opus', 'audio/mp4', 'audio/aac'];
      for (const t of types) {
        if (MediaRecorder.isTypeSupported(t)) {
          mimeType = t;
          break;
        }
      }

      const options = mimeType ? { mimeType } : undefined;
      this.mediaRecorder = new MediaRecorder(this.stream, options);
      this.audioChunks = [];

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          this.audioChunks.push(event.data);
        }
      };

      this.mediaRecorder.start(100); // chunk every 100ms
      this.isRecording = true;
      this.startTime = Date.now();

      if (onTick) {
        this.timerInterval = setInterval(() => {
          const elapsedSec = Math.floor((Date.now() - this.startTime) / 1000);
          onTick(elapsedSec);
        }, 500);
      }

      return true;
    } catch (err) {
      this.cleanup();
      let friendlyMsg = 'Could not access your microphone.';
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        friendlyMsg = 'Microphone permission was denied. Please allow microphone access in your browser settings.';
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        friendlyMsg = 'No microphone device was detected on your system.';
      }
      const wrappedErr = new Error(friendlyMsg);
      onError?.(wrappedErr);
      throw wrappedErr;
    }
  }

  // Stop recording and return audio blob, object URL, and duration
  stopRecording() {
    return new Promise((resolve, reject) => {
      if (!this.mediaRecorder || this.mediaRecorder.state === 'inactive') {
        this.cleanup();
        resolve(null);
        return;
      }

      this.mediaRecorder.onstop = () => {
        try {
          const mimeType = this.mediaRecorder.mimeType || 'audio/webm';
          const audioBlob = new Blob(this.audioChunks, { type: mimeType });
          const audioUrl = URL.createObjectURL(audioBlob);
          const duration = this.startTime ? Math.max(1, Math.round((Date.now() - this.startTime) / 1000)) : 1;

          this.cleanup();
          resolve({
            audioBlob,
            audioUrl,
            duration,
            mimeType,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          });
        } catch (err) {
          this.cleanup();
          reject(err);
        }
      };

      try {
        this.mediaRecorder.stop();
      } catch (err) {
        this.cleanup();
        reject(err);
      }
    });
  }

  // Stop tracks and clear intervals
  cleanup() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }

    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
      this.stream = null;
    }

    this.isRecording = false;
    this.mediaRecorder = null;
    this.audioChunks = [];
  }

  // Download recorded audio blob
  downloadRecording(audioBlob, filename = 'my_pronunciation.webm') {
    if (!audioBlob) return;
    const url = URL.createObjectURL(audioBlob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  }
}

export const audioRecorderService = new AudioRecorderService();
