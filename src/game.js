import { Container, Sprite } from "pixi.js";
import { GAME_WIDTH, GAME_HEIGHT } from "./index";
import levelData from "./level-data.json";
import Board from "./components/Board";
import Tray from "./components/Tray"; // <-- BU EKSİKTİ, EKLENDİ ✅

export default class Game extends Container {
  constructor() {
    super();
    
    // 1. Level Verisini Hazırla
    this.levelData = this.parseLevelData(levelData);
    
    // 2. Katmanları (Layers) Oluştur
    this.backgroundContainer = new Container();
    this.boardContainer = new Container(); 
    this.trayContainer = new Container();  
    
    // 3. Sahneye Ekle
    this.addChild(this.backgroundContainer);
    this.addChild(this.boardContainer);
    this.addChild(this.trayContainer);

    this.init();
  }

  parseLevelData(data) {
    const letters = data.letters;
    const words = data.words.map(item => ({
      word: item.word,
      x: item.x,
      y: item.y,
      direction: item.direction
    }));
    return { letters, words };
  }

  init() {
    // A. Arka Plan
    const bg = Sprite.from("background");
    bg.anchor.set(0.5);
    bg.x = GAME_WIDTH / 2;
    bg.y = GAME_HEIGHT / 2;
    const scale = Math.max(GAME_WIDTH / bg.texture.width, GAME_HEIGHT / bg.texture.height);
    bg.scale.set(scale);
    this.backgroundContainer.addChild(bg);

    // B. Board (Bulmaca)
    this.board = new Board(this.levelData);
    this.boardContainer.addChild(this.board);

    // C. Tray (Harf Çemberi)
    this.tray = new Tray(this.levelData.letters);
    this.trayContainer.addChild(this.tray);

    // D. Konumlandırma
    this.boardContainer.x = GAME_WIDTH / 2;
    this.boardContainer.y = GAME_HEIGHT * 0.35; 

    this.trayContainer.x = GAME_WIDTH / 2;
    this.trayContainer.y = GAME_HEIGHT * 0.85;
    
    console.log("Game Initialized");
  }
}