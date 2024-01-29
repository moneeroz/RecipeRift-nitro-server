import { prisma } from "..";

export default defineEventHandler(async (event) => {
  const params = event.context.params.params;
  const [userId, recipeId] = params.split("/");

  try {
    const result = await prisma.cart.upsert({
      where: { userId_recipeId: { userId: userId, recipeId: recipeId } },
      update: { count: { increment: 1 } },
      create: { userId, recipeId },
    });

    return Response.json(result, { status: 200 });
  } catch (error) {
    return error.message;
  }
});
