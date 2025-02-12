import { Annotation, messagesStateReducer } from "@langchain/langgraph";
import { BaseMessage } from "@langchain/core/messages"

export const StateAnnotation = Annotation.Root({
	messages: Annotation<BaseMessage[]>({
		reducer: messagesStateReducer,
		default: () => []
	}),
	isAptosReadQuery: Annotation<boolean>({
		reducer: (x, y) => y ?? x ?? false,
		default: () => false
	}),
	isWriterQuery: Annotation<boolean>({
		reducer: (x, y) => y ?? x ?? false,
		default: () => false
	}),
	isXPostQuery: Annotation<boolean>({
		reducer: (x, y) => y ?? x ?? false,
		default: () => false
	}),
})