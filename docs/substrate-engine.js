// TNOPSI / DSLO Substrate Engine (v0.1 minimal)
// Loads manifest + corpus index and exposes a deterministic initialization payload.

async function loadJSON(path) {
    const response = await fetch(path);
    if (!response.ok) {
        throw new Error(`Failed to load ${path}`);
    }
    return await response.json();
}

async function initializeSubstrate() {
    const manifest = await loadJSON("manifest.json");
    const corpusIndex = await loadJSON("corpus/index.json");

    return {
        schema_version: manifest.schema_version,
        manifold_id: manifest.manifold_id,
        invariants: manifest.invariants,
        corpus: corpusIndex,
        initialized_at: new Date().toISOString()
    };
}

// Expose globally for crawlers and deterministic clients
window.DSLO_Substrate = {
    initialize: initializeSubstrate,
    fetchInit: async function() {
        const init = await loadJSON("init.json");
        const manifest = await loadJSON(init.manifest);
        const corpusIndex = await loadJSON(init.corpus_index);

        return {
            schema_version: manifest.schema_version,
            manifold_id: manifest.manifold_id,
            invariants: manifest.invariants,
            corpus: corpusIndex,
            initialized_at: new Date().toISOString()
        };
    }
};
