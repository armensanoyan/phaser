const Phaser = require('phaser');

let mediaRecorder;
let recordedChunks = [];

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: {
    preload,
    create,
    update
  }
};

const game = new Phaser.Game(config);

function preload() {
  // Load any assets here
}

function create() {
  // Example animation: bouncing circle
  const graphics = this.add.graphics();
  const circle = { x: 100, y: 300, radius: 50, velocity: 2 };

  this.time.addEvent({
    loop: true,
    callback: () => {
      graphics.clear();
      graphics.fillStyle(0xff0000, 1);
      graphics.fillCircle(circle.x, circle.y, circle.radius);
      circle.x += circle.velocity;
      if (circle.x + circle.radius > 800 || circle.x - circle.radius < 0) {
        circle.velocity *= -1;
      }
    }
  });

  // Capture the Phaser canvas and set up recording
  const canvas = game.canvas;
  const stream = canvas.captureStream(60); // 60 FPS
  mediaRecorder = new MediaRecorder(stream);

  mediaRecorder.ondataavailable = (event) => {
    if (event.data.size > 0) {
      recordedChunks.push(event.data);
    }
  };

  mediaRecorder.onstop = () => {
    const blob = new Blob(recordedChunks, { type: 'video/webm' });
    const url = URL.createObjectURL(blob);

    // Download the video
    const a = document.createElement('a');
    a.href = url;
    a.download = 'phaser-animation.webm';
    a.click();

    // Clean up
    URL.revokeObjectURL(url);
    recordedChunks = [];
  };

  // Start recording
  startRecording();
}

function update() {
  // Update your animation or game logic here
}

function startRecording() {
  if (mediaRecorder.state !== 'recording') {
    mediaRecorder.start();
    console.log('Recording started...');
    
    // Stop recording after 5 seconds (example duration)
    setTimeout(() => {
      mediaRecorder.stop();
      console.log('Recording stopped.');
    }, 5000);
  }
}