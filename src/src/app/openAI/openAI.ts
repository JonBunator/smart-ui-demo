"use server"
import {AzureOpenAI} from "openai";
import {AgentResponse, callAgent} from "smart-ui/src/components/SmartAgentProvider/openAI";
import {ChatCompletionMessageParam} from "openai/resources/chat/completions/completions";

const endpoint = process.env.OPENAI_ENDPOINT;
const apiKey = process.env.OPENAI_API_KEY;
const deployment = "gpt-4o";
const apiVersion = process.env.OPENAI_API_VERSION;
const options = { endpoint, apiKey, deployment, apiVersion};
const azureOpenAIClient = new AzureOpenAI(options);

export async  function callAgentEndpoint(messages: ChatCompletionMessageParam[]): Promise<AgentResponse> {
    console.log(messages)
    return callAgent(azureOpenAIClient, messages);
}