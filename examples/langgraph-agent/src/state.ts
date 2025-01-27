import { Annotation, messagesStateReducer } from "@langchain/langgraph";
import { BaseMessage } from "@langchain/core/messages"

export const StateAnnotation = Annotation.Root({
	messages: Annotation<BaseMessage[]>({
		reducer: messagesStateReducer,
		default: () => []
	}),
	isReadQuery: Annotation<boolean>({
		reducer: (x, y) => y ?? x ?? false,
		default: () => false
	}),
	isGeneralQuery: Annotation<boolean>({
		reducer: (x, y) => y ?? x ?? false,
		default: () => false
	})
})