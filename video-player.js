// ========== VIDEO PLAYER & TEXT-TO-SPEECH ENGINE ==========

class MECOVideoPlayer {
    constructor() {
        this.videoElement = document.getElementById('meco-video');
        this.playBtn = document.getElementById('play-btn');
        this.pauseBtn = document.getElementById('pause-btn');
        this.volumeSlider = document.getElementById('volume-slider');
        this.speedSelect = document.getElementById('speed-select');
        this.captionsBtn = document.getElementById('captions-btn');
        this.ttsBtn = document.getElementById('tts-btn');
        this.languageSelect = document.getElementById('language-select');
        this.progressBar = document.getElementById('progress-bar');
        this.timeDisplay = document.getElementById('time-display');
        this.captionsDiv = document.getElementById('captions');
        this.speakingIndicator = document.getElementById('speaking-indicator');
        
        this.isSpeaking = false;
        this.isCaptionsEnabled = false;
        this.currentLanguage = 'ar';
        this.synth = window.speechSynthesis;
        
        this.videoScript = {
            ar: [
                { time: 0, text: 'مرحباً بك في منظومة MECO المالية الرقمية' },
                { time: 3, text: 'نحن نقدم أول محفظة عربية لا مركزية على شبكة Solana' },
                { time: 8, text: 'مع توكن MECO المبني على أساس الشفافية والأمان الكامل' },
                { time: 13, text: 'تطبيقك يمنحك التحكم الكامل في أموالك الرقمية' },
                { time: 18, text: 'بدون وسيط أو طرف ثالث يتحكم في حساباتك' },
                { time: 23, text: 'يمكنك إنشاء حتى 10 حسابات منفصلة' },
                { time: 27, text: 'وإدارة مشاريعك الرقمية بكل احترافية' },
                { time: 32, text: 'نظام التخزين Staking يعطيك عوائد مجزية' },
                { time: 36, text: 'تصل إلى 40% سنوياً' },
                { time: 39, text: 'تبادل فوري للعملات عبر Jupiter DEX' },
                { time: 43, text: 'بأفضل الأسعار وأقل الرسوم' },
                { time: 46, text: 'متصفح Web3 مدمج' },
                { time: 49, text: 'تفاعل مباشر مع التطبيقات اللامركزية' },
                { time: 52, text: 'كل هذا بدعم عربي كامل' },
                { time: 55, text: 'انضم للثورة الرقمية الآن' }
            ],
            en: [
                { time: 0, text: 'Welcome to the MECO financial ecosystem' },
                { time: 3, text: 'We offer the first Arabic non-custodial wallet on Solana' },
                { time: 8, text: 'With MECO token built on transparency and complete security' },
                { time: 13, text: 'Your app gives you complete control of your digital assets' },
                { time: 18, text: 'Without intermediaries or third parties' },
                { time: 23, text: 'You can create up to 10 separate accounts' },
                { time: 27, text: 'And manage your digital projects professionally' },
                { time: 32, text: 'The Staking system gives you attractive rewards' },
                { time: 36, text: 'Up to 40% annually' },
                { time: 39, text: 'Instant currency exchange via Jupiter DEX' },
                { time: 43, text: 'With the best prices and lowest fees' },
                { time: 46, text: 'Built-in Web3 browser' },
                { time: 49, text: 'Direct interaction with decentralized applications' },
                { time: 52, text: 'All with full Arabic support' },
                { time: 55, text: 'Join the digital revolution now' }
            ]
        };
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.loadUserPreferences();
    }
    
    setupEventListeners() {
        if (this.playBtn) this.playBtn.addEventListener('click', () => this.play());
        if (this.pauseBtn) this.pauseBtn.addEventListener('click', () => this.pause());
        if (this.volumeSlider) this.volumeSlider.addEventListener('input', (e) => this.setVolume(e.target.value));
        if (this.speedSelect) this.speedSelect.addEventListener('change', (e) => this.setSpeed(e.target.value));
        if (this.captionsBtn) this.captionsBtn.addEventListener('click', () => this.toggleCaptions());
        if (this.ttsBtn) this.ttsBtn.addEventListener('click', () => this.toggleTTS());
        if (this.languageSelect) this.languageSelect.addEventListener('change', (e) => this.changeLanguage(e.target.value));
        
        if (this.videoElement) {
            this.videoElement.addEventListener('timeupdate', () => this.updateCaptions());
            this.videoElement.addEventListener('play', () => this.onVideoPlay());
            this.videoElement.addEventListener('pause', () => this.onVideoPause());
        }
        
        if (this.progressBar) {
            this.progressBar.addEventListener('input', (e) => this.seek(e.target.value));
            if (this.videoElement) {
                this.videoElement.addEventListener('loadedmetadata', () => {
                    this.progressBar.max = this.videoElement.duration;
                });
                this.videoElement.addEventListener('timeupdate', () => {
                    this.progressBar.value = this.videoElement.currentTime;
                    this.updateTimeDisplay();
                });
            }
        }
    }
    
    play() {
        if (this.videoElement) {
            this.videoElement.play();
            if (this.playBtn) this.playBtn.style.display = 'none';
            if (this.pauseBtn) this.pauseBtn.style.display = 'block';
        }
    }
    
