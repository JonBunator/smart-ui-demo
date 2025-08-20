"use server"
import {AzureOpenAI} from "openai";
import {AgentInput, AgentResponse, callAgent} from "smart-ui/server";
import {getSession} from "@/lib/security/session";
import {z} from 'zod';
import {zodResponsesFunction} from "openai/helpers/zod";
import {getEmails} from "../db/database";

const endpoint = process.env.OPENAI_ENDPOINT;
const apiKey = process.env.OPENAI_API_KEY;
const deployment = process.env.OPENAI_DEPLOYMENT;
const apiVersion = process.env.OPENAI_API_VERSION;
const options = {endpoint, apiKey, deployment, apiVersion};
const azureOpenAIClient = new AzureOpenAI(options);

const getEmailParameters = z.object({
    lastN: z.number().describe("Number of emails to retrieve, 1 retrieves last email."),
});

const getEmailFunctionOptions = {
    name: "get_emails",
    parameters: getEmailParameters,
    description: "Retrieves emails of the user.",
};


const optionalAgentInput = {
    tools: [{
        tool:
            {type: "function", "function": zodResponsesFunction(getEmailFunctionOptions)},
        function: async (args: {lastN: number}) => await getEmails(args.lastN)
    }]
}

export async function callAgentEndpoint(agentInput: AgentInput): Promise<AgentResponse> {
    const sessionData = await getSession();
    if (!sessionData || sessionData.surveyState === "Finished" || sessionData.surveyState === "InitialQuestions" || sessionData.surveyState["SurveyStep"] !== "Running") {
        return {agentOutput: [{uiInteractions: [], naturalLanguageInteraction: "An error occurred", yesNoButtons: false, motivation: ""}], messages: []};
    }
    const result = await callAgent(azureOpenAIClient, agentInput, optionalAgentInput);
    console.log(JSON.stringify(result))
    return result;
}