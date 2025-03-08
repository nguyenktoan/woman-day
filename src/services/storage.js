export class CardStorage {
  static saveDraft(card) {
    const drafts = this.getDrafts();
    const timestamp = new Date().toISOString();
    const draft = { ...card, timestamp };

    localStorage.setItem("card_drafts", JSON.stringify([...drafts, draft]));
  }

  static getDrafts() {
    return JSON.parse(localStorage.getItem("card_drafts") || "[]");
  }
}
