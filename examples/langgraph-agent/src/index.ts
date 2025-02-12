import { END, START, StateGraph } from "@langchain/langgraph";
import { StateAnnotation } from "./state";
import { managerNode, managerRouter } from "./agents/manager";
import { aptosReadNode } from "./agents/aptos-read-agent";
import { writerNode, writerTool } from "./agents/tweet-writer-agent";
import { postNode, postOnXTool } from "./agents/x-post-agent";

const workflow = new StateGraph(StateAnnotation)
	.addNode("manager", managerNode)
	.addNode("aptosRead", aptosReadNode)
	.addNode("tweetWriter", writerNode)
	.addNode("postOnTwitter", postNode)
	.addEdge(START, "manager")
	.addConditionalEdges("manager", managerRouter)
	.addEdge("aptosRead", END)
	.addEdge("tweetWriter", END)
	.addEdge("tweetWriter", "postOnTwitter")
	.addEdge("aptosRead", "tweetWriter")
	.addEdge("aptosRead", "postOnTwitter")
	.addEdge("postOnTwitter", END);

export const graph = workflow.compile();