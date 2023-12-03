import Phaser from 'phaser';
import { Particle } from '../ogjects/Particle';

export class MainScene extends Phaser.Scene {
  private particles: Particle[];

  constructor() {
    super({ key: 'MainScene' });
    this.particles = [];
  }

  preload() {
    this.load.image('background', 'assets/bg.png');
  }

  create(): void {
    this.add.image(500, 300, 'background');
    const centerX = this.cameras.main.centerX;
    const centerY = this.cameras.main.centerY;

    for (let i = 0; i < 50; i++) {
      const color = Phaser.Display.Color.RandomRGB().color;
      const radius = Phaser.Math.Between(5, 15);
      const particle = new Particle(
        this,
        centerX + Phaser.Math.Between(-50, 50),
        centerY + Phaser.Math.Between(-50, 50),
        radius,
        color,
      );
      particle.startDance(this, centerX, centerY, Phaser.Math.Between(1000, 3000));
      this.particles.push(particle);
    }

    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      this.particles.forEach((particle) => {
        particle.moveTo(this, pointer.x, pointer.y, 1000);
      });
      if (!document.fullscreenElement) {
        this.scale.startFullscreen();
      }
    });
  }
}
