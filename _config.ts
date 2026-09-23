import lume from "lume/mod.ts";
import lightningCSS from "lume/plugins/lightningcss.ts";
import date from "lume/plugins/date.ts";
import search from "lume/plugins/search.ts";

const site = lume({
  src: "./src",
  dest: "./docs",
  location: new URL("https://www.corunajug.org/"),
  jsFile: "/js/script.js",
  cssFile: "/css/styles.css"
});

site.add("css");
site.add("img");
site.add("js");
site.add("CNAME", "CNAME");
site.use(lightningCSS());
site.use(date());
site.use(search());

// Slides live as individual pages (type: slide) so `search` can list them
// in order for the /presentacion/ layout, but they have no standalone
// page of their own — drop their generated files after each build.
site.addEventListener("afterBuild", async () => {
  await Deno.remove(site.dest("presentacion/slides"), { recursive: true })
    .catch(() => {});
});

export default site;
