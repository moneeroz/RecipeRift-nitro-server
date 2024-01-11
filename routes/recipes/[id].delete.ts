import { prisma } from "..";
import { v2 as cloudinary } from "cloudinary";

export default defineEventHandler(async (event) => {
  const { id } = event.context.params;

  try {
    const recipe = await prisma.recipe.delete({
      where: { id },
    });
    await cloudinary.uploader.destroy(recipe.cloudinary_id);

    return Response.json(recipe, { status: 200 });
  } catch (error) {
    return error.message;
  }
});
