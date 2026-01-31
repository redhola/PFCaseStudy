import { Container, Sprite, Text } from "pixi.js";

export default class WordSlot extends Container {
  constructor(char, width, height) {
    super();
    this.char = char;

    // 1. Kutucuk Arka Planı
    const bg = Sprite.from("rect");
    bg.anchor.set(0.5);
    bg.width = width;  // Boyutunu dışarıdan gelen değere göre ayarla
    bg.height = height;
    bg.tint = 0xFFFFFF; // Beyaz
    this.addChild(bg);

    // 2. Harf Metni
    this.text = new Text(char, {
      fontFamily: "Sniglet",
      fontSize: width * 0.6, // Kutunun %60'ı kadar font boyutu
      fill: 0x3d3d3d,        // Koyu gri yazı
      fontWeight: "bold",
      align: "center"
    });
    this.text.anchor.set(0.5);
    
    // ÖNEMLİ: Harf başta gizli olacak, doğru bilinince açılacak.
    this.text.visible = false; 
    
    this.addChild(this.text);
  }

  // Harfi açma fonksiyonu
  reveal() {
    this.text.visible = true;
  }
}