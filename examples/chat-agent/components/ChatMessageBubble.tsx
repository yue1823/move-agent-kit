import markdownToHtml from "@/utils/markdownToHtml"
import type { Message } from "ai/react"
import { message } from "antd"
import Image from "next/image" // 引入 next/image
import { useMemo, useState } from "react"

interface NFTItem {
	token_id: string
	name: string
	uri: string
	collection_description: string
	collection_uri: string
}

export function ChatMessageBubble(props: {
	message: Message
	aiEmoji?: string
	sources: any[]
}) {
	const [copied, setCopied] = useState(false)

	const colorClassName = props.message.role === "user" ? "bg-sky-600" : "bg-slate-50 text-black"
	const alignmentClassName = props.message.role === "user" ? "ml-auto" : "mr-auto"
	const prefix = props.message.role === "user" ? "🧑" : props.aiEmoji

	//console.log("chatMessage",props.message.content)

	const { parsedContent, additionalText } = useMemo(() => {
		// 只在 message.role 為 "assistant" 時才執行
		if (props.message.role === "assistant") {
			let content = props.message.content.trim()
			// 嘗試解析成結構化数据
			if (content.includes("token_id:")) {
				// 使用正則表達式提取 NFT 資訊
				const regex =
					/token_id: (.*?),\s*token_name:\s*(.*?),\s*collection_description:\s*(.*?),\s*collection_uri:\s*(.*?),\s*token_uri:\s*(.*?)(?=-|$)/g
				let match
				let nfts: NFTItem[] = []

				while ((match = regex.exec(content)) !== null) {
					nfts.push({
						token_id: match[1].trim(),
						name: match[2].trim(),
						collection_description: match[3].trim(),
						collection_uri: match[4].trim(),
						uri: match[5].trim(),
					})
				}

				if (nfts.length > 0) {
					return { parsedContent: nfts as NFTItem[], additionalText: "" }
				} else {
					console.warn("Could not extract NFT data", content)
					return { parsedContent: null, additionalText: content }
				}
			} else {
				console.warn("Does not look like a list of two tag nfts", content)
				return { parsedContent: null, additionalText: content }
			}
		}
		return { parsedContent: null, additionalText: props.message.content }
	}, [props.message.content, props.message.role])

	const handleCopyClick = () => {
		const textToCopy = parsedContent
			? parsedContent.map((item) => `#${item.name} ${item.collection_description}`).join("\n")
			: props.message.content
		navigator.clipboard
			.writeText(textToCopy)
			.then(() => {
				setCopied(true)
				setTimeout(() => setCopied(false), 2000)
			})
			.catch((err) => {
				console.error("Failed to copy text: ", err)
			})
	}

	return (
		<div className={`${alignmentClassName} ${colorClassName} rounded px-4 py-2 max-w-[80%] mb-8 flex flex-col`}>
			<div className="mr-2">{prefix}</div>
			<div className="whitespace-pre-wrap flex flex-col">
				{parsedContent ? (
					parsedContent.map((item: NFTItem, index: number) => (
						<div key={index} className="mb-4">
							<Image src={item.uri} alt={item.name} width={200} height={200} className="rounded mb-2" />
							<div className="text-sm">Name: {item.name}</div>
							<div className="text-sm">Description: {item.collection_description}</div>
							<div className="text-sm">Hashtags: #{item.name}</div>
						</div>
					))
				) : (
					<div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: props.message.content }} />
				)}
			</div>
			<button
				onClick={handleCopyClick}
				className="px-4 py-2 mt-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-200"
			>
				{copied ? "Copied!" : "Copy All"}
			</button>
		</div>
	)
}