    pause() {
        if (this.videoElement) {
            this.videoElement.pause();
            if (this.playBtn) this.playBtn.style.display = 'block';
            if (this.pauseBtn) this.pauseBtn.style.display = 'none';
        }
    }
    
    setVolume(value) {
        if (this.videoElement) {
            this.videoElement.volume = value / 100;
            localStorage.setItem('videoVolume', value);
        }
    }
    
    setSpeed(speed) {
        if (this.videoElement) {
            this.videoElement.playbackRate = parseFloat(speed);
            localStorage.setItem('videoSpeed', speed);
        }
    }
    
    seek(time) {
        if (this.videoElement) {
            this.videoElement.currentTime = time;
        }
    }
    
    updateTimeDisplay() {
        if (this.timeDisplay && this.videoElement) {
            const current = this.formatTime(this.videoElement.currentTime);
            const duration = this.formatTime(this.videoElement.duration);
            this.timeDisplay.textContent = `${current} / ${duration}`;
        }
    }
    
    formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
    
    toggleCaptions() {
        this.isCaptionsEnabled = !this.isCaptionsEnabled;
        if (this.captionsBtn) {
            this.captionsBtn.classList.toggle('active');
        }
        if (this.captionsDiv) {
            this.captionsDiv.style.display = this.isCaptionsEnabled ? 'block' : 'none';
        }
        localStorage.setItem('captionsEnabled', this.isCaptionsEnabled);
    }
    
    toggleTTS() {
        if (this.isSpeaking) {
            this.stopSpeaking();
        } else {
            this.startSpeaking();
        }
    }
    
    changeLanguage(lang) {
        this.currentLanguage = lang;
        localStorage.setItem('videoLanguage', lang);
        this.updateCaptions();
        if (this.isSpeaking) {
            this.stopSpeaking();
            this.startSpeaking();
        }
    }
    
    updateCaptions() {
        if (!this.isCaptionsEnabled || !this.captionsDiv) return;
        
        const script = this.videoScript[this.currentLanguage];
        const currentTime = this.videoElement ? this.videoElement.currentTime : 0;
        
        let currentCaption = '';
        for (let i = script.length - 1; i >= 0; i--) {
            if (currentTime >= script[i].time) {
                currentCaption = script[i].text;
                break;
            }
        }
        
        this.captionsDiv.textContent = currentCaption;
    }
    
    startSpeaking() {
        if (this.synth.speaking) {
            this.synth.cancel();
        }
        
        this.isSpeaking = true;
        if (this.ttsBtn) this.ttsBtn.classList.add('active');
        if (this.speakingIndicator) this.speakingIndicator.style.display = 'flex';
        
        const script = this.videoScript[this.currentLanguage];
        const utterances = script.map(item => {
            const utterance = new SpeechSynthesisUtterance(item.text);
            utterance.lang = this.currentLanguage === 'ar' ? 'ar-SA' : 'en-US';
            utterance.rate = 1;
            utterance.pitch = 1;
            utterance.volume = (this.volumeSlider ? this.volumeSlider.value / 100 : 0.8);
            return utterance;
        });
        
        let currentIndex = 0;
        const speakNext = () => {
            if (currentIndex < utterances.length) {
                const utterance = utterances[currentIndex];
                utterance.onend = () => {
                    currentIndex++;
                    speakNext();
                };
                this.synth.speak(utterance);
            } else {
                this.isSpeaking = false;
                if (this.ttsBtn) this.ttsBtn.classList.remove('active');
                if (this.speakingIndicator) this.speakingIndicator.style.display = 'none';
            }
        };
        
        speakNext();
    }
    
    stopSpeaking() {
        this.synth.cancel();
        this.isSpeaking = false;
        if (this.ttsBtn) this.ttsBtn.classList.remove('active');
        if (this.speakingIndicator) this.speakingIndicator.style.display = 'none';
    }
    
    onVideoPlay() {
        if (this.speakingIndicator) {
            this.speakingIndicator.style.opacity = '0.7';
        }
    }
    
    onVideoPause() {
        if (this.speakingIndicator) {
            this.speakingIndicator.style.opacity = '0.4';
        }
    }
    
    loadUserPreferences() {
        const savedVolume = localStorage.getItem('videoVolume');
        const savedSpeed = localStorage.getItem('videoSpeed');
        const savedCaptions = localStorage.getItem('captionsEnabled');
        const savedLanguage = localStorage.getItem('videoLanguage');
        
        if (savedVolume && this.volumeSlider) {
            this.volumeSlider.value = savedVolume;
            this.setVolume(savedVolume);
        }
        
        if (savedSpeed && this.speedSelect) {
            this.speedSelect.value = savedSpeed;
            this.setSpeed(savedSpeed);
        }
        
        if (savedCaptions === 'true') {
            this.toggleCaptions();
        }
        
        if (savedLanguage && this.languageSelect) {
            this.languageSelect.value = savedLanguage;
            this.currentLanguage = savedLanguage;
        }
    }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('meco-video')) {
        new MECOVideoPlayer();
    }
});
