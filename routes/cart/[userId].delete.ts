import { prisma } from "..";

export default defineEventHandler(async (event) => {
  const { userId } = event.context.params;

  try {
    await prisma.cart.deleteMany({
      where: { userId },
    });
    return Response.json("Basket cleared successfully", { status: 200 });
  } catch (error) {
    return error.message;
  }
});
