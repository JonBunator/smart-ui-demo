import {AgentResponse} from "smart-ui";
import {ChatCompletionMessageParam} from "openai/resources/chat/completions/completions";

const promptResponses : Map<string, AgentResponse> = new Map<string, AgentResponse>([
    ["prompt1", {uiInteractions: [{id: "name", value: "Luke"}, {id: "gender-male", value: true}, {id: "interests-sports", value: true}, {id: "favourite-animal", value: "Cat"}, {id: "toggle-button", value: ""}], naturalLanguageInteraction: "prompt1_response"}],
    ["prompt2", {uiInteractions: [{id: "name", value: "Lea"}, {id: "gender-female", value: true}, {id: "interests-sports", value: false}, {id: "favourite-animal", value: "Dog"}], naturalLanguageInteraction: "prompt2_response"}],
    ["prompt3", {uiInteractions: [{id: "interests-sports", value: true}], naturalLanguageInteraction: "prompt3_response"}],
    ["prompt4", {uiInteractions: [{id: "interests-sports", value: false}], naturalLanguageInteraction: "prompt4_response"}],
    ["promptRadio", {uiInteractions: [{id: "gender-male", value: true}], naturalLanguageInteraction: "promptRadio_response"}],
]);

const emptyResponse = {uiInteractions: [], naturalLanguageInteraction: "no_response"};

export async  function callAgentEndpoint(messages: ChatCompletionMessageParam[]): Promise<AgentResponse> {
    const prompt = messages[messages.length - 1].content as string;
    if(promptResponses.has(prompt)) {
        return promptResponses.get(prompt) ?? emptyResponse;
    }
    return emptyResponse;
}