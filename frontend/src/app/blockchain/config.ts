import { http, createConfig } from 'wagmi'
import { optimismSepolia } from 'wagmi/chains'
import { walletConnect } from 'wagmi/connectors'

const projectId = '7f989ece2fff9df5ec1515c1107d5197'

export const config = createConfig({
  chains: [optimismSepolia],
  connectors: [
    walletConnect({ projectId })
  ],
  transports: {
    [optimismSepolia.id]: http()
  },
})
