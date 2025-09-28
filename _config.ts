import lume from "lume/mod.ts";
import lightningCSS from "lume/plugins/lightningcss.ts";


const site = lume({
  src: "./src",
  dest: "./docs",
  location: new URL("https://www.corunajug.org/"),
  jsFile: "/js/script.js",
  cssFile: "/css/styles.css"
});

site.add("css");
site.add("img");
site.add("CNAME");
site.use(lightningCSS());

export default site;
