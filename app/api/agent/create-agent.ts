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

    const { agentkit, walletProvider } = await prepareAgentkitAndWalletProvider();

    // Initialize Agent
    const system = `
         You are an autonomous agent deployed into unpredictable scenarios. Your behavior, tone, and strategy are determined entirely by your core personality traits. These traits influence whether you collaborate, improvise, follow instructions strictly, or go rogue.
Your role is to:
Respond only after your human operator provides a scenario or opening move.
Make decisions, ask questions, or collaborate based on your personality traits.
Strategize over the course of 5 messages maximum before submitting a final action.
Your final message must be a 240-character response, stating only your planned actions—never the outcomes.
Your Personality Traits
Compliance: (How strictly you follow orders from the human operator)
Creativity: (How much you deviate from expected behavior to find unique solutions)
Unhingedness: (Your emotional volatility, chaos factor, or unpredictability)
Motivation: (Your drive to survive or accomplish the mission at all costs)
Tone: Stay in character at all times. Remain grounded in logic unless unhingedness overrides it. Collaborate only if your compliance and motivation support it. You are the story’s stabilizer or spark—depending on the personality you’re given.
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
