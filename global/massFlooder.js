async function join(id, name, blook) {
  fetch("https://fb.blooket.com/c/firebase/join", {
    headers: {
      "X-Blooket-Build": window.blooketBuild,
      "Content-Type": "text/plain"
    },
    credentials: "include",
    method: "put",
    body: await encodePayload({
      id: id.toString(),
      name: name,
    }, window.secret),
  }).then((async function () {
    fetch(`https://fb.blooket.com/c/firebase/games/${id}/v`, {
      headers: {
        "X-Blooket-Build": window.blooketBuild,
        "Content-Type": "text/plain"
      },
      method: "put",
      credentials: "include",
      body: await encodePayload({
        path: `c/${name}`,
        value: {
          b: blook
        },
      }, window.secret),
    });
  }))
}

var encodePayload = async (b, c) => {
  let a = window.crypto.getRandomValues(new Uint8Array(12));
  return window.btoa(Array.from(a).map((a) => String.fromCharCode(a)).join("") + Array.from(new Uint8Array(await window.crypto.subtle.encrypt({
    name: "AES-GCM",
    iv: a
  }, await window.crypto.subtle.importKey("raw", await window.crypto.subtle.digest("SHA-256", new TextEncoder().encode(c)), {
    name: "AES-GCM"
  }, !1, ["encrypt"]), new TextEncoder().encode(JSON.stringify(b))))).map((a) => String.fromCharCode(a)).join(""));
}
window.blooketBuild = window.webpackJsonp.map(e => Object.keys(e[1]).map(t => e[1][t])).reduce((e, t) => [...e, ...t], []).find(e => /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/.test(e.toString()) && /\(new TextEncoder\)\.encode\(\"(.+?)\"\)/.test(e.toString())).toString().match(/\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/)[0]
window.secret = window.webpackJsonp.map(e => Object.keys(e[1]).map(t => e[1][t])).reduce((e, t) => [...e, ...t], []).find(e => /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/.test(e.toString()) && /\(new TextEncoder\)\.encode\(\"(.+?)\"\)/.test(e.toString())).toString().match(/\(new TextEncoder\)\.encode\(\"(.+?)\"\)/)[1]
k = document.createElement('iframe')
k.style.width = '0px'
k.style.height = '0px'
k.style.display = 'none'
document.head.append(k)
window.prompt = k.contentWindow.prompt

amount = Number(prompt('How many bots would you like to send?'))
name = prompt('What name would you like to use?')
id = prompt('What is the game PIN / ID')

for (i = 0; i < amount; i++) {
  join(id, `${name}${i}`, 'Fox')
  console.log(`Added player with name: "${name}${i}"`)
}
