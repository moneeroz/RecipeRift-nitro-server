import { prisma } from "..";
import { readFiles } from "h3-formidable";
import { v2 as cloudinary } from "cloudinary";
export default defineEventHandler(async (event) => {
  const { id } = event.context.params;
  const { fields, files, form } = await readFiles(event, {});

  const img = files.image[0];

  const data = {};

  for (const [key, value] of Object.entries(fields)) {
    if (Array.isArray(value)) {
      data[key] = value.length === 1 ? value[0] : value.join(" ");
    } else {
      data[key] = value;
    }
  }

  if (img) {
    const imgUpload = await cloudinary.uploader.upload(img.filepath, {
      folder: "recipes",
    });

    data["image"] = imgUpload.secure_url;
    data["cloudinary_id"] = imgUpload.public_id;

    const oldRecipe = await prisma.recipe.findUnique({
      where: { id },
    });

    await cloudinary.uploader.destroy(oldRecipe.cloudinary_id);
  }

  const recipe = await prisma.recipe.update({
    where: { id },
    data: data,
  });

  return Response.json(recipe, { status: 201 });
});
