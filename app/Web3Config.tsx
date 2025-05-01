import { cookieStorage, createStorage } from '@wagmi/core'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { baseSepolia } from '@reown/appkit/networks'

// Get projectId from https://cloud.reown.com
export const projectId = '48d0600b40c62dbdd017ffb85ad8bf90'

if (!projectId) {
  throw new Error('Project ID is not defined')
}

export const networks = [baseSepolia]

//Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage
  }),
  ssr: true,
  projectId,
  networks
})

export const config = wagmiAdapter.wagmiConfig