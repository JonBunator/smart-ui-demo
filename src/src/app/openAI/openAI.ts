"use server"
import {ValueUpdate} from "smart-ui/src/components/types/types";
import {AzureOpenAI} from "openai";
import { callAgent } from "smart-ui/src/components/SmartAgentProvider/openAI";

const endpoint = process.env.OPENAI_ENDPOINT;
const apiKey = process.env.OPENAI_API_KEY;
const deployment = "gpt-4o";
const apiVersion = process.env.OPENAI_API_VERSION;
const options = { endpoint, apiKey, deployment, apiVersion};
const azureOpenAIClient = new AzureOpenAI(options);

export async  function callAgentEndpoint(systemPrompt: string, prompt: string): Promise<ValueUpdate[]> {
    return callAgent(azureOpenAIClient, systemPrompt, prompt);
}