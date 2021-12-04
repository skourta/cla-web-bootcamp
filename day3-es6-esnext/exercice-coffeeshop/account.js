let id = 0;

function generateNewID() {
  return id++;
}

export class Account {
  id;
  userName;
  name;
  address;
  billingInfo;
  coins;
  constructor({ userName, name, address, billingInfo }) {
    (this.id = generateNewID()),
      (this.userName = userName),
      (this.name = name),
      (this.address = address),
      (this.billingInfo = billingInfo),
      (this.coins = 0);
  }

  addCoins(amount) {
    if (typeof amount === "number") this.coins += Math.abs(amount);
    return this.coins;
  }
  retractCoins(amount) {
    if (typeof amount === "number") this.coins -= Math.abs(amount);
    return this.coins;
  }
}

export class PremiumAccount extends Account {
  gifts;
  constructor(params) {
    super(params);
    this.gifts = [];
  }
  giftCoins(amount) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this.coins - amount >= 0) {
          this.coins -= amount;
          resolve(amount);
        }
        reject(new Error("You have no sufficient amount of coins to gift"));
      }, Math.random() * 1500);
    });
  }
  addGift(senderId, amount, date) {
    this.coins += amount;
    this.gifts.push({ senderId: senderId, amount, date });
  }
}
