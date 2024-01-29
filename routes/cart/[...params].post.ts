import { prisma } from "..";

export default defineEventHandler(async (event) => {
  const params = event.context.params.params;
  const [userId, recipeId] = params.split("/");

  try {
    const cartItems = await prisma.cart.findMany({ where: { userId } });

    const recipe = cartItems.find((i) => i.recipeId === recipeId);
    if (recipe) {
      const result = await prisma.cart.update({
        where: { userId_recipeId: { userId: userId, recipeId: recipeId } },
        data: { count: { increment: 1 } },
      });
      return Response.json(result, { status: 200 });
    }

    const cartItem = await prisma.cart.create({
      data: { userId, recipeId },
    });
    return Response.json(cartItem, { status: 200 });
  } catch (error) {
    return error.message;
  }
});
