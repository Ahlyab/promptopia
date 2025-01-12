import Prompt from "@models/prompt";
import { connectToDatabase } from "@utils/database";

export const POST = async (req, res) => {
  const { prompt, tag, userId } = await req.json();

  try {
    await connectToDatabase();
    const newPrompt = Prompt({
      prompt,
      tag,
      creator: userId,
    });

    await newPrompt.save();

    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new prompt", { status: 500 });
  }
};
