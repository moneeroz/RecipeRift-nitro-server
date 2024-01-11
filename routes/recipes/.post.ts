import { prisma } from "..";
import { readFiles } from "h3-formidable";
import { v2 as cloudinary } from "cloudinary";
export default defineEventHandler(async (event) => {
  const { fields, files, form } = await readFiles(event, {});

  const img = files.image[0];

  const imgUpload = await cloudinary.uploader.upload(img.filepath, {
    folder: "recipes",
  });

  const recipe = await prisma.recipe.create({
    data: {
      name: fields.name.toString(),
      directions: fields.directions.toString(),
      image: imgUpload.secure_url,
      cloudinary_id: imgUpload.public_id,
      about: fields.about.toString(),
      prep_time: fields.prep_time.toString(),
      category_id: fields.category_id.toString(),
      difficulty: fields.difficulty.toString(),
      tags: fields.tags.toString(),
    },
  });

  return Response.json(recipe, { status: 201 });
});
