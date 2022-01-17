import { DID } from 'dids'
import type { IDX } from '@ceramicstudio/idx'
import type { CeramicApi } from '@ceramicnetwork/common'
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver'
import type { BasicProfile }  from '@datamodels/identity-profile-basic'
import KeyDidResolver from 'key-did-resolver'

import { createCeramic } from './ceramic'
import { createIDX } from './Idx'
import { getProvider } from './Wallet'

// import { model as basicProfileModel } from '@datamodels/identity-profile-basic'
// import { model as cryptoAccountsModel } from '@datamodels/identity-accounts-crypto'
// import { model as webAccountsModel } from '@datamodels/identity-accounts-web'

declare global {
  interface Window {
    did?: DID
    idx?: IDX
    ceramic?: CeramicApi
  }
}

// interface IUserProfile {
//   name: string
//   description: string
// }

const ceramicPromise = createCeramic()

export async function authenticateUser() : Promise<string> {
  const [ceramic, provider] = await Promise.all([ceramicPromise, getProvider()])
  const did = new DID({
    provider,
    resolver: { ...KeyDidResolver.getResolver(), ...ThreeIdResolver.getResolver(ceramic) },
  })
  await did.authenticate()
  window.did = did
  ceramic.did = did
  const idx = createIDX(ceramic)
  return idx.id
}

export async function ethAddressToDID(address: string): Promise<string> {
  const caip10Doc = await window.ceramic?.createDocument('caip10-link', {
    metadata: {
      family: 'caip10-link',
      controllers: [address.toLowerCase() + '@eip155:1'],
    },
  })
  return caip10Doc?.content
}

export const updateProfile = async () => {
  const name = "victor fei";
  const description = "Founder @ Ormi Finance";
  await window.idx?.set('basicProfile', { name, description })
}

export const getProfile = async () : Promise<BasicProfile | null> => {
  try {
    return await window.idx?.get<BasicProfile>('basicProfile') ?? null;
  } catch (err) {
    return null
  }
}

// fold in with react components.
// const updateProfile = async () => {
//   const name = (document.getElementById('name') as HTMLInputElement).value
//   const description = (document.getElementById('description') as HTMLInputElement).value
//   await window.idx?.set('basicProfile', { name, description })
// }