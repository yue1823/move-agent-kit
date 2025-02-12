import { HumanMessage } from "@langchain/core/messages"
import { graph } from "../src"

const main = async () => {
	const result = await graph.invoke({
		messages: [new HumanMessage("Get USDT pool details on joule and create a bull post for it and post it on twitter yourself")]
	})

	console.log(result)
}

main().then().catch(e => console.log(e))