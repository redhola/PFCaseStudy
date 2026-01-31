import { Container } from "pixi.js";
import WordSlot from "./WordSlot";
import { GAME_WIDTH } from "../index";

export default class Board extends Container {
  constructor(levelData) {
    super();
    this.slots = new Map();
    this.createGrid(levelData);
  }

  createGrid(data) {
    const SLOT_SIZE = 100;
    const GAP = 10;

    // Grid sınırlarını takip etmek için değişkenler
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;

    data.words.forEach(wordData => {
      const { word, x, y, direction } = wordData;

      for (let i = 0; i < word.length; i++) {
        const char = word[i];
        
        const gridX = direction === "H" ? x + i : x;
        const gridY = direction === "V" ? y + i : y;
        
        // Sınırları güncelle
        minX = Math.min(minX, gridX);
        maxX = Math.max(maxX, gridX);
        minY = Math.min(minY, gridY);
        maxY = Math.max(maxY, gridY);

        const key = `${gridX},${gridY}`;

        if (!this.slots.has(key)) {
          const slot = new WordSlot(char, SLOT_SIZE, SLOT_SIZE);
          slot.x = gridX * (SLOT_SIZE + GAP);
          slot.y = gridY * (SLOT_SIZE + GAP);

          this.addChild(slot);
          this.slots.set(key, slot);
        }
      }
    });

    // Matematiksel Genişlik ve Yükseklik Hesabı
    const boardWidth = (maxX - minX + 1) * SLOT_SIZE + (maxX - minX) * GAP;
    const boardHeight = (maxY - minY + 1) * SLOT_SIZE + (maxY - minY) * GAP;

    // Pivot'u tam ortaya al
    this.pivot.x = boardWidth / 2;
    this.pivot.y = boardHeight / 2;

    // Manuel Ölçekleme (Auto Scale)
    const maxAvailableWidth = GAME_WIDTH * 0.95; // Ekranın %95'ini kullan
    if (boardWidth > maxAvailableWidth) {
      const scaleFactor = maxAvailableWidth / boardWidth;
      this.scale.set(scaleFactor);
    }
  }
}