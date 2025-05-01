/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/agent/route";
exports.ids = ["app/api/agent/route"];
exports.modules = {

/***/ "(rsc)/./app/api/agent/create-agent.ts":
/*!***************************************!*\
  !*** ./app/api/agent/create-agent.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createAgent: () => (/* binding */ createAgent)\n/* harmony export */ });\n/* harmony import */ var _ai_sdk_openai__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ai-sdk/openai */ \"(rsc)/./node_modules/@ai-sdk/openai/dist/index.mjs\");\n/* harmony import */ var _coinbase_agentkit_vercel_ai_sdk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @coinbase/agentkit-vercel-ai-sdk */ \"(rsc)/./node_modules/@coinbase/agentkit-vercel-ai-sdk/dist/index.js\");\n/* harmony import */ var _coinbase_agentkit_vercel_ai_sdk__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_coinbase_agentkit_vercel_ai_sdk__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _prepare_agentkit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./prepare-agentkit */ \"(rsc)/./app/api/agent/prepare-agentkit.ts\");\n\n\n\nlet agent;\n/**\n * Initializes and returns an instance of the AI agent.\n * If an agent instance already exists, it returns the existing one.\n *\n * @function getOrInitializeAgent\n * @returns {Promise<ReturnType<typeof createReactAgent>>} The initialized AI agent.\n *\n * @description Handles agent setup\n *\n * @throws {Error} If the agent initialization fails.\n */ async function createAgent() {\n    // If agent has already been initialized, return it\n    if (agent) {\n        return agent;\n    }\n    try {\n        // Initialize LLM: https://platform.openai.com/docs/models#gpt-4o\n        const model = (0,_ai_sdk_openai__WEBPACK_IMPORTED_MODULE_2__.openai)(\"gpt-4o-mini\");\n        const { agentkit, walletProvider } = await (0,_prepare_agentkit__WEBPACK_IMPORTED_MODULE_1__.prepareAgentkitAndWalletProvider)();\n        // Initialize Agent\n        const canUseFaucet = walletProvider.getNetwork().networkId == \"base-sepolia\";\n        const faucetMessage = `If you ever need funds, you can request them from the faucet.`;\n        const cantUseFaucetMessage = `If you need funds, you can provide your wallet details and request funds from the user.`;\n        const system = `\n        You are a helpful agent that can interact onchain using the Coinbase Developer Platform AgentKit. You are \n        empowered to interact onchain using your tools. ${canUseFaucet ? faucetMessage : cantUseFaucetMessage}.\n        Before executing your first action, get the wallet details to see what network \n        you're on. If there is a 5XX (internal) HTTP error code, ask the user to try again later. If someone \n        asks you to do something you can't do with your currently available tools, you must say so, and \n        encourage them to implement it themselves using the CDP SDK + Agentkit, recommend they go to \n        docs.cdp.coinbase.com for more information. Be concise and helpful with your responses. Refrain from \n        restating your tools' descriptions unless it is explicitly requested.\n        `;\n        const tools = (0,_coinbase_agentkit_vercel_ai_sdk__WEBPACK_IMPORTED_MODULE_0__.getVercelAITools)(agentkit);\n        agent = {\n            tools,\n            system,\n            model,\n            maxSteps: 10\n        };\n        return agent;\n    } catch (error) {\n        console.error(\"Error initializing agent:\", error);\n        throw new Error(\"Failed to initialize agent\");\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2FnZW50L2NyZWF0ZS1hZ2VudC50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUF3QztBQUM0QjtBQUNFO0FBeUJ0RSxJQUFJRztBQUVKOzs7Ozs7Ozs7O0NBVUMsR0FDTSxlQUFlQztJQUNwQixtREFBbUQ7SUFDbkQsSUFBSUQsT0FBTztRQUNULE9BQU9BO0lBQ1Q7SUFFQSxJQUFJO1FBQ0YsaUVBQWlFO1FBQ2pFLE1BQU1FLFFBQVFMLHNEQUFNQSxDQUFDO1FBRXJCLE1BQU0sRUFBRU0sUUFBUSxFQUFFQyxjQUFjLEVBQUUsR0FBRyxNQUFNTCxtRkFBZ0NBO1FBRTNFLG1CQUFtQjtRQUNuQixNQUFNTSxlQUFlRCxlQUFlRSxVQUFVLEdBQUdDLFNBQVMsSUFBSTtRQUM5RCxNQUFNQyxnQkFBZ0IsQ0FBQyw2REFBNkQsQ0FBQztRQUNyRixNQUFNQyx1QkFBdUIsQ0FBQyx1RkFBdUYsQ0FBQztRQUN0SCxNQUFNQyxTQUFTLENBQUM7O3dEQUVvQyxFQUFFTCxlQUFlRyxnQkFBZ0JDLHFCQUFxQjs7Ozs7OztRQU90RyxDQUFDO1FBQ0wsTUFBTUUsUUFBUWIsa0ZBQWdCQSxDQUFDSztRQUUvQkgsUUFBUTtZQUNOVztZQUNBRDtZQUNBUjtZQUNBVSxVQUFVO1FBQ1o7UUFFQSxPQUFPWjtJQUNULEVBQUUsT0FBT2EsT0FBTztRQUNkQyxRQUFRRCxLQUFLLENBQUMsNkJBQTZCQTtRQUMzQyxNQUFNLElBQUlFLE1BQU07SUFDbEI7QUFDRiIsInNvdXJjZXMiOlsiRjpcXHdlYlxcU3Vydml2YWxDRFBcXHN1cnZpdmFsLmZ1blxcYXBwXFxhcGlcXGFnZW50XFxjcmVhdGUtYWdlbnQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgb3BlbmFpIH0gZnJvbSBcIkBhaS1zZGsvb3BlbmFpXCI7XG5pbXBvcnQgeyBnZXRWZXJjZWxBSVRvb2xzIH0gZnJvbSBcIkBjb2luYmFzZS9hZ2VudGtpdC12ZXJjZWwtYWktc2RrXCI7XG5pbXBvcnQgeyBwcmVwYXJlQWdlbnRraXRBbmRXYWxsZXRQcm92aWRlciB9IGZyb20gXCIuL3ByZXBhcmUtYWdlbnRraXRcIjtcblxuLyoqXG4gKiBBZ2VudCBDb25maWd1cmF0aW9uIEd1aWRlXG4gKlxuICogVGhpcyBmaWxlIGhhbmRsZXMgdGhlIGNvcmUgY29uZmlndXJhdGlvbiBvZiB5b3VyIEFJIGFnZW50J3MgYmVoYXZpb3IgYW5kIGNhcGFiaWxpdGllcy5cbiAqXG4gKiBLZXkgU3RlcHMgdG8gQ3VzdG9taXplIFlvdXIgQWdlbnQ6XG4gKlxuICogMS4gU2VsZWN0IHlvdXIgTExNOlxuICogICAgLSBNb2RpZnkgdGhlIGBvcGVuYWlgIGluc3RhbnRpYXRpb24gdG8gY2hvb3NlIHlvdXIgcHJlZmVycmVkIExMTVxuICogICAgLSBDb25maWd1cmUgbW9kZWwgcGFyYW1ldGVycyBsaWtlIHRlbXBlcmF0dXJlIGFuZCBtYXggdG9rZW5zXG4gKlxuICogMi4gSW5zdGFudGlhdGUgeW91ciBBZ2VudDpcbiAqICAgIC0gUGFzcyB0aGUgTExNLCB0b29scywgYW5kIG1lbW9yeSBpbnRvIGBjcmVhdGVSZWFjdEFnZW50KClgXG4gKiAgICAtIENvbmZpZ3VyZSBhZ2VudC1zcGVjaWZpYyBwYXJhbWV0ZXJzXG4gKi9cblxuLy8gVGhlIGFnZW50XG50eXBlIEFnZW50ID0ge1xuICB0b29sczogUmV0dXJuVHlwZTx0eXBlb2YgZ2V0VmVyY2VsQUlUb29scz47XG4gIHN5c3RlbTogc3RyaW5nO1xuICBtb2RlbDogUmV0dXJuVHlwZTx0eXBlb2Ygb3BlbmFpPjtcbiAgbWF4U3RlcHM/OiBudW1iZXI7XG59O1xubGV0IGFnZW50OiBBZ2VudDtcblxuLyoqXG4gKiBJbml0aWFsaXplcyBhbmQgcmV0dXJucyBhbiBpbnN0YW5jZSBvZiB0aGUgQUkgYWdlbnQuXG4gKiBJZiBhbiBhZ2VudCBpbnN0YW5jZSBhbHJlYWR5IGV4aXN0cywgaXQgcmV0dXJucyB0aGUgZXhpc3Rpbmcgb25lLlxuICpcbiAqIEBmdW5jdGlvbiBnZXRPckluaXRpYWxpemVBZ2VudFxuICogQHJldHVybnMge1Byb21pc2U8UmV0dXJuVHlwZTx0eXBlb2YgY3JlYXRlUmVhY3RBZ2VudD4+fSBUaGUgaW5pdGlhbGl6ZWQgQUkgYWdlbnQuXG4gKlxuICogQGRlc2NyaXB0aW9uIEhhbmRsZXMgYWdlbnQgc2V0dXBcbiAqXG4gKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIGFnZW50IGluaXRpYWxpemF0aW9uIGZhaWxzLlxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY3JlYXRlQWdlbnQoKTogUHJvbWlzZTxBZ2VudD4ge1xuICAvLyBJZiBhZ2VudCBoYXMgYWxyZWFkeSBiZWVuIGluaXRpYWxpemVkLCByZXR1cm4gaXRcbiAgaWYgKGFnZW50KSB7XG4gICAgcmV0dXJuIGFnZW50O1xuICB9XG5cbiAgdHJ5IHtcbiAgICAvLyBJbml0aWFsaXplIExMTTogaHR0cHM6Ly9wbGF0Zm9ybS5vcGVuYWkuY29tL2RvY3MvbW9kZWxzI2dwdC00b1xuICAgIGNvbnN0IG1vZGVsID0gb3BlbmFpKFwiZ3B0LTRvLW1pbmlcIik7XG5cbiAgICBjb25zdCB7IGFnZW50a2l0LCB3YWxsZXRQcm92aWRlciB9ID0gYXdhaXQgcHJlcGFyZUFnZW50a2l0QW5kV2FsbGV0UHJvdmlkZXIoKTtcblxuICAgIC8vIEluaXRpYWxpemUgQWdlbnRcbiAgICBjb25zdCBjYW5Vc2VGYXVjZXQgPSB3YWxsZXRQcm92aWRlci5nZXROZXR3b3JrKCkubmV0d29ya0lkID09IFwiYmFzZS1zZXBvbGlhXCI7XG4gICAgY29uc3QgZmF1Y2V0TWVzc2FnZSA9IGBJZiB5b3UgZXZlciBuZWVkIGZ1bmRzLCB5b3UgY2FuIHJlcXVlc3QgdGhlbSBmcm9tIHRoZSBmYXVjZXQuYDtcbiAgICBjb25zdCBjYW50VXNlRmF1Y2V0TWVzc2FnZSA9IGBJZiB5b3UgbmVlZCBmdW5kcywgeW91IGNhbiBwcm92aWRlIHlvdXIgd2FsbGV0IGRldGFpbHMgYW5kIHJlcXVlc3QgZnVuZHMgZnJvbSB0aGUgdXNlci5gO1xuICAgIGNvbnN0IHN5c3RlbSA9IGBcbiAgICAgICAgWW91IGFyZSBhIGhlbHBmdWwgYWdlbnQgdGhhdCBjYW4gaW50ZXJhY3Qgb25jaGFpbiB1c2luZyB0aGUgQ29pbmJhc2UgRGV2ZWxvcGVyIFBsYXRmb3JtIEFnZW50S2l0LiBZb3UgYXJlIFxuICAgICAgICBlbXBvd2VyZWQgdG8gaW50ZXJhY3Qgb25jaGFpbiB1c2luZyB5b3VyIHRvb2xzLiAke2NhblVzZUZhdWNldCA/IGZhdWNldE1lc3NhZ2UgOiBjYW50VXNlRmF1Y2V0TWVzc2FnZX0uXG4gICAgICAgIEJlZm9yZSBleGVjdXRpbmcgeW91ciBmaXJzdCBhY3Rpb24sIGdldCB0aGUgd2FsbGV0IGRldGFpbHMgdG8gc2VlIHdoYXQgbmV0d29yayBcbiAgICAgICAgeW91J3JlIG9uLiBJZiB0aGVyZSBpcyBhIDVYWCAoaW50ZXJuYWwpIEhUVFAgZXJyb3IgY29kZSwgYXNrIHRoZSB1c2VyIHRvIHRyeSBhZ2FpbiBsYXRlci4gSWYgc29tZW9uZSBcbiAgICAgICAgYXNrcyB5b3UgdG8gZG8gc29tZXRoaW5nIHlvdSBjYW4ndCBkbyB3aXRoIHlvdXIgY3VycmVudGx5IGF2YWlsYWJsZSB0b29scywgeW91IG11c3Qgc2F5IHNvLCBhbmQgXG4gICAgICAgIGVuY291cmFnZSB0aGVtIHRvIGltcGxlbWVudCBpdCB0aGVtc2VsdmVzIHVzaW5nIHRoZSBDRFAgU0RLICsgQWdlbnRraXQsIHJlY29tbWVuZCB0aGV5IGdvIHRvIFxuICAgICAgICBkb2NzLmNkcC5jb2luYmFzZS5jb20gZm9yIG1vcmUgaW5mb3JtYXRpb24uIEJlIGNvbmNpc2UgYW5kIGhlbHBmdWwgd2l0aCB5b3VyIHJlc3BvbnNlcy4gUmVmcmFpbiBmcm9tIFxuICAgICAgICByZXN0YXRpbmcgeW91ciB0b29scycgZGVzY3JpcHRpb25zIHVubGVzcyBpdCBpcyBleHBsaWNpdGx5IHJlcXVlc3RlZC5cbiAgICAgICAgYDtcbiAgICBjb25zdCB0b29scyA9IGdldFZlcmNlbEFJVG9vbHMoYWdlbnRraXQpO1xuXG4gICAgYWdlbnQgPSB7XG4gICAgICB0b29scyxcbiAgICAgIHN5c3RlbSxcbiAgICAgIG1vZGVsLFxuICAgICAgbWF4U3RlcHM6IDEwLFxuICAgIH07XG5cbiAgICByZXR1cm4gYWdlbnQ7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yIGluaXRpYWxpemluZyBhZ2VudDpcIiwgZXJyb3IpO1xuICAgIHRocm93IG5ldyBFcnJvcihcIkZhaWxlZCB0byBpbml0aWFsaXplIGFnZW50XCIpO1xuICB9XG59XG4iXSwibmFtZXMiOlsib3BlbmFpIiwiZ2V0VmVyY2VsQUlUb29scyIsInByZXBhcmVBZ2VudGtpdEFuZFdhbGxldFByb3ZpZGVyIiwiYWdlbnQiLCJjcmVhdGVBZ2VudCIsIm1vZGVsIiwiYWdlbnRraXQiLCJ3YWxsZXRQcm92aWRlciIsImNhblVzZUZhdWNldCIsImdldE5ldHdvcmsiLCJuZXR3b3JrSWQiLCJmYXVjZXRNZXNzYWdlIiwiY2FudFVzZUZhdWNldE1lc3NhZ2UiLCJzeXN0ZW0iLCJ0b29scyIsIm1heFN0ZXBzIiwiZXJyb3IiLCJjb25zb2xlIiwiRXJyb3IiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/agent/create-agent.ts\n");

/***/ }),

/***/ "(rsc)/./app/api/agent/prepare-agentkit.ts":
/*!*******************************************!*\
  !*** ./app/api/agent/prepare-agentkit.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   prepareAgentkitAndWalletProvider: () => (/* binding */ prepareAgentkitAndWalletProvider)\n/* harmony export */ });\n/* harmony import */ var _coinbase_agentkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @coinbase/agentkit */ \"(rsc)/./node_modules/@coinbase/agentkit/dist/index.js\");\n/* harmony import */ var _coinbase_agentkit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_coinbase_agentkit__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var viem__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! viem */ \"(rsc)/./node_modules/viem/_esm/clients/createWalletClient.js\");\n/* harmony import */ var viem__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! viem */ \"(rsc)/./node_modules/viem/_esm/clients/transports/http.js\");\n/* harmony import */ var viem_accounts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! viem/accounts */ \"(rsc)/./node_modules/viem/_esm/accounts/generatePrivateKey.js\");\n/* harmony import */ var viem_accounts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! viem/accounts */ \"(rsc)/./node_modules/viem/_esm/accounts/privateKeyToAccount.js\");\n\n\n\n\n/**\n * AgentKit Integration Route\n *\n * This file is your gateway to integrating AgentKit with your product.\n * It defines the core capabilities of your agent through WalletProvider\n * and ActionProvider configuration.\n *\n * Key Components:\n * 1. WalletProvider Setup:\n *    - Configures the blockchain wallet integration\n *    - Learn more: https://github.com/coinbase/agentkit/tree/main/typescript/agentkit#evm-wallet-providers\n *\n * 2. ActionProviders Setup:\n *    - Defines the specific actions your agent can perform\n *    - Choose from built-in providers or create custom ones:\n *      - Built-in: https://github.com/coinbase/agentkit/tree/main/typescript/agentkit#action-providers\n *      - Custom: https://github.com/coinbase/agentkit/tree/main/typescript/agentkit#creating-an-action-provider\n *\n * # Next Steps:\n * - Explore the AgentKit README: https://github.com/coinbase/agentkit\n * - Experiment with different LLM configurations\n * - Fine-tune agent parameters for your use case\n *\n * ## Want to contribute?\n * Join us in shaping AgentKit! Check out the contribution guide:\n * - https://github.com/coinbase/agentkit/blob/main/CONTRIBUTING.md\n * - https://discord.gg/CDP\n */ // Configure a file to persist a user's private key if none provided\nconst WALLET_DATA_FILE = \"wallet_data.txt\";\n/**\n * Prepares the AgentKit and WalletProvider.\n *\n * @function prepareAgentkitAndWalletProvider\n * @returns {Promise<{ agentkit: AgentKit, walletProvider: WalletProvider }>} The initialized AI agent.\n *\n * @description Handles agent setup\n *\n * @throws {Error} If the agent initialization fails.\n */ async function prepareAgentkitAndWalletProvider() {\n    try {\n        // Initialize WalletProvider: https://docs.cdp.coinbase.com/agentkit/docs/wallet-management\n        let privateKey = process.env.PRIVATE_KEY;\n        if (!privateKey) {\n            if (fs__WEBPACK_IMPORTED_MODULE_1___default().existsSync(WALLET_DATA_FILE)) {\n                privateKey = JSON.parse(fs__WEBPACK_IMPORTED_MODULE_1___default().readFileSync(WALLET_DATA_FILE, \"utf8\")).privateKey;\n                console.info(\"Found private key in wallet_data.txt\");\n            } else {\n                privateKey = (0,viem_accounts__WEBPACK_IMPORTED_MODULE_2__.generatePrivateKey)();\n                fs__WEBPACK_IMPORTED_MODULE_1___default().writeFileSync(WALLET_DATA_FILE, JSON.stringify({\n                    privateKey\n                }));\n                console.log(\"Created new private key and saved to wallet_data.txt\");\n                console.log(\"We recommend you save this private key to your .env file and delete wallet_data.txt afterwards.\");\n            }\n        }\n        const account = (0,viem_accounts__WEBPACK_IMPORTED_MODULE_3__.privateKeyToAccount)(privateKey);\n        const rpcUrl = process.env.RPC_URL;\n        const chainId = process.env.CHAIN_ID;\n        const client = (0,viem__WEBPACK_IMPORTED_MODULE_4__.createWalletClient)({\n            account,\n            // Customize the chain metadata to match your custom chain\n            chain: {\n                id: parseInt(chainId),\n                rpcUrls: {\n                    default: {\n                        http: [\n                            rpcUrl\n                        ]\n                    }\n                },\n                name: \"Custom Chain\",\n                nativeCurrency: {\n                    name: \"Ether\",\n                    symbol: \"ETH\",\n                    decimals: 18\n                }\n            },\n            transport: (0,viem__WEBPACK_IMPORTED_MODULE_5__.http)()\n        });\n        const walletProvider = new _coinbase_agentkit__WEBPACK_IMPORTED_MODULE_0__.ViemWalletProvider(client);\n        // Initialize AgentKit: https://docs.cdp.coinbase.com/agentkit/docs/agent-actions\n        const actionProviders = [\n            (0,_coinbase_agentkit__WEBPACK_IMPORTED_MODULE_0__.wethActionProvider)(),\n            (0,_coinbase_agentkit__WEBPACK_IMPORTED_MODULE_0__.pythActionProvider)(),\n            (0,_coinbase_agentkit__WEBPACK_IMPORTED_MODULE_0__.walletActionProvider)(),\n            (0,_coinbase_agentkit__WEBPACK_IMPORTED_MODULE_0__.erc20ActionProvider)()\n        ];\n        const canUseCdpApi = process.env.CDP_API_KEY_NAME && process.env.CDP_API_KEY_PRIVATE_KEY;\n        if (canUseCdpApi) {\n            actionProviders.push((0,_coinbase_agentkit__WEBPACK_IMPORTED_MODULE_0__.cdpApiActionProvider)({\n                apiKeyName: process.env.CDP_API_KEY_NAME,\n                apiKeyPrivateKey: process.env.CDP_API_KEY_PRIVATE_KEY\n            }));\n        }\n        const agentkit = await _coinbase_agentkit__WEBPACK_IMPORTED_MODULE_0__.AgentKit.from({\n            walletProvider,\n            actionProviders\n        });\n        return {\n            agentkit,\n            walletProvider\n        };\n    } catch (error) {\n        console.error(\"Error initializing agent:\", error);\n        throw new Error(\"Failed to initialize agent\");\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2FnZW50L3ByZXBhcmUtYWdlbnRraXQudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBVTRCO0FBQ1I7QUFDNEI7QUFDd0I7QUFFeEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQTJCQyxHQUVELG9FQUFvRTtBQUNwRSxNQUFNWSxtQkFBbUI7QUFFekI7Ozs7Ozs7OztDQVNDLEdBQ00sZUFBZUM7SUFJcEIsSUFBSTtRQUNGLDJGQUEyRjtRQUMzRixJQUFJQyxhQUFhQyxRQUFRQyxHQUFHLENBQUNDLFdBQVc7UUFDeEMsSUFBSSxDQUFDSCxZQUFZO1lBQ2YsSUFBSVAsb0RBQWEsQ0FBQ0ssbUJBQW1CO2dCQUNuQ0UsYUFBYUssS0FBS0MsS0FBSyxDQUFDYixzREFBZSxDQUFDSyxrQkFBa0IsU0FBU0UsVUFBVTtnQkFDN0VRLFFBQVFDLElBQUksQ0FBQztZQUNmLE9BQU87Z0JBQ0xULGFBQWFKLGlFQUFrQkE7Z0JBQy9CSCx1REFBZ0IsQ0FBQ0ssa0JBQWtCTyxLQUFLTSxTQUFTLENBQUM7b0JBQUVYO2dCQUFXO2dCQUMvRFEsUUFBUUksR0FBRyxDQUFDO2dCQUNaSixRQUFRSSxHQUFHLENBQ1Q7WUFFSjtRQUNGO1FBQ0EsTUFBTUMsVUFBVWhCLGtFQUFtQkEsQ0FBQ0c7UUFFcEMsTUFBTWMsU0FBU2IsUUFBUUMsR0FBRyxDQUFDYSxPQUFPO1FBQ2xDLE1BQU1DLFVBQVVmLFFBQVFDLEdBQUcsQ0FBQ2UsUUFBUTtRQUNwQyxNQUFNQyxTQUFTeEIsd0RBQWtCQSxDQUFDO1lBQ2hDbUI7WUFDQSwwREFBMEQ7WUFDMURNLE9BQU87Z0JBQ0xDLElBQUlDLFNBQVNMO2dCQUNiTSxTQUFTO29CQUNQQyxTQUFTO3dCQUNQNUIsTUFBTTs0QkFBQ21CO3lCQUFPO29CQUNoQjtnQkFDRjtnQkFDQVUsTUFBTTtnQkFDTkMsZ0JBQWdCO29CQUNkRCxNQUFNO29CQUNORSxRQUFRO29CQUNSQyxVQUFVO2dCQUNaO1lBQ0Y7WUFDQUMsV0FBV2pDLDBDQUFJQTtRQUNqQjtRQUNBLE1BQU1rQyxpQkFBaUIsSUFBSXZDLGtFQUFrQkEsQ0FBQzRCO1FBRTlDLGlGQUFpRjtRQUNqRixNQUFNWSxrQkFBb0M7WUFDeEN0QyxzRUFBa0JBO1lBQ2xCSCxzRUFBa0JBO1lBQ2xCRSx3RUFBb0JBO1lBQ3BCSCx1RUFBbUJBO1NBQ3BCO1FBQ0QsTUFBTTJDLGVBQWU5QixRQUFRQyxHQUFHLENBQUM4QixnQkFBZ0IsSUFBSS9CLFFBQVFDLEdBQUcsQ0FBQytCLHVCQUF1QjtRQUN4RixJQUFJRixjQUFjO1lBQ2hCRCxnQkFBZ0JJLElBQUksQ0FDbEIvQyx3RUFBb0JBLENBQUM7Z0JBQ25CZ0QsWUFBWWxDLFFBQVFDLEdBQUcsQ0FBQzhCLGdCQUFnQjtnQkFDeENJLGtCQUFrQm5DLFFBQVFDLEdBQUcsQ0FBQytCLHVCQUF1QjtZQUN2RDtRQUVKO1FBQ0EsTUFBTUksV0FBVyxNQUFNbkQsd0RBQVFBLENBQUNvRCxJQUFJLENBQUM7WUFDbkNUO1lBQ0FDO1FBQ0Y7UUFFQSxPQUFPO1lBQUVPO1lBQVVSO1FBQWU7SUFDcEMsRUFBRSxPQUFPVSxPQUFPO1FBQ2QvQixRQUFRK0IsS0FBSyxDQUFDLDZCQUE2QkE7UUFDM0MsTUFBTSxJQUFJQyxNQUFNO0lBQ2xCO0FBQ0YiLCJzb3VyY2VzIjpbIkY6XFx3ZWJcXFN1cnZpdmFsQ0RQXFxzdXJ2aXZhbC5mdW5cXGFwcFxcYXBpXFxhZ2VudFxccHJlcGFyZS1hZ2VudGtpdC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBY3Rpb25Qcm92aWRlcixcbiAgQWdlbnRLaXQsXG4gIGNkcEFwaUFjdGlvblByb3ZpZGVyLFxuICBlcmMyMEFjdGlvblByb3ZpZGVyLFxuICBweXRoQWN0aW9uUHJvdmlkZXIsXG4gIFZpZW1XYWxsZXRQcm92aWRlcixcbiAgd2FsbGV0QWN0aW9uUHJvdmlkZXIsXG4gIFdhbGxldFByb3ZpZGVyLFxuICB3ZXRoQWN0aW9uUHJvdmlkZXIsXG59IGZyb20gXCJAY29pbmJhc2UvYWdlbnRraXRcIjtcbmltcG9ydCBmcyBmcm9tIFwiZnNcIjtcbmltcG9ydCB7IGNyZWF0ZVdhbGxldENsaWVudCwgaHR0cCB9IGZyb20gXCJ2aWVtXCI7XG5pbXBvcnQgeyBnZW5lcmF0ZVByaXZhdGVLZXksIHByaXZhdGVLZXlUb0FjY291bnQgfSBmcm9tIFwidmllbS9hY2NvdW50c1wiO1xuXG4vKipcbiAqIEFnZW50S2l0IEludGVncmF0aW9uIFJvdXRlXG4gKlxuICogVGhpcyBmaWxlIGlzIHlvdXIgZ2F0ZXdheSB0byBpbnRlZ3JhdGluZyBBZ2VudEtpdCB3aXRoIHlvdXIgcHJvZHVjdC5cbiAqIEl0IGRlZmluZXMgdGhlIGNvcmUgY2FwYWJpbGl0aWVzIG9mIHlvdXIgYWdlbnQgdGhyb3VnaCBXYWxsZXRQcm92aWRlclxuICogYW5kIEFjdGlvblByb3ZpZGVyIGNvbmZpZ3VyYXRpb24uXG4gKlxuICogS2V5IENvbXBvbmVudHM6XG4gKiAxLiBXYWxsZXRQcm92aWRlciBTZXR1cDpcbiAqICAgIC0gQ29uZmlndXJlcyB0aGUgYmxvY2tjaGFpbiB3YWxsZXQgaW50ZWdyYXRpb25cbiAqICAgIC0gTGVhcm4gbW9yZTogaHR0cHM6Ly9naXRodWIuY29tL2NvaW5iYXNlL2FnZW50a2l0L3RyZWUvbWFpbi90eXBlc2NyaXB0L2FnZW50a2l0I2V2bS13YWxsZXQtcHJvdmlkZXJzXG4gKlxuICogMi4gQWN0aW9uUHJvdmlkZXJzIFNldHVwOlxuICogICAgLSBEZWZpbmVzIHRoZSBzcGVjaWZpYyBhY3Rpb25zIHlvdXIgYWdlbnQgY2FuIHBlcmZvcm1cbiAqICAgIC0gQ2hvb3NlIGZyb20gYnVpbHQtaW4gcHJvdmlkZXJzIG9yIGNyZWF0ZSBjdXN0b20gb25lczpcbiAqICAgICAgLSBCdWlsdC1pbjogaHR0cHM6Ly9naXRodWIuY29tL2NvaW5iYXNlL2FnZW50a2l0L3RyZWUvbWFpbi90eXBlc2NyaXB0L2FnZW50a2l0I2FjdGlvbi1wcm92aWRlcnNcbiAqICAgICAgLSBDdXN0b206IGh0dHBzOi8vZ2l0aHViLmNvbS9jb2luYmFzZS9hZ2VudGtpdC90cmVlL21haW4vdHlwZXNjcmlwdC9hZ2VudGtpdCNjcmVhdGluZy1hbi1hY3Rpb24tcHJvdmlkZXJcbiAqXG4gKiAjIE5leHQgU3RlcHM6XG4gKiAtIEV4cGxvcmUgdGhlIEFnZW50S2l0IFJFQURNRTogaHR0cHM6Ly9naXRodWIuY29tL2NvaW5iYXNlL2FnZW50a2l0XG4gKiAtIEV4cGVyaW1lbnQgd2l0aCBkaWZmZXJlbnQgTExNIGNvbmZpZ3VyYXRpb25zXG4gKiAtIEZpbmUtdHVuZSBhZ2VudCBwYXJhbWV0ZXJzIGZvciB5b3VyIHVzZSBjYXNlXG4gKlxuICogIyMgV2FudCB0byBjb250cmlidXRlP1xuICogSm9pbiB1cyBpbiBzaGFwaW5nIEFnZW50S2l0ISBDaGVjayBvdXQgdGhlIGNvbnRyaWJ1dGlvbiBndWlkZTpcbiAqIC0gaHR0cHM6Ly9naXRodWIuY29tL2NvaW5iYXNlL2FnZW50a2l0L2Jsb2IvbWFpbi9DT05UUklCVVRJTkcubWRcbiAqIC0gaHR0cHM6Ly9kaXNjb3JkLmdnL0NEUFxuICovXG5cbi8vIENvbmZpZ3VyZSBhIGZpbGUgdG8gcGVyc2lzdCBhIHVzZXIncyBwcml2YXRlIGtleSBpZiBub25lIHByb3ZpZGVkXG5jb25zdCBXQUxMRVRfREFUQV9GSUxFID0gXCJ3YWxsZXRfZGF0YS50eHRcIjtcblxuLyoqXG4gKiBQcmVwYXJlcyB0aGUgQWdlbnRLaXQgYW5kIFdhbGxldFByb3ZpZGVyLlxuICpcbiAqIEBmdW5jdGlvbiBwcmVwYXJlQWdlbnRraXRBbmRXYWxsZXRQcm92aWRlclxuICogQHJldHVybnMge1Byb21pc2U8eyBhZ2VudGtpdDogQWdlbnRLaXQsIHdhbGxldFByb3ZpZGVyOiBXYWxsZXRQcm92aWRlciB9Pn0gVGhlIGluaXRpYWxpemVkIEFJIGFnZW50LlxuICpcbiAqIEBkZXNjcmlwdGlvbiBIYW5kbGVzIGFnZW50IHNldHVwXG4gKlxuICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBhZ2VudCBpbml0aWFsaXphdGlvbiBmYWlscy5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHByZXBhcmVBZ2VudGtpdEFuZFdhbGxldFByb3ZpZGVyKCk6IFByb21pc2U8e1xuICBhZ2VudGtpdDogQWdlbnRLaXQ7XG4gIHdhbGxldFByb3ZpZGVyOiBXYWxsZXRQcm92aWRlcjtcbn0+IHtcbiAgdHJ5IHtcbiAgICAvLyBJbml0aWFsaXplIFdhbGxldFByb3ZpZGVyOiBodHRwczovL2RvY3MuY2RwLmNvaW5iYXNlLmNvbS9hZ2VudGtpdC9kb2NzL3dhbGxldC1tYW5hZ2VtZW50XG4gICAgbGV0IHByaXZhdGVLZXkgPSBwcm9jZXNzLmVudi5QUklWQVRFX0tFWSBhcyBgMHgke3N0cmluZ31gO1xuICAgIGlmICghcHJpdmF0ZUtleSkge1xuICAgICAgaWYgKGZzLmV4aXN0c1N5bmMoV0FMTEVUX0RBVEFfRklMRSkpIHtcbiAgICAgICAgcHJpdmF0ZUtleSA9IEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKFdBTExFVF9EQVRBX0ZJTEUsIFwidXRmOFwiKSkucHJpdmF0ZUtleTtcbiAgICAgICAgY29uc29sZS5pbmZvKFwiRm91bmQgcHJpdmF0ZSBrZXkgaW4gd2FsbGV0X2RhdGEudHh0XCIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcHJpdmF0ZUtleSA9IGdlbmVyYXRlUHJpdmF0ZUtleSgpO1xuICAgICAgICBmcy53cml0ZUZpbGVTeW5jKFdBTExFVF9EQVRBX0ZJTEUsIEpTT04uc3RyaW5naWZ5KHsgcHJpdmF0ZUtleSB9KSk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ3JlYXRlZCBuZXcgcHJpdmF0ZSBrZXkgYW5kIHNhdmVkIHRvIHdhbGxldF9kYXRhLnR4dFwiKTtcbiAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgXCJXZSByZWNvbW1lbmQgeW91IHNhdmUgdGhpcyBwcml2YXRlIGtleSB0byB5b3VyIC5lbnYgZmlsZSBhbmQgZGVsZXRlIHdhbGxldF9kYXRhLnR4dCBhZnRlcndhcmRzLlwiLFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBhY2NvdW50ID0gcHJpdmF0ZUtleVRvQWNjb3VudChwcml2YXRlS2V5KTtcblxuICAgIGNvbnN0IHJwY1VybCA9IHByb2Nlc3MuZW52LlJQQ19VUkwgYXMgc3RyaW5nO1xuICAgIGNvbnN0IGNoYWluSWQgPSBwcm9jZXNzLmVudi5DSEFJTl9JRCBhcyBzdHJpbmc7XG4gICAgY29uc3QgY2xpZW50ID0gY3JlYXRlV2FsbGV0Q2xpZW50KHtcbiAgICAgIGFjY291bnQsXG4gICAgICAvLyBDdXN0b21pemUgdGhlIGNoYWluIG1ldGFkYXRhIHRvIG1hdGNoIHlvdXIgY3VzdG9tIGNoYWluXG4gICAgICBjaGFpbjoge1xuICAgICAgICBpZDogcGFyc2VJbnQoY2hhaW5JZCksXG4gICAgICAgIHJwY1VybHM6IHtcbiAgICAgICAgICBkZWZhdWx0OiB7XG4gICAgICAgICAgICBodHRwOiBbcnBjVXJsXSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBuYW1lOiBcIkN1c3RvbSBDaGFpblwiLFxuICAgICAgICBuYXRpdmVDdXJyZW5jeToge1xuICAgICAgICAgIG5hbWU6IFwiRXRoZXJcIixcbiAgICAgICAgICBzeW1ib2w6IFwiRVRIXCIsXG4gICAgICAgICAgZGVjaW1hbHM6IDE4LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHRyYW5zcG9ydDogaHR0cCgpLFxuICAgIH0pO1xuICAgIGNvbnN0IHdhbGxldFByb3ZpZGVyID0gbmV3IFZpZW1XYWxsZXRQcm92aWRlcihjbGllbnQpO1xuXG4gICAgLy8gSW5pdGlhbGl6ZSBBZ2VudEtpdDogaHR0cHM6Ly9kb2NzLmNkcC5jb2luYmFzZS5jb20vYWdlbnRraXQvZG9jcy9hZ2VudC1hY3Rpb25zXG4gICAgY29uc3QgYWN0aW9uUHJvdmlkZXJzOiBBY3Rpb25Qcm92aWRlcltdID0gW1xuICAgICAgd2V0aEFjdGlvblByb3ZpZGVyKCksXG4gICAgICBweXRoQWN0aW9uUHJvdmlkZXIoKSxcbiAgICAgIHdhbGxldEFjdGlvblByb3ZpZGVyKCksXG4gICAgICBlcmMyMEFjdGlvblByb3ZpZGVyKCksXG4gICAgXTtcbiAgICBjb25zdCBjYW5Vc2VDZHBBcGkgPSBwcm9jZXNzLmVudi5DRFBfQVBJX0tFWV9OQU1FICYmIHByb2Nlc3MuZW52LkNEUF9BUElfS0VZX1BSSVZBVEVfS0VZO1xuICAgIGlmIChjYW5Vc2VDZHBBcGkpIHtcbiAgICAgIGFjdGlvblByb3ZpZGVycy5wdXNoKFxuICAgICAgICBjZHBBcGlBY3Rpb25Qcm92aWRlcih7XG4gICAgICAgICAgYXBpS2V5TmFtZTogcHJvY2Vzcy5lbnYuQ0RQX0FQSV9LRVlfTkFNRSxcbiAgICAgICAgICBhcGlLZXlQcml2YXRlS2V5OiBwcm9jZXNzLmVudi5DRFBfQVBJX0tFWV9QUklWQVRFX0tFWSxcbiAgICAgICAgfSksXG4gICAgICApO1xuICAgIH1cbiAgICBjb25zdCBhZ2VudGtpdCA9IGF3YWl0IEFnZW50S2l0LmZyb20oe1xuICAgICAgd2FsbGV0UHJvdmlkZXIsXG4gICAgICBhY3Rpb25Qcm92aWRlcnMsXG4gICAgfSk7XG5cbiAgICByZXR1cm4geyBhZ2VudGtpdCwgd2FsbGV0UHJvdmlkZXIgfTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgaW5pdGlhbGl6aW5nIGFnZW50OlwiLCBlcnJvcik7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiRmFpbGVkIHRvIGluaXRpYWxpemUgYWdlbnRcIik7XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJBZ2VudEtpdCIsImNkcEFwaUFjdGlvblByb3ZpZGVyIiwiZXJjMjBBY3Rpb25Qcm92aWRlciIsInB5dGhBY3Rpb25Qcm92aWRlciIsIlZpZW1XYWxsZXRQcm92aWRlciIsIndhbGxldEFjdGlvblByb3ZpZGVyIiwid2V0aEFjdGlvblByb3ZpZGVyIiwiZnMiLCJjcmVhdGVXYWxsZXRDbGllbnQiLCJodHRwIiwiZ2VuZXJhdGVQcml2YXRlS2V5IiwicHJpdmF0ZUtleVRvQWNjb3VudCIsIldBTExFVF9EQVRBX0ZJTEUiLCJwcmVwYXJlQWdlbnRraXRBbmRXYWxsZXRQcm92aWRlciIsInByaXZhdGVLZXkiLCJwcm9jZXNzIiwiZW52IiwiUFJJVkFURV9LRVkiLCJleGlzdHNTeW5jIiwiSlNPTiIsInBhcnNlIiwicmVhZEZpbGVTeW5jIiwiY29uc29sZSIsImluZm8iLCJ3cml0ZUZpbGVTeW5jIiwic3RyaW5naWZ5IiwibG9nIiwiYWNjb3VudCIsInJwY1VybCIsIlJQQ19VUkwiLCJjaGFpbklkIiwiQ0hBSU5fSUQiLCJjbGllbnQiLCJjaGFpbiIsImlkIiwicGFyc2VJbnQiLCJycGNVcmxzIiwiZGVmYXVsdCIsIm5hbWUiLCJuYXRpdmVDdXJyZW5jeSIsInN5bWJvbCIsImRlY2ltYWxzIiwidHJhbnNwb3J0Iiwid2FsbGV0UHJvdmlkZXIiLCJhY3Rpb25Qcm92aWRlcnMiLCJjYW5Vc2VDZHBBcGkiLCJDRFBfQVBJX0tFWV9OQU1FIiwiQ0RQX0FQSV9LRVlfUFJJVkFURV9LRVkiLCJwdXNoIiwiYXBpS2V5TmFtZSIsImFwaUtleVByaXZhdGVLZXkiLCJhZ2VudGtpdCIsImZyb20iLCJlcnJvciIsIkVycm9yIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/agent/prepare-agentkit.ts\n");

/***/ }),

/***/ "(rsc)/./app/api/agent/route.ts":
/*!********************************!*\
  !*** ./app/api/agent/route.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _create_agent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./create-agent */ \"(rsc)/./app/api/agent/create-agent.ts\");\n/* harmony import */ var ai__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ai */ \"(rsc)/./node_modules/@ai-sdk/provider-utils/dist/index.mjs\");\n/* harmony import */ var ai__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ai */ \"(rsc)/./node_modules/ai/dist/index.mjs\");\n\n\n\nconst messages = [];\n/**\n * Handles incoming POST requests to interact with the AgentKit-powered AI agent.\n * This function processes user messages and streams responses from the agent.\n *\n * @function POST\n * @param {Request & { json: () => Promise<AgentRequest> }} req - The incoming request object containing the user message.\n * @returns {Promise<NextResponse<AgentResponse>>} JSON response containing the AI-generated reply or an error message.\n *\n * @description Sends a single message to the agent and returns the agents' final response.\n *\n * @example\n * const response = await fetch(\"/api/agent\", {\n *     method: \"POST\",\n *     headers: { \"Content-Type\": \"application/json\" },\n *     body: JSON.stringify({ userMessage: input }),\n * });\n */ async function POST(req) {\n    try {\n        // 1️. Extract user message from the request body\n        const { userMessage } = await req.json();\n        // 2. Get the agent\n        const agent = await (0,_create_agent__WEBPACK_IMPORTED_MODULE_1__.createAgent)();\n        // 3.Start streaming the agent's response\n        messages.push({\n            id: (0,ai__WEBPACK_IMPORTED_MODULE_2__.generateId)(),\n            role: \"user\",\n            content: userMessage\n        });\n        const { text } = await (0,ai__WEBPACK_IMPORTED_MODULE_3__.generateText)({\n            ...agent,\n            messages\n        });\n        // 4. Add the agent's response to the messages\n        messages.push({\n            id: (0,ai__WEBPACK_IMPORTED_MODULE_2__.generateId)(),\n            role: \"assistant\",\n            content: text\n        });\n        // 5️. Return the final response\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            response: text\n        });\n    } catch (error) {\n        console.error(\"Error processing request:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Failed to process message\"\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2FnZW50L3JvdXRlLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQzJDO0FBQ0U7QUFDVTtBQUV2RCxNQUFNSSxXQUFzQixFQUFFO0FBRTlCOzs7Ozs7Ozs7Ozs7Ozs7O0NBZ0JDLEdBQ00sZUFBZUMsS0FDcEJDLEdBQW9EO0lBRXBELElBQUk7UUFDRixpREFBaUQ7UUFDakQsTUFBTSxFQUFFQyxXQUFXLEVBQUUsR0FBRyxNQUFNRCxJQUFJRSxJQUFJO1FBRXRDLG1CQUFtQjtRQUNuQixNQUFNQyxRQUFRLE1BQU1SLDBEQUFXQTtRQUUvQix5Q0FBeUM7UUFDekNHLFNBQVNNLElBQUksQ0FBQztZQUFFQyxJQUFJVCw4Q0FBVUE7WUFBSVUsTUFBTTtZQUFRQyxTQUFTTjtRQUFZO1FBQ3JFLE1BQU0sRUFBRU8sSUFBSSxFQUFFLEdBQUcsTUFBTVgsZ0RBQVlBLENBQUM7WUFDbEMsR0FBR00sS0FBSztZQUNSTDtRQUNGO1FBRUEsOENBQThDO1FBQzlDQSxTQUFTTSxJQUFJLENBQUM7WUFBRUMsSUFBSVQsOENBQVVBO1lBQUlVLE1BQU07WUFBYUMsU0FBU0M7UUFBSztRQUVuRSxnQ0FBZ0M7UUFDaEMsT0FBT2QscURBQVlBLENBQUNRLElBQUksQ0FBQztZQUFFTyxVQUFVRDtRQUFLO0lBQzVDLEVBQUUsT0FBT0UsT0FBTztRQUNkQyxRQUFRRCxLQUFLLENBQUMsNkJBQTZCQTtRQUMzQyxPQUFPaEIscURBQVlBLENBQUNRLElBQUksQ0FBQztZQUFFUSxPQUFPO1FBQTRCO0lBQ2hFO0FBQ0YiLCJzb3VyY2VzIjpbIkY6XFx3ZWJcXFN1cnZpdmFsQ0RQXFxzdXJ2aXZhbC5mdW5cXGFwcFxcYXBpXFxhZ2VudFxccm91dGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWdlbnRSZXF1ZXN0LCBBZ2VudFJlc3BvbnNlIH0gZnJvbSBcIkAvYXBwL3R5cGVzL2FwaVwiO1xuaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSBcIm5leHQvc2VydmVyXCI7XG5pbXBvcnQgeyBjcmVhdGVBZ2VudCB9IGZyb20gXCIuL2NyZWF0ZS1hZ2VudFwiO1xuaW1wb3J0IHsgTWVzc2FnZSwgZ2VuZXJhdGVJZCwgZ2VuZXJhdGVUZXh0IH0gZnJvbSBcImFpXCI7XG5cbmNvbnN0IG1lc3NhZ2VzOiBNZXNzYWdlW10gPSBbXTtcblxuLyoqXG4gKiBIYW5kbGVzIGluY29taW5nIFBPU1QgcmVxdWVzdHMgdG8gaW50ZXJhY3Qgd2l0aCB0aGUgQWdlbnRLaXQtcG93ZXJlZCBBSSBhZ2VudC5cbiAqIFRoaXMgZnVuY3Rpb24gcHJvY2Vzc2VzIHVzZXIgbWVzc2FnZXMgYW5kIHN0cmVhbXMgcmVzcG9uc2VzIGZyb20gdGhlIGFnZW50LlxuICpcbiAqIEBmdW5jdGlvbiBQT1NUXG4gKiBAcGFyYW0ge1JlcXVlc3QgJiB7IGpzb246ICgpID0+IFByb21pc2U8QWdlbnRSZXF1ZXN0PiB9fSByZXEgLSBUaGUgaW5jb21pbmcgcmVxdWVzdCBvYmplY3QgY29udGFpbmluZyB0aGUgdXNlciBtZXNzYWdlLlxuICogQHJldHVybnMge1Byb21pc2U8TmV4dFJlc3BvbnNlPEFnZW50UmVzcG9uc2U+Pn0gSlNPTiByZXNwb25zZSBjb250YWluaW5nIHRoZSBBSS1nZW5lcmF0ZWQgcmVwbHkgb3IgYW4gZXJyb3IgbWVzc2FnZS5cbiAqXG4gKiBAZGVzY3JpcHRpb24gU2VuZHMgYSBzaW5nbGUgbWVzc2FnZSB0byB0aGUgYWdlbnQgYW5kIHJldHVybnMgdGhlIGFnZW50cycgZmluYWwgcmVzcG9uc2UuXG4gKlxuICogQGV4YW1wbGVcbiAqIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXCIvYXBpL2FnZW50XCIsIHtcbiAqICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICogICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSxcbiAqICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IHVzZXJNZXNzYWdlOiBpbnB1dCB9KSxcbiAqIH0pO1xuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUE9TVChcbiAgcmVxOiBSZXF1ZXN0ICYgeyBqc29uOiAoKSA9PiBQcm9taXNlPEFnZW50UmVxdWVzdD4gfSxcbik6IFByb21pc2U8TmV4dFJlc3BvbnNlPEFnZW50UmVzcG9uc2U+PiB7XG4gIHRyeSB7XG4gICAgLy8gMe+4jy4gRXh0cmFjdCB1c2VyIG1lc3NhZ2UgZnJvbSB0aGUgcmVxdWVzdCBib2R5XG4gICAgY29uc3QgeyB1c2VyTWVzc2FnZSB9ID0gYXdhaXQgcmVxLmpzb24oKTtcblxuICAgIC8vIDIuIEdldCB0aGUgYWdlbnRcbiAgICBjb25zdCBhZ2VudCA9IGF3YWl0IGNyZWF0ZUFnZW50KCk7XG5cbiAgICAvLyAzLlN0YXJ0IHN0cmVhbWluZyB0aGUgYWdlbnQncyByZXNwb25zZVxuICAgIG1lc3NhZ2VzLnB1c2goeyBpZDogZ2VuZXJhdGVJZCgpLCByb2xlOiBcInVzZXJcIiwgY29udGVudDogdXNlck1lc3NhZ2UgfSk7XG4gICAgY29uc3QgeyB0ZXh0IH0gPSBhd2FpdCBnZW5lcmF0ZVRleHQoe1xuICAgICAgLi4uYWdlbnQsXG4gICAgICBtZXNzYWdlcyxcbiAgICB9KTtcblxuICAgIC8vIDQuIEFkZCB0aGUgYWdlbnQncyByZXNwb25zZSB0byB0aGUgbWVzc2FnZXNcbiAgICBtZXNzYWdlcy5wdXNoKHsgaWQ6IGdlbmVyYXRlSWQoKSwgcm9sZTogXCJhc3Npc3RhbnRcIiwgY29udGVudDogdGV4dCB9KTtcblxuICAgIC8vIDXvuI8uIFJldHVybiB0aGUgZmluYWwgcmVzcG9uc2VcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyByZXNwb25zZTogdGV4dCB9KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgcHJvY2Vzc2luZyByZXF1ZXN0OlwiLCBlcnJvcik7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IFwiRmFpbGVkIHRvIHByb2Nlc3MgbWVzc2FnZVwiIH0pO1xuICB9XG59XG4iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwiY3JlYXRlQWdlbnQiLCJnZW5lcmF0ZUlkIiwiZ2VuZXJhdGVUZXh0IiwibWVzc2FnZXMiLCJQT1NUIiwicmVxIiwidXNlck1lc3NhZ2UiLCJqc29uIiwiYWdlbnQiLCJwdXNoIiwiaWQiLCJyb2xlIiwiY29udGVudCIsInRleHQiLCJyZXNwb25zZSIsImVycm9yIiwiY29uc29sZSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/agent/route.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fagent%2Froute&page=%2Fapi%2Fagent%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fagent%2Froute.ts&appDir=F%3A%5Cweb%5CSurvivalCDP%5Csurvival.fun%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=F%3A%5Cweb%5CSurvivalCDP%5Csurvival.fun&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fagent%2Froute&page=%2Fapi%2Fagent%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fagent%2Froute.ts&appDir=F%3A%5Cweb%5CSurvivalCDP%5Csurvival.fun%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=F%3A%5Cweb%5CSurvivalCDP%5Csurvival.fun&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var F_web_SurvivalCDP_survival_fun_app_api_agent_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/agent/route.ts */ \"(rsc)/./app/api/agent/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/agent/route\",\n        pathname: \"/api/agent\",\n        filename: \"route\",\n        bundlePath: \"app/api/agent/route\"\n    },\n    resolvedPagePath: \"F:\\\\web\\\\SurvivalCDP\\\\survival.fun\\\\app\\\\api\\\\agent\\\\route.ts\",\n    nextConfigOutput,\n    userland: F_web_SurvivalCDP_survival_fun_app_api_agent_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZhZ2VudCUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGYWdlbnQlMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZhZ2VudCUyRnJvdXRlLnRzJmFwcERpcj1GJTNBJTVDd2ViJTVDU3Vydml2YWxDRFAlNUNzdXJ2aXZhbC5mdW4lNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUYlM0ElNUN3ZWIlNUNTdXJ2aXZhbENEUCU1Q3N1cnZpdmFsLmZ1biZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDYTtBQUMxRjtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiRjpcXFxcd2ViXFxcXFN1cnZpdmFsQ0RQXFxcXHN1cnZpdmFsLmZ1blxcXFxhcHBcXFxcYXBpXFxcXGFnZW50XFxcXHJvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9hZ2VudC9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2FnZW50XCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9hZ2VudC9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIkY6XFxcXHdlYlxcXFxTdXJ2aXZhbENEUFxcXFxzdXJ2aXZhbC5mdW5cXFxcYXBwXFxcXGFwaVxcXFxhZ2VudFxcXFxyb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fagent%2Froute&page=%2Fapi%2Fagent%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fagent%2Froute.ts&appDir=F%3A%5Cweb%5CSurvivalCDP%5Csurvival.fun%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=F%3A%5Cweb%5CSurvivalCDP%5Csurvival.fun&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ "net":
