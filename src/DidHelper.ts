import { DID } from "dids";
import type { IDX } from "@ceramicstudio/idx";
import type { CeramicApi } from "@ceramicnetwork/common";
import ThreeIdResolver from "@ceramicnetwork/3id-did-resolver";
import { BasicProfile } from "@datamodels/identity-profile-basic";
import KeyDidResolver from "key-did-resolver";
import { AccountID } from "caip";
import { createCeramic } from "./ceramic";
import { createIDX } from "./Idx";
import { getProvider } from "./Wallet";

// Commented out for using glazed. Note: glaze did not quite work.
// import type { Manager } from '@3id/manager';
// import { DIDDataStore } from "@glazed/did-datastore";
// import { model as basicProfileModel } from '@datamodels/identity-profile-basic'
// import { model as cryptoAccountsModel } from '@datamodels/identity-accounts-crypto'
// import { model as webAccountsModel } from '@datamodels/identity-accounts-web'

declare global {
  interface Window {
    did?: DID;
    idx?: IDX;
    ceramic?: CeramicApi;
  }
}

export type DIDData = {
  accounts: Array<AccountID>;
  profile: BasicProfile | null;
};
export type DIDsData = Record<string, DIDData>;

const ceramicPromise = createCeramic();

export async function authenticateUser(): Promise<string> {
  const [ceramic, provider] = await Promise.all([
    ceramicPromise,
    getProvider(),
  ]);
  const did = new DID({
    provider,
    resolver: {
      ...KeyDidResolver.getResolver(),
      ...ThreeIdResolver.getResolver(ceramic),
    },
  });
  await did.authenticate();
  window.did = did;
  ceramic.did = did;
  window.ceramic = ceramic;
  const idx = createIDX(ceramic);
  return idx.id;
}

export async function ethAddressToDID(address: string): Promise<string> {
  const caip10Doc = await window.ceramic?.createDocument("caip10-link", {
    metadata: {
      family: "caip10-link",
      controllers: [address.toLowerCase() + "@eip155:1"],
    },
  });
  return caip10Doc?.content;
}

export const updateProfile = async () => {
  const name = "victor fei";
  const description = "Founder @ Ormi Finance";
  await window.idx?.set("basicProfile", { name, description });
};

export const getProfile = async (): Promise<BasicProfile | null> => {
  try {
    return (await window.idx?.get<BasicProfile>("basicProfile")) ?? null;
  } catch (err) {
    return null;
  }
};

// Commented out for using glaze
// export const getProfile2 = async (
//   did: string
// ): Promise<BasicProfile | null> => {
//   try {
//     if (window.ceramic !== undefined) {
//     const dataStore :DIDDataStore = new DIDDataStore(
//        {window.ceramic, BasicProfile});
//     return await dataStore.get("basicProfile", did);
//     }
//     return null;
//   } catch (err) {
//     return null;
//   }
// };

// export async function getDIDsData(manager: Manager): Promise<DIDsData> {
//   const dataStore = manager.dataStore
//   const dids = (await manager.listDIDS()) ?? []
//   const entries = await Promise.all(
//     dids.map(async (did:string) => {
//       const accountsObj = await dataStore.get('cryptoAccounts', did)
//       const accounts = accountsObj ? Object.keys(accountsObj) : []
//       return {
//         did,
//         accounts: accounts.map((account) => new AccountID(account)),
//         profile: await getProfile2(did, dataStore),
//       }
//     })
//   )
//   return entries.reduce((acc, { did, ...entry }) => {
//     acc[did] = entry
//     return acc
//   }, {} as DIDsData)
// }
// fold in with react components.
// const updateProfile = async () => {
//   const name = (document.getElementById('name') as HTMLInputElement).value
//   const description = (document.getElementById('description') as HTMLInputElement).value
//   await window.idx?.set('basicProfile', { name, description })
// }
