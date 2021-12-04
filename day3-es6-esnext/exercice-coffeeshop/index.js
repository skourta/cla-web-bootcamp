import { Account, PremiumAccount } from "./account.js";

import CoffeeShop from "./shop.js";

const first = new PremiumAccount({
  userName: "User1",

  address: "CityX",
  billingInfo: {
    creditCardNumber: "XXXXXXXX",
    balance: 1000,
    currency: "USD",
    expirationDate: new Date(Date.parse("2022/02/22")),
  },
});


const shop = new CoffeeShop();

console.log("An account buying Coins ... ");

const invoice = await shop.buyCoins(first, 70);

console.log(invoice);
console.log(first);

const another = new PremiumAccount({
  userName: "User2",
  address: "CityX",
  billingInfo: {
    creditCardNumber: "XXXXXXXX",
    balance: 10,
    currency: "USD",
    expirationDate: new Date(Date.parse("2022/03/16")),
  },
});

// Another asks first to gift him some coins = 34
console.log("An account gifting coins ... ");
try {
  const coins = await first.giftCoins(34);
  another.addGift(first.id, coins, new Date());
  console.log(another);
} catch (err) {
  console.log(err);
}

console.log("An account buying coffee");

console.log("Menu");

console.table(shop.menu);

// using promises
shop
  .orderCoffee("black-coffee", first)
  .then((coffee) => {
    console.log("Here is your coffee 😁");
    console.log(coffee);
    console.log("Orders:");
    console.log(shop.orders);
    console.log("Account Status: ", first);
  })
  .catch((err) => console.log(err));

console.log("Orders:");
console.log(shop.orders);