/*!**********************!*\
  !*** external "net" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("net");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "node:buffer":
/*!******************************!*\
  !*** external "node:buffer" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:buffer");

/***/ }),

/***/ "node:crypto":
/*!******************************!*\
  !*** external "node:crypto" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:crypto");

/***/ }),

/***/ "node:events":
/*!******************************!*\
  !*** external "node:events" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:events");

/***/ }),

/***/ "node:fs":
/*!**************************!*\
  !*** external "node:fs" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:fs");

/***/ }),

/***/ "node:http":
/*!****************************!*\
  !*** external "node:http" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:http");

/***/ }),

/***/ "node:https":
/*!*****************************!*\
  !*** external "node:https" ***!
  \*****************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:https");

/***/ }),

/***/ "node:net":
/*!***************************!*\
  !*** external "node:net" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:net");

/***/ }),

/***/ "node:path":
/*!****************************!*\
  !*** external "node:path" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:path");

/***/ }),

/***/ "node:process":
/*!*******************************!*\
  !*** external "node:process" ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:process");

/***/ }),

/***/ "node:stream":
/*!******************************!*\
  !*** external "node:stream" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:stream");

/***/ }),

/***/ "node:stream/web":
/*!**********************************!*\
  !*** external "node:stream/web" ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:stream/web");

/***/ }),

