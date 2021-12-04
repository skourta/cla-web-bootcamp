import { PremiumAccount } from "./account.js";

function getCoinPriceByCurrency(currency) {
  switch (currency) {
    case "USD":
      return 1.1;
    case "EUR":
      return 1.14;
    default:
      return undefined;
  }
}

export default class CoffeeShop {
  orderIds;
  menu;
  orders;
  constructor() {
    this.orderIds = 0;
    this.menu = [
      {
        id: "black-coffee",
        price: 30,
      },
      {
        id: "Capuccino",
        price: 34,
      },
      {
        id: "Moccacino",
        price: 40,
      },
    ];
    this.orders = [];
  }
  async buyCoins(account, amount) {
    // Actually buying
    return new Promise((res, rej) => {
      setTimeout(() => {
        const { billingInfo: billing } = account;
        const coinPrice = getCoinPriceByCurrency(billing?.currency);

        if (coinPrice === undefined)
          return rej(new Error("Cannot buy in this currency"));

        const price = amount * coinPrice;

        if (price > billing?.balance)
          return rej(new Error("Not enough balance to buy this amount"));

        if (new Date() > billing?.expirationDate)
          return rej(new Error("Card Expired"));

        account.billingInfo.balance -= price;

        account.addCoins(amount);

        res({
          account: account.id,
          coins: amount,
          unit_price: coinPrice,
          total: price,
          date: new Date(),
        });
      }, 3000); // takes 3s
    });
  }
  async orderCoffee(coffeeId, account) {
    const coffee = this._findCoffeeById(coffeeId);
    if (!coffee)
      throw new Error(`Requested coffee with id ${coffeeId} was not Found`);
    console.log("Ordered :", coffee.id);
    try {
      const order = await this._createOrder(coffee, account);
      this.orders.push(order);
      const randomBonus =
        (typeof account === PremiumAccount ? 10 : 5) * Math.random();
      console.log("Added coins bonus: ", randomBonus);
      account.addCoins(randomBonus);
      return await this._prepareOrder(order);
    } catch (rejectedOrder) {
      this.orders.push(err);
      return;
    }
  }
  _findCoffeeById(coffeeId) {
    const coffee = this.menu?.find((item) => item.id === coffeeId);
    return coffee;
  }
  /**
   * Creates a new order if enough amount in account or rejects the order otherwise
   * @param {*} coffee
   * @param {*} account
   * @returns
   */
  _createOrder(coffee, account) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (account < coffee.price)
          return reject({
            coffeeId: coffee.id,
            clientId: account.id,
            orderDate: new Date(),
            status: "rejected",
          });
        account.retractCoins(coffee.price);
        resolve({
          orderId: this.orderIds++,
          coffeeId: coffee.id,
          clientId: account.id,
          orderDate: new Date(),
          status: "ordered",
        });
      }, Math.random() * 1500 + 500);
    });
  }
  _prepareOrder(order) {
    return new Promise((resolve, reject) => {
      const orderIndex = this.orders.findIndex(
        (item) => item.orderId === order.orderId
      );
      if (orderIndex >= 0) {
        setTimeout(() => {
          this.orders[orderIndex].status = "completed";
          resolve("☕");
        }, Math.random() * 2000 + 1000);
      } else {
        reject(new Error("Could not find order"));
      }
    });
  }
}
