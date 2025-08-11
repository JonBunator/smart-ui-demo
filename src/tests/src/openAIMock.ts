import {AgentInput, AgentResponse} from "smart-ui/server";

const promptResponses : Map<string, AgentResponse> = new Map<string, AgentResponse>([
    ["prompt1", {agentOutput: {uiInteractions: [{id: "name", value: "Luke"}, {id: "gender-male", value: true}, {id: "interests-sports", value: true}, {id: "favourite-animal", value: "Cat"}, {id: "toggle-button", value: ""}], naturalLanguageInteraction: "prompt1_response", yesNoButtons: false}, messages: []}],
    ["prompt2", {agentOutput: {uiInteractions: [{id: "name", value: "Lea"}, {id: "gender-female", value: true}, {id: "interests-sports", value: false}, {id: "favourite-animal", value: "Dog"}], naturalLanguageInteraction: "prompt2_response", yesNoButtons: false}, messages: []}],
    ["prompt3", {agentOutput: {uiInteractions: [{id: "interests-sports", value: true}], naturalLanguageInteraction: "prompt3_response", yesNoButtons: false}, messages: []}],
    ["prompt4", {agentOutput: {uiInteractions: [{id: "interests-sports", value: false}], naturalLanguageInteraction: "prompt4_response", yesNoButtons: false}, messages: []}],
    ["prompt5", {agentOutput: {uiInteractions: [{id: "interests-reading", value: true}], naturalLanguageInteraction: "prompt5_response", yesNoButtons: false}, messages: []}],
    ["promptRadio", {agentOutput: {uiInteractions: [{id: "gender-male", value: true}], naturalLanguageInteraction: "promptRadio_response", yesNoButtons: false}, messages: []}],
]);

const emptyResponse = {agentOutput: {uiInteractions: [], naturalLanguageInteraction: "no_response", yesNoButtons: false}, messages: []};

export async function callAgentEndpoint(agentInput: AgentInput): Promise<AgentResponse> {
    const prompt = agentInput.messages[agentInput.messages.length - 1].content as string;
    if(promptResponses.has(prompt)) {
        return promptResponses.get(prompt) ?? emptyResponse;
    }
    return emptyResponse;
}