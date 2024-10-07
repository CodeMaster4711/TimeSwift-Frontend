import sveltePreprocess from "svelte-preprocess"
import adapter from "@sveltejs/adapter-static"
//import node from "@sveltejs/adapter-node";

//const dev = process.env.NODE_ENV == "development"

const config = {
    preprocess: sveltePreprocess(),
  
    kit: {
      // Adapter und andere Kit-spezifische Konfigurationen
      adapter: adapter(),
        // Adapter-Konfiguration
    }
  };
  
  export default config;