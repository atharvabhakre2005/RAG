import { ChromaClient } from "chromadb";
import { embed } from "./geminiClient.js";

const client = new ChromaClient({ path: "http://localhost:8000" });
const COLLECTION = "debugger";

let collection;

async function getCollection() {
  if (!collection) {
    collection = await client.getOrCreateCollection({
      name: COLLECTION,
      metadata: { description: "Error logs + fixes" }
    });
  }
  return collection;
}

export async function addDoc(id, text, metadata = {}) {
  const coll = await getCollection();
  const embedding = await embed(text);
  await coll.add({
    ids: [id],
    embeddings: [embedding],
    documents: [text],
    metadatas: [metadata]
  });
}

export async function querySimilarDocs(text, topK = 3) {
  const coll = await getCollection();
  const embedding = await embed(text);
  const results = await coll.query({
    queryEmbeddings: [embedding],
    nResults: topK
  });

  return (
    results.documents?.[0]?.map((doc, i) => ({
      doc,
      metadata: results.metadatas?.[0]?.[i] || {},
      score: results.distances?.[0]?.[i] || null
    })) || []
  );
}
