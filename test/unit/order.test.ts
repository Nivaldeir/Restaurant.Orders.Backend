// describe("should order", () => {
//   test("should new order", () => {
//     const newIngredient = Ingredient.create("mussarela", 10);
//     const newProduct = Product.create("Calabresa", 10, "test", [newIngredient]);
//     const newTable = Table.create("10");
//     const newOrder = Order.create(newTable);
//     newOrder.addProduct({
//       increment: newIngredient,
//       product: newProduct,
//       quantity: 1,
//     });
//     expect(newOrder.price).toBe(10);
//   });
// });
