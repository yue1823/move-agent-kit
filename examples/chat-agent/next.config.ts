import type { NextConfig } from "next"

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		domains: ["us1.discourse-cdn.com", "www.2tag.ai"], // 加入允許的 hostname
	},
}

export default nextConfig
