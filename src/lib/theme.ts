// 表示モード（ライト/ダーク）の設定をブラウザに保存するときの名前
export const THEME_STORAGE_KEY = "theme";

// layout.tsx の <head> で、画面を描く前に実行するスクリプト。
// 以前ボタンで選んだ表示モードがあれば、html に data-theme="light" か "dark" を付ける。
// 何も選んでいなければ何もせず、CSS が OS の設定に合わせて色を決める。
// ※ "use client" のファイルから書き出すとサーバー側で文字列として使えないため、このファイルに置いている。
export const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;
