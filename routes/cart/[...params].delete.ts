import { prisma } from "..";

export default defineEventHandler(async (event) => {
  const params = event.context.params.params;
  const [userId, recipeId] = params.split("/");

  try {
    const cartItem = await prisma.cart.delete({
      where: {
        userId_recipeId: {
          userId: userId,
          recipeId: recipeId,
        },
      },
    });
    return Response.json(cartItem, { status: 200 });
  } catch (error) {
    return error.message;
  }
});
