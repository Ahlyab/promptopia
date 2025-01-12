import Prompt from "@models/prompt";
import { connectToDatabase } from "@utils/database";

export const GET = async (req, { params }) => {
  const { id } = await params;
  console.log("id : ", id);
  try {
    await connectToDatabase();
    const prompts = await Prompt.find({ creator: id }).populate("creator");

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompts", { status: 500 });
  }
};
