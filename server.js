import { tsImport } from "tsx/esm/api";

await tsImport("./server/src/index.ts", import.meta.url);
