/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DATA_MODE: "local" | "remote";
  readonly VITE_GRAPHQL_ENDPOINT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
