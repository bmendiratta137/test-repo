import './polyfills.server.mjs';
import{a as l,b as n,c as e,d as o,e as r,f as a,m as c,o as p,p as g,s as m,w as d,z as s}from"./chunk-C6BOOMRN.mjs";var h=(()=>{class t{constructor(){this.title="video-app"}static{this.\u0275fac=function(i){return new(i||t)}}static{this.\u0275cmp=l({type:t,selectors:[["app-root"]],standalone:!0,features:[a],decls:12,vars:0,consts:[[1,"main"],[1,"video-container"],["id","video1","controls","","preload","auto","width","640","height","264"],["src","../assets/videos/video1.mp4","type","video/mp4"],["id","video2","controls","","preload","auto","width","640","height","264"],["src","../assets/videos/video2.mp4","type","video/mp4"]],template:function(i,P){i&1&&(n(0,"main",0)(1,"div",1)(2,"h1"),r(3,"Video 1"),e(),n(4,"video",2),o(5,"source",3),e()(),n(6,"div",1)(7,"h1"),r(8,"Video 2"),e(),n(9,"video",4),o(10,"source",5),e()()(),o(11,"router-outlet"))},dependencies:[d],styles:[`[_nghost-%COMP%] {
    --bright-blue: oklch(51.01% 0.274 263.83);
    --electric-violet: oklch(53.18% 0.28 296.97);
    --french-violet: oklch(47.66% 0.246 305.88);
    --vivid-pink: oklch(69.02% 0.277 332.77);
    --hot-red: oklch(61.42% 0.238 15.34);
    --orange-red: oklch(63.32% 0.24 31.68);

    --gray-900: oklch(19.37% 0.006 300.98);
    --gray-700: oklch(36.98% 0.014 302.71);
    --gray-400: oklch(70.9% 0.015 304.04);

    --red-to-pink-to-purple-vertical-gradient: linear-gradient(
      180deg,
      var(--orange-red) 0%,
      var(--vivid-pink) 50%,
      var(--electric-violet) 100%
    );

    --red-to-pink-to-purple-horizontal-gradient: linear-gradient(
      90deg,
      var(--orange-red) 0%,
      var(--vivid-pink) 50%,
      var(--electric-violet) 100%
    );

    --pill-accent: var(--bright-blue);

    font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
      "Segoe UI Symbol";
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1[_ngcontent-%COMP%] {
    font-size: 3.125rem;
    color: var(--gray-900);
    font-weight: 500;
    line-height: 100%;
    letter-spacing: -0.125rem;
    margin: 0;
    font-family: "Inter Tight", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
      "Segoe UI Symbol";
  }

  p[_ngcontent-%COMP%] {
    margin: 0;
    color: var(--gray-700);
  }

  main[_ngcontent-%COMP%] {
    width: 100%;
    min-height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    box-sizing: inherit;
    position: relative;
  }

  .angular-logo[_ngcontent-%COMP%] {
    max-width: 9.2rem;
  }

  .content[_ngcontent-%COMP%] {
    display: flex;
    justify-content: space-around;
    width: 100%;
    max-width: 700px;
    margin-bottom: 3rem;
  }

  .content[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {
    margin-top: 1.75rem;
  }

  .content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
    margin-top: 1.5rem;
  }

  .divider[_ngcontent-%COMP%] {
    width: 1px;
    background: var(--red-to-pink-to-purple-vertical-gradient);
    margin-inline: 0.5rem;
  }

  .pill-group[_ngcontent-%COMP%] {
    display: flex;
    flex-direction: column;
    align-items: start;
    flex-wrap: wrap;
    gap: 1.25rem;
  }

  .pill[_ngcontent-%COMP%] {
    display: flex;
    align-items: center;
    --pill-accent: var(--bright-blue);
    background: color-mix(in srgb, var(--pill-accent) 5%, transparent);
    color: var(--pill-accent);
    padding-inline: 0.75rem;
    padding-block: 0.375rem;
    border-radius: 2.75rem;
    border: 0;
    transition: background 0.3s ease;
    font-family: var(--inter-font);
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1.4rem;
    letter-spacing: -0.00875rem;
    text-decoration: none;
  }

  .pill[_ngcontent-%COMP%]:hover {
    background: color-mix(in srgb, var(--pill-accent) 15%, transparent);
  }

  .pill-group[_ngcontent-%COMP%]   .pill[_ngcontent-%COMP%]:nth-child(6n + 1) {
    --pill-accent: var(--bright-blue);
  }
  .pill-group[_ngcontent-%COMP%]   .pill[_ngcontent-%COMP%]:nth-child(6n + 2) {
    --pill-accent: var(--french-violet);
  }
  .pill-group[_ngcontent-%COMP%]   .pill[_ngcontent-%COMP%]:nth-child(6n + 3), .pill-group[_ngcontent-%COMP%]   .pill[_ngcontent-%COMP%]:nth-child(6n + 4), .pill-group[_ngcontent-%COMP%]   .pill[_ngcontent-%COMP%]:nth-child(6n + 5) {
    --pill-accent: var(--hot-red);
  }

  .pill-group[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {
    margin-inline-start: 0.25rem;
  }

  .social-links[_ngcontent-%COMP%] {
    display: flex;
    align-items: center;
    gap: 0.73rem;
    margin-top: 1.5rem;
  }

  .social-links[_ngcontent-%COMP%]   path[_ngcontent-%COMP%] {
    transition: fill 0.3s ease;
    fill: var(--gray-400);
  }

  .social-links[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover   svg[_ngcontent-%COMP%]   path[_ngcontent-%COMP%] {
    fill: var(--gray-900);
  }

  @media screen and (max-width: 650px) {
    .content[_ngcontent-%COMP%] {
      flex-direction: column;
      width: max-content;
    }

    .divider[_ngcontent-%COMP%] {
      height: 1px;
      width: 100%;
      background: var(--red-to-pink-to-purple-horizontal-gradient);
      margin-block: 1.5rem;
    }
  }`]})}}return t})();var v=[];var f={providers:[s(v),g()]};var M={providers:[m()]},u=c(f,M);var O=()=>p(h,u),H=O;export{H as a};