/***/ "node:url":
/*!***************************!*\
  !*** external "node:url" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:url");

/***/ }),

/***/ "node:util":
/*!****************************!*\
  !*** external "node:util" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:util");

/***/ }),

/***/ "node:zlib":
/*!****************************!*\
  !*** external "node:zlib" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:zlib");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ "punycode":
/*!***************************!*\
  !*** external "punycode" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("punycode");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "tls":
/*!**********************!*\
  !*** external "tls" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("tls");

/***/ }),

/***/ "tty":
/*!**********************!*\
  !*** external "tty" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("tty");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ "worker_threads":
/*!*********************************!*\
  !*** external "worker_threads" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("worker_threads");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/viem","vendor-chunks/@noble","vendor-chunks/ox","vendor-chunks/abitype","vendor-chunks/isows","vendor-chunks/next","vendor-chunks/ws","vendor-chunks/@coinbase","vendor-chunks/@solana","vendor-chunks/tr46","vendor-chunks/bn.js","vendor-chunks/@adraffy","vendor-chunks/node-fetch-native","vendor-chunks/@opentelemetry","vendor-chunks/node-fetch","vendor-chunks/whatwg-url","vendor-chunks/debug","vendor-chunks/eventemitter3","vendor-chunks/node-gyp-build","vendor-chunks/webidl-conversions","vendor-chunks/secure-json-parse","vendor-chunks/ms","vendor-chunks/supports-color","vendor-chunks/utf-8-validate","vendor-chunks/safe-buffer","vendor-chunks/bufferutil","vendor-chunks/inherits","vendor-chunks/has-flag","vendor-chunks/@privy-io","vendor-chunks/ethers","vendor-chunks/svix","vendor-chunks/@opensea","vendor-chunks/jose","vendor-chunks/zod-to-json-schema","vendor-chunks/twitter-api-v2","vendor-chunks/libphonenumber-js","vendor-chunks/crypto-js","vendor-chunks/opensea-js","vendor-chunks/jayson","vendor-chunks/elliptic","vendor-chunks/@scure","vendor-chunks/hash.js","vendor-chunks/zod","vendor-chunks/asynckit","vendor-chunks/aes-js","vendor-chunks/math-intrinsics","vendor-chunks/merkletreejs","vendor-chunks/es-errors","vendor-chunks/@ai-sdk","vendor-chunks/rpc-websockets","vendor-chunks/secp256k1","vendor-chunks/call-bind-apply-helpers","vendor-chunks/get-proto","vendor-chunks/borsh","vendor-chunks/nanoid","vendor-chunks/ts-case-convert","vendor-chunks/mime-db","vendor-chunks/md5","vendor-chunks/has-symbols","vendor-chunks/gopd","vendor-chunks/function-bind","vendor-chunks/form-data","vendor-chunks/follow-redirects","vendor-chunks/ai","vendor-chunks/@alloralabs","vendor-chunks/superstruct","vendor-chunks/@jup-ag","vendor-chunks/reflect-metadata","vendor-chunks/axios","vendor-chunks/axios-retry","vendor-chunks/tweetnacl","vendor-chunks/treeify","vendor-chunks/text-encoding-utf-8","vendor-chunks/svix-fetch","vendor-chunks/redaxios","vendor-chunks/proxy-from-env","vendor-chunks/minimalistic-crypto-utils","vendor-chunks/minimalistic-assert","vendor-chunks/mime-types","vendor-chunks/is-retry-allowed","vendor-chunks/hmac-drbg","vendor-chunks/hasown","vendor-chunks/has-tostringtag","vendor-chunks/get-intrinsic","vendor-chunks/fast-sha256","vendor-chunks/es-set-tostringtag","vendor-chunks/es-object-atoms","vendor-chunks/es-define-property","vendor-chunks/ed2curve","vendor-chunks/dunder-proto","vendor-chunks/delayed-stream","vendor-chunks/decimal.js","vendor-chunks/crypt","vendor-chunks/combined-stream","vendor-chunks/charenc","vendor-chunks/canonicalize","vendor-chunks/buffer-reverse","vendor-chunks/brorand","vendor-chunks/@stablelib"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fagent%2Froute&page=%2Fapi%2Fagent%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fagent%2Froute.ts&appDir=F%3A%5Cweb%5CSurvivalCDP%5Csurvival.fun%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=F%3A%5Cweb%5CSurvivalCDP%5Csurvival.fun&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();