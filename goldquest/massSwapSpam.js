let e = Object.values(document.querySelector('#app > div > div'))[1].children[1]._owner;
var encodePayload = async (e, t) => {
    let d = window.crypto.getRandomValues(new Uint8Array(12));
    return window.btoa(Array.from(d).map(e => String.fromCharCode(e)).join("") + Array.from(new Uint8Array(await window.crypto.subtle.encrypt({
        name: "AES-GCM",
        iv: d
    }, await window.crypto.subtle.importKey("raw", await window.crypto.subtle.digest("SHA-256", (new TextEncoder).encode(t)), {
        name: "AES-GCM"
    }, !1, ["encrypt"]), (new TextEncoder).encode(JSON.stringify(e))))).map(e => String.fromCharCode(e)).join(""))
};

function ruinPlayer(name) {
    setInterval(() => {
        e.memoizedProps.firebase.setVal({
            id: e.memoizedProps.client.hostId,
            path: "c/" + e.memoizedProps.client.name,
            val: {
                b: e.memoizedProps.client.blook,
                g: e.stateNode.state.gold,
                tat: name + ":swap:" + 0
            }
        })
    }, 300)
}


var getValues = () => new Promise((e, t) => {
    try {
        let n = window.webpackJsonp.map(e => Object.keys(e[1]).map(t => e[1][t])).reduce((e, t) => [...e, ...t], []).find(e => /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/.test(e.toString()) && /\(new TextEncoder\)\.encode\(\"(.+?)\"\)/.test(e.toString())).toString();
        e({
            blooketBuild: n.match(/\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/)[0],
            secret: n.match(/\(new TextEncoder\)\.encode\(\"(.+?)\"\)/)[1]
        })
    } catch {
        t("Could not fetch auth details")
    }
});


(async () => {
    Object.assign(window, await getValues())
    await fetch("https://fb.blooket.com/c/firebase/join", {
        headers: {
            "X-Blooket-Build": window.blooketBuild,
            "Content-Type": "text/plain"
        },
        credentials: "include",
        method: "put",
        body: await encodePayload({
            id: e.memoizedProps.client.hostId,
            name: 'getinplayersxd',
        }, window.secret),
    }).then(async (res) => {
        e.memoizedProps.players = (await res.json()).host.c
    })
    Object.keys(e.memoizedProps.players).forEach((p) => {
        console.log(`ruining ${p}`)
        ruinPlayer(p)
    })

})();
