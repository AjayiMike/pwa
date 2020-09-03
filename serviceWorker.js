// const cacheId = "precache_V1";
// const cached_assets = ["/", "/faq.html", "/about.html", "./styles/style.css", "./script/main.js" ];

// self.addEventListener("install", e => {
//     console.log("service worker: installed");
//     e.waitUntil(
//         caches.open(cacheId).then(cache =>
//             cache.addAll(cached_assets)
//         )
//     ).then(() => {
//         self.skipWaiting()
//     });
// })
// self.addEventListener("activate", e => {
//     console.log("from activate handler")
//     e.waitUntil(
//         caches.keys().then(cacheNames => {
//             return Promise.all(
//                 cacheNames.filter(cache => {
//                     if(cache !== cacheId) {
//                         console.log("deleting old cache");
//                         return caches.delete(cache)
//                     }
//                 })
//             )
//         })
//     )
// })

// self.addEventListener("fetch", e => {
//     e.respondWith(
//         fetch(e.request).catch(() => caches.match(e.request))
//     )
// })





const cacheId = "cache_V1";

self.addEventListener("install", e => {
        console.log("service worker installed!")
        caches.open("cacheId").then(cache => {
            cache.add(["./index.html"])
        })
})
self.addEventListener("activate", e => {
    console.log("service worker activated!")
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(cache => {
                    if(cache !== cacheId) {
                        console.log("deleting old cache");
                        return caches.delete(cache)
                    }
                })
            )
        })
    )
})

self.addEventListener("fetch", e => {
    console.log("fetching data")
    e.respondWith(
        fetch(e.request).then(res => {
            const clonedRes = res.clone();
            caches.open(cacheId).then(cache => cache.put(e.request, clonedRes));
            console.log("fetched over network");
            return res;
        }).catch(err =>  {
            caches.match(e.request)
            .then(res => {
                return res;
            })
        })     
    )
})