import lume from "lume/mod.ts";
import lightningCSS from "lume/plugins/lightningcss.ts";
import date from "lume/plugins/date.ts";

const site = lume({
  src: "./src",
  dest: "./docs",
  location: new URL("https://www.corunajug.org/"),
  jsFile: "/js/script.js",
  cssFile: "/css/styles.css"
});

site.add("css");
site.add("img");
site.add("CNAME", "CNAME");
site.use(lightningCSS());
site.use(date());

export default site;
