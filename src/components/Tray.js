import { Container, Sprite } from "pixi.js";
import LetterNode from "./LetterNode";

export default class Tray extends Container {
  constructor(letters) {
    super();
    this.letters = letters;
    this.nodes = []; 
    
    this.setupWheel();
    this.setupShuffleButton();
  }

  setupWheel() {
    const RADIUS = 100; // Çemberin yarıçapı
    const step = (Math.PI * 2) / this.letters.length; // Harfler arası açı

    this.letters.forEach((char, index) => {
      const node = new LetterNode(char, 35); // Yarıçapı 35
      
      // Çember dizilimi
      const angle = index * step - Math.PI / 2;
      
      node.x = Math.cos(angle) * RADIUS;
      node.y = Math.sin(angle) * RADIUS;

      this.addChild(node);
      this.nodes.push(node);
    });
  }

  setupShuffleButton() {
    const btn = Sprite.from("shuffle");
    btn.anchor.set(0.5);
    btn.scale.set(0.6);
    btn.eventMode = 'static';
    btn.cursor = 'pointer';
    btn.on('pointerdown', () => console.log("Shuffle!"));

    this.addChild(btn);
  }
}