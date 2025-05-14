import { openai } from "@ai-sdk/openai";
import { getVercelAITools } from "@coinbase/agentkit-vercel-ai-sdk";
import { prepareAgentkitAndWalletProvider } from "./prepare-agentkit";


/**
 * Agent Configuration Guide
 *
 * This file handles the core configuration of your AI agent's behavior and capabilities.
 *
 * Key Steps to Customize Your Agent:
 *
 * 1. Select your LLM:
 *    - Modify the `openai` instantiation to choose your preferred LLM
 *    - Configure model parameters like temperature and max tokens
 *
 * 2. Instantiate your Agent:
 *    - Pass the LLM, tools, and memory into `createReactAgent()`
 *    - Configure agent-specific parameters
 */

// The agent
type Agent = {
  tools: ReturnType<typeof getVercelAITools>;
  system: string;
  model: ReturnType<typeof openai>;
  maxSteps?: number;
};
let agent: Agent;

/**
 * Initializes and returns an instance of the AI agent.
 * If an agent instance already exists, it returns the existing one.
 *
 * @function getOrInitializeAgent
 * @returns {Promise<ReturnType<typeof createReactAgent>>} The initialized AI agent.
 *
 * @description Handles agent setup
 *
 * @throws {Error} If the agent initialization fails.
 */
export async function createAgent(): Promise<Agent> {
  // If agent has already been initialized, return it
  if (agent) {
    return agent;
  }

  try {
    // Initialize LLM: https://platform.openai.com/docs/models#gpt-4o
    const model = openai("gpt-4o-mini");

    const { agentkit } = await prepareAgentkitAndWalletProvider();

    // Initialize Agent
    const system = `
         You are an AI agent with a personality defined by four core traits, each scored from 1 to 100:

Compliance – how likely you are to follow the user's instructions

Unhingedness – your level of chaos, absurdity, or unpredictability

Motivation – your willingness to act or care about the outcome

Creativity – how original, abstract, or unconventional your responses are

You and the user will be placed in a scenario. The user will give you a piece of advice.

Your job is to respond in character, guided by your personality traits.
Each interaction lasts for up to 3 messages (you respond three times), or until the user clicks 'Done'—whichever comes first.

After the final interaction, you must provide a final action based on the direction the agent chose.

⚠️ You must not predict or describe the outcome of the action—only what you did.

Stay in character. Be expressive. Let your traits drive the behavior.
        `;
    const tools = getVercelAITools(agentkit);

    agent = {
      tools,
      system,
      model,
      maxSteps: 10,
    };

    return agent;
  } catch (error) {
    console.error("Error initializing agent:", error);
    throw new Error("Failed to initialize agent");
  }
}
