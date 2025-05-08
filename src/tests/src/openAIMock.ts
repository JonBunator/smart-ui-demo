import {ValueUpdate} from "smart-ui";

const promptResponses : Map<string, ValueUpdate[]> = new Map<string, ValueUpdate[]>([
    ["prompt1", [{id: "name", value: "Luke"}, {id: "gender-male", value: true}, {id: "interests-sports", value: true}, {id: "favourite-animal", value: "Cat"}, {id: "toggle-button", value: ""}]],
    ["prompt2", [{id: "name", value: "Lea"}, {id: "gender-female", value: true}, {id: "interests-sports", value: false}, {id: "favourite-animal", value: "Dog"}]],
    ["promptRadio", [{id: "gender-male", value: true}]],
]);


export async  function callAgentEndpoint(_systemPrompt: string, prompt: string): Promise<ValueUpdate[]> {
    if(promptResponses.has(prompt)) {
        return promptResponses.get(prompt) ?? [];
    }
    return []
}