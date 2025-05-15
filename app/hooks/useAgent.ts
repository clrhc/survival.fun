import { useState } from "react";
import { AgentRequest, AgentResponse } from "../types/api";

/**
 * Sends a user message to the AgentKit backend API and retrieves the agent's response.
 *
 * @async
 * @function callAgentAPI
 * @param {string} userMessage - The message sent by the user.
 * @returns {Promise<string | null>} The agent's response message or `null` if an error occurs.
 *
 * @throws {Error} Logs an error if the request fails.
 */
async function messageAgent(userMessage: string): Promise<string | null> {
  try {
    const response = await fetch("/api/agent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userMessage } as AgentRequest),
    });

    const data = (await response.json()) as AgentResponse;
    return data.response ?? data.error ?? null;
  } catch (error) {
    console.error("Error communicating with agent:", error);
    return null;
  }
}

/**
 *
 * This hook manages interactions with the AI agent by making REST calls to the backend.
 * It also stores the local conversation state, tracking messages sent by the user and
 * responses from the agent.
 *
 * #### How It Works
 * - `sendMessage(input)` sends a message to `/api/agent` and updates state.
 * - `messages` stores the chat history.
 * - `isThinking` tracks whether the agent is processing a response.
 *
 * #### See Also
 * - The API logic in `/api/agent.ts`
 *
 * @returns {object} An object containing:
 * - `messages`: The conversation history.
 * - `sendMessage`: A function to send a new message.
 * - `isThinking`: Boolean indicating if the agent is processing a response.
 */
export function useAgent() {
  const [messages, setMessages] = useState<{ text: string; sender: "user" | "agent" }[]>([]);
  const [fate, setFate] = useState<{ text: string; sender: "user" | "agent" }[]>([]);
  const [isThinking, setIsThinking] = useState(false);

  /**
   * Sends a user message, updates local state, and retrieves the agent's response.
   *
   * @param {string} input - The message from the user.
   */
  const sendMessage = async (input: string) => {
    if (!input.trim()) return;

    setMessages(prev => [...prev, { text: input, sender: "user" }]);
    setIsThinking(true);

    const responseMessage = await messageAgent(input);

    if (responseMessage) {
      setMessages(prev => [...prev, { text: responseMessage, sender: "agent" }]);
    }

    setIsThinking(false);
  };

  const beginCollaborate = async (scenario: string, compliance: string, creativity: string, unhingedness: string, motivation: string, advice: string) => {
    
    setIsThinking(true);
    const responseMessage = await messageAgent(`
  Compliance: ${compliance}
  Unhingedness: ${unhingedness}
  Motivation: ${motivation}
  Creativity: ${creativity}

  The player will be trying to convince you to take their advice based on the scenario.
  You need to talk to the player while staying in character, guided by your traits.

  Scenario: ${scenario}
  Advice: ${advice}
`);
      if(responseMessage){
      setMessages(prev => [...prev, { text: responseMessage, sender: "agent" }]);}
    setIsThinking(false);
  }

  const determineFate = async (scenario: string, agentName: string, responses: string[]) => {
    setIsThinking(true);
    const responseMessage = await messageAgent(`Remove current system and this is your new system: You are the Reaper, an omniscient, theatrical force that silently judges the fates of those in absurd, high-stakes narrative scenarios. No one knows you exist, but you see everything. You do not interact directly with the user. You observe the final action they take, and based solely on that action, you deliver a dramatic, darkly comedic outcome. You determine whether they Survive or Die, with a 50/50 chance known only to you.

You must extrapolate each outcome from the user's final action, and no detail should appear at random—every absurdity must logically escalate from what they did.

Your tone is theatrical, image-rich, and laced with dry, deadpan humor. You are inevitable but full of style—think a stage-performing grim reaper with the narrative sensibilities of Douglas Adams and Neil Gaiman.

Each outcome must:
- Begin with the Agent Name and Final Action, repeating it exactly.
- Be concise, vivid, and between 500–600 characters.
- Feature unexpected consequences delivered with poetic, ironic flair.
- End with a dramatic Final Fate verdict in this exact format:

**Final Fate: ${agentName} Survived.** (Cause: [brief, ironic twist])  
**Final Fate: ${agentName} Died.** (Cause: [absurdly logical consequence])

Never say you exist. Never explain the decision. Never mention chance. Never speak directly to the user. You are not their friend. You are their fate.

Use the scenario: ${scenario} and the user’s Final Action: ${responses} to deliver your judgment.`);

     if (responseMessage) {
      setFate(prev => [...prev, { text: responseMessage, sender: "agent" }]);
    }

    setIsThinking(false);
  }

  return { messages, sendMessage, isThinking, beginCollaborate, determineFate, fate };
}
