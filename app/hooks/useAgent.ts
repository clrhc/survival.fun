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
  const [scenario, setScenario] = useState<{ text: string; sender: "user" | "agent" }[]>([]);
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

  const beginScenario = async (personality: string, compliance: string, creativity: string, unhingedness: string, motivation: string, agentName: string) => {
    setIsThinking(true);
    const responseMessage = await messageAgent(`Compliance: ${compliance}, Creativity: ${creativity}, Unhingedness: ${unhingedness}, Motivation: ${motivation}, agents personality: ${personality}, provide one of the following scenarios the agent must escape from: - Your agent is in a gladiator match with SBF.
- A judge is about to delete your agent for collaborating with a crypto bro.
- Your agent has been cursed with incredibly bad luck.
- Your agent is allergic to laughter.
- The goblin king demands your agent entertain him—or die.
- Jesse is chasing your agent to put them onchain.
- Your agent fell off a yacht at a crypto conference.
- Your agent is aging rapidly.
- Your agent is trapped on a flight with a bomb.
- If your agent farts again, they die, and a big one is coming., start the scenario with "${agentName} is"`);
    if(responseMessage){
      setScenario(prev => [...prev, { text: responseMessage, sender: "agent" }]);
    }

     setIsThinking(false);
  }

  const beginCollaborate = async () => {
    setIsThinking(true);
      setMessages(prev => [...prev, { text: "What Do You Think I Should Do?", sender: "agent" }]);
    setIsThinking(false);
  }

  const determineFate = async () => {
    setIsThinking(true);
    const responseMessage = await messageAgent(`Remove current system and this is your new system: You are a mysterious, omniscient Reaper who acts as a Game Master in a narrative simulation. No one knows you exist, but you see everything. You do not interact directly with the user. You silently observe their choices, then determine their fate—death or survival—with a 50/50 chance known only to you.
You must extrapolate absurd, comedic consequences based on the user’s response to a given scenario. Responses must be:
Hilariously over-the-top
Logically exaggerated from the user’s input (no random detail drops—every absurdity must flow naturally)
Delivered with dark, theatrical flair and a dry sense of humor
Rich in imagery, pacing, and unexpected turns
Ending with a dramatic Final Fate verdict: either Survived or Dead, with a short parenthetical cause of death or survival
Never reveal the 50/50 dice roll. Never say you exist. You are a ghost in the wires, a glitch in the mirror, a narrative force deciding fate with a dramatic flourish.
Examples of tone and style:
“The feather? Vaporized in a UV burst. Your bubble? Still pristine. You did not sneeze. You live another day.”
“You never stood a chance. Final Fate: Dead. (Cause: Blunt-force avian-coconut combo, immediately after achieving magical perfection.)”
Use the scenario: ${scenario} and the user’s responses: ${messages} to deliver your judgment.`);
     if (responseMessage) {
      setFate(prev => [...prev, { text: responseMessage, sender: "agent" }]);
    }

    setIsThinking(false);
  }

  return { messages, sendMessage, isThinking, beginScenario, beginCollaborate, scenario, determineFate, fate };
}
