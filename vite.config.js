import { defineConfig } from 'vite';
import { config } from './src/config.js';
function sitemapPlugin(){return{name:'configured-sitemap',generateBundle(){const raw=config.seo.siteUrl.trim();if(!raw)return;let parsed;try{parsed=new URL(raw)}catch{return}if(!['http:','https:'].includes(parsed.protocol))return;const base=parsed.origin.replace(/\/+$/,'');const xml='<?xml version="1.0" encoding="UTF-8"?>'+'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>'+base+'/</loc></url></urlset>';this.emitFile({type:'asset',fileName:'sitemap.xml',source:xml})}}}
export default defineConfig({base:'/',plugins:[sitemapPlugin()]});
