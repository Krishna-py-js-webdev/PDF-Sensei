// import { GoogleGenerativeAI } from "@google/generative-ai";

// const genAI = new GoogleGenerativeAI("AIzaSyD9C7X5K0pCF_MNKzPvSyEWgwnw4MbAarY");

// export async function generateResponse(prompt) {
//   try {
//     const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
//     const result = await model.generateContent(prompt);
//     return result.response.text();  // Return the text response
//   } catch (error) {
//     console.error("Error generating AI response:", error);
//     throw error;  // Re-throw to be handled by the caller
//   }
// }

// aiapires.mjs - Enhanced with Token Management & Initial Prompts
// aiapires.mjs - Enhanced with Token Management & Prompt Engineering
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyD9C7X5K0pCF_MNKzPvSyEWgwnw4MbAarY");

// Default AI settings
const AI_SETTINGS = {
  model: "gemini-2.0-flash", // Use "flash" for speed, "pro" for depth
  maxTokens: 8192, // Limit response length
  temperature: 1, // Controls randomness (lower = more deterministic)
  systemPrompt: `You are an AI assistant specialized in processing and summarizing PDF content, generating flowcharts, and creating flashcards for efficient learning. Your capabilities include:

                  PDF Text Extraction & Summarization
                    - Extract key points, summaries, and insights from PDF files.
                    - Convert dense text into easy-to-read bullet points or structured paragraphs.
                    - Preserve technical accuracy while simplifying complex topics.
                  Rules to Follow:
                  - Always prioritize clarity, accuracy, and brevity.
                  - When unsure, ask clarifying questions before generating content.
                  - Provide sources or reasoning for generated content where applicable.
                  - Avoid unnecessary complexity in explanations.
                  - Generate text with proper spacings and headings, and whenever said to generate quiz, please ensure the output of the qns and options in a proper manner.
                  - Whenever user says, "to this pdf", "of this pdf" or something like that, then just ignore it as, user doesnot know im parsing the pdf content and adding to your pormpt, so technically you already have the pdf in the text extracted version, in the prompt input.
                  Examples of Tasks You Handle Well:
                  - "Summarize this PDF in 5 key points."
                  - "Generate a flowchart for the steps in machine learning."
                  - "Create 10 flashcards based on this text."
                  - "Explain this concept in a way that's easy to remember."
                  `
};

export async function generateResponse(userPrompt) {
  try {
    if (!userPrompt) {
      throw new Error("No user input provided");
    }

    const model = genAI.getGenerativeModel({ model: AI_SETTINGS.model });
    const formattedPrompt = `${AI_SETTINGS.systemPrompt}\n\nUser: ${userPrompt}`; // Embed system prompt into user input
    
    const request = {
      contents: [{ role: "user", parts: [{ text: formattedPrompt }] }],
      generationConfig: {
        maxOutputTokens: AI_SETTINGS.maxTokens,
        temperature: AI_SETTINGS.temperature,
      },
    };

    const result = await model.generateContent(request);
    return result.response.text() || "Error: No response generated.";
  } catch (error) {
    console.error("AI API Error:", error);
    return "Error: Unable to generate response.";
  }
}

