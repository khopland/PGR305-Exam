export const showMoney = (price: number): String => {
  return (price / 100).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") + ".kr";
};
