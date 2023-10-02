import { watch } from "https://deno.land/x/denon/mod.ts";

watch({
  files: ["src/**/*.ts"],
  command: "deno run --allow-net src/main.ts",
});
