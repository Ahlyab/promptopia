import Prompt from "@models/prompt";
import { connectToDatabase } from "@utils/database";

export const GET = async (req, { params }) => {
  try {
    const { id } = await params;
    await connectToDatabase();
    const prompt = await Prompt.findById(id).populate("creator");

    if (!prompt) {
      return new Response("Prompt not found", { status: 404 });
    }

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompts", { status: 500 });
  }
};

export const PATCH = async (req, { params }) => {
  try {
    const { id } = await params;
    const { prompt, tag } = await req.json();
    await connectToDatabase();
    const updatedPrompt = await Prompt.findByIdAndUpdate(
      id,
      { prompt, tag },
      { new: true }
    );

    if (!updatedPrompt) {
      return new Response("Prompt not found", { status: 404 });
    }

    return new Response(JSON.stringify(updatedPrompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to update prompt", { status: 500 });
  }
};

export const DELETE = async (req, { params }) => {
  try {
    const { id } = await params;
    await connectToDatabase();
    const deletedPrompt = await Prompt.findByIdAndRemove(id);

    if (!deletedPrompt) {
      return new Response("Prompt not found", { status: 404 });
    }

    return new Response(JSON.stringify(deletedPrompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to delete prompt", { status: 500 });
  }
};
