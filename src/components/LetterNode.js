import { Container, Sprite, Text } from "pixi.js";

export default class LetterNode extends Container {
  constructor(char, radius) {
    super();
    this.char = char;
    this.radius = radius;
    this.isSelected = false;

    // 1. Daire Arka Planı
    this.bg = Sprite.from("circle");
    this.bg.anchor.set(0.5);
    this.bg.width = radius * 2;
    this.bg.height = radius * 2;
    this.addChild(this.bg);

    // 2. Harf Metni
    this.text = new Text(char, {
      fontFamily: "Sniglet",
      fontSize: radius,
      fill: 0x5d2e08, // Koyu kahverengi
      fontWeight: "bold",
      align: "center"
    });
    this.text.anchor.set(0.5);
    this.addChild(this.text);
    
    // Etkileşim (Sonraki adımlarda kullanılacak)
    this.eventMode = 'static'; 
    this.cursor = 'pointer';
  }
}