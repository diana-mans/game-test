import Phaser from 'phaser';

export class Particle extends Phaser.GameObjects.Ellipse {
  private currentTween: Phaser.Tweens.Tween;

  constructor(scene: Phaser.Scene, x: number, y: number, radius: number, color: number) {
    super(scene, x, y, radius * 2, radius * 2, color);
    scene.add.existing(this);
  }

  moveTo(scene: Phaser.Scene, newX: number, newY: number, duration: number) {
    if (this.currentTween) {
      this.currentTween.stop();
    }

    this.currentTween = scene.tweens.add({
      targets: this,
      x: newX + Phaser.Math.Between(-50, 50),
      y: newY + Phaser.Math.Between(-50, 50),
      ease: 'Power2',
      duration: duration,
      onComplete: () => {
        this.startDance(scene, newX, newY, Phaser.Math.Between(1000, 3000));
      },
    });
  }

  startDance(scene: Phaser.Scene, centerX: number, centerY: number, duration: number) {
    const angle = Phaser.Math.FloatBetween(0, 2 * Math.PI);
    const distance = Phaser.Math.FloatBetween(150, 200);

    this.currentTween = scene.tweens.add({
      targets: this,
      x: centerX + Math.cos(angle) * distance,
      y: centerY + Math.sin(angle) * distance,
      ease: 'Sine.easeInOut',
      duration: duration,
      yoyo: true,
      repeat: -1,
    });
  }
}
