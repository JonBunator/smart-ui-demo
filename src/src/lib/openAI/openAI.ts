"use server"
import {AzureOpenAI} from "openai";
import {callAgent, AgentResponse} from "smart-ui/server";
import {ChatCompletionMessageParam} from "openai/resources/chat/completions/completions";
import {getSession} from "@/lib/security/session";

const endpoint = process.env.OPENAI_ENDPOINT;
const apiKey = process.env.OPENAI_API_KEY;
const deployment = "gpt-4o";
const apiVersion = process.env.OPENAI_API_VERSION;
const options = { endpoint, apiKey, deployment, apiVersion};
const azureOpenAIClient = new AzureOpenAI(options);

export async  function callAgentEndpoint(messages: ChatCompletionMessageParam[]): Promise<AgentResponse> {
    const sessionData = await getSession();
    if (!sessionData || sessionData.surveyState === "Finished" || sessionData.surveyState === "NotStarted" || sessionData.surveyState["UseCase"] !== "Running") {
        return {uiInteractions: [], naturalLanguageInteraction: "An error occurred"};
    }
    console.log(messages)
    return callAgent(azureOpenAIClient, messages);
}