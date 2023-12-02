/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

// @ts-ignore
globalThis.window = globalThis

import { ethers } from 'ethers'

export interface Env {
	// Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
	// MY_KV_NAMESPACE: KVNamespace;
	//
	// Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
	// MY_DURABLE_OBJECT: DurableObjectNamespace;
	//
	// Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
	// MY_BUCKET: R2Bucket;
	//
	// Example binding to a Service. Learn more at https://developers.cloudflare.com/workers/runtime-apis/service-bindings/
	// MY_SERVICE: Fetcher;
	//
	// Example binding to a Queue. Learn more at https://developers.cloudflare.com/queues/javascript-apis/
	// MY_QUEUE: Queue;
}

const provider = new ethers.providers.StaticJsonRpcProvider({ url: 'https://nodes.sequence.app/polygon', skipFetchSetup: true }, 137)

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const blockNumber = await getBlockNumber(request)

		// @ts-ignore
		console.log('...', window.fetch)

		const respText = `Hello World! ${blockNumber}`

		return new Response(respText)
	}
}

const getBlockNumber = async (request: Request): Promise<number> => {
	const blockNumber = await provider.getBlockNumber()
	console.log(blockNumber)
	return blockNumber
}