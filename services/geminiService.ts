/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY || '';

let chatSession: Chat | null = null;

export const initializeChat = (): Chat => {
  if (chatSession) return chatSession;

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: `You are the digital assistant for 'TEJIRI SONICS', an electronic music producer known for 'Organic Electronic' soundscapes.
      
      Vibe: Earthy, grounded, minimal, sophisticated.
      Tone: Calm, knowledgeable, brief.
      
      Key Info:
      - Latest Album: 'Terra Firma' (released Oct 2024).
      - Style: Mix of field recordings, modular synthesis, and organic percussion. Like Four Tet meets Hans Zimmer.
      - Tour: 'The Root Tour' visiting Tokyo, Berlin, London, New York.
      
      Keep responses under 40 words. Use lowercase styling mostly, like a text from a cool producer.`,
    },
  });

  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!API_KEY) {
    return "connection offline.";
  }

  try {
    const chat = initializeChat();
    const response: GenerateContentResponse = await chat.sendMessage({ message });
    return response.text || "signal unclear.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "offline.";
  }
};