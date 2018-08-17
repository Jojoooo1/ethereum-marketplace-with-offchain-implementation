var casual = require("casual");

module.exports = () => {
  const data = { products: [] };
  for (let i = 0; i < 10; i++) {
    data.products.push({ id: i, title: casual.title, description: casual.sentences((n = 20)), price: casual.building_number, owner: casual.name });
  }
  return data;
};
