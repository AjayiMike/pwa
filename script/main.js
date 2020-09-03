window.addEventListener("load", () => {
    if("serviceWorker" in navigator) {
        navigator.serviceWorker.register("serviceWorker.js")
        .then(console.log("service worker: registered"))
        .catch(err => {
            console.error(err)
        })
    }
    let container;
    let html = "";
    //navigation toggle  for all here
    let navOpen = false;
    document.querySelector("#harmburger").addEventListener("click", () => {
        if(navOpen === false) {
            document.querySelector("header").style.height = "20em";
            document.querySelector(".harm-bar").style.background = "transparent"
            document.querySelector(".harm-bar").classList.add("open");
            setTimeout(() => {
                document.querySelector("nav").style.display = "block";
                navOpen = true;
            }, 300)
            
        }
        else if(navOpen === true) {
            document.querySelector(".harm-bar").style.background = "#ffebcd";
            document.querySelector(".harm-bar").classList.remove("open");
            document.querySelector("nav").style.display = "none";
            document.querySelector("header").style.height = "5em";
            navOpen = false;
        }
    })

    //fetch home page data
    if(document.querySelector("#home-main")) {
        container = document.querySelector("#home-main");
        fetch("https://api.npoint.io/745b84668d3d7c6ea7b1").then(
            res => {
                return res.json()
            })
            .then(data => {
                data.users.forEach(user => {
                    html += `<div class = "user-card">
                    <h3>${user.name}</h3>
                    <p>${user.faculty}</p>
                    <p>Department: ${user.dept}</p>
                    </div>`;
           })
           container.innerHTML  = html;

           
        })
    }

    //fetch faq page page
    if(document.querySelector("#faq-main")) {
        let expand = false;
        container = document.querySelector("#faq-main");
        const faq = async () => {
         await fetch("https://api.npoint.io/f3a79ef949515799ba9f").then(res => {
                return res.json()
            }).then(data => {
                data.faqs.forEach(faq => {
                    html += `<div class = "faq">
                    <div class = "heading">
                        <h4>${faq.question}</h4>
                        <span class = "faq-toggle">></span>
                    </div>
                    <p class = "faq-body">${faq.answer}</p>
                    </div>`;
    
                            
                });

                html += `<div id = "credit" style = "margin: 1em 0">Credit: Michal Szklarski</div>`
                container.innerHTML = html;
            })
            document.querySelectorAll(".faq-toggle").forEach(x => {
                x.addEventListener("click", (e) => {
                    if(expand) {
                        e.target.parentNode.parentNode.children[1].style.display = "none";
                        expand = false;
                        e.target.classList.remove("show")
                    }else {
                        e.target.parentNode.parentNode.children[1].style.display = "block";
                        expand = true;
                        e.target.classList.add("show")
                    }
                })
            })
        }
        
        faq();
    }

});