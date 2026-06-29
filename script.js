const separators=[
"ornamental_separator.svg",
"seperator2.svg"
];

const game=document.getElementById("game");

let finished=0;

for(let i=0;i<3;i++){

    const level=document.createElement("div");
    level.className="level";

    level.innerHTML=`

    <div class="scene">

        <div class="cube">

            <div class="face front"><img src="All-font-svg.svg" class="face-svg"></div>
            <div class="face back"><img src="All-font-svg.svg" class="face-svg"></div>
            <div class="face left"><img src="All-font-svg.svg" class="face-svg"></div>
            <div class="face right"><img src="All-font-svg.svg" class="face-svg"></div>
            <div class="face top"><img src="All-font-svg.svg" class="face-svg"></div>
            <div class="face bottom"><img src="All-font-svg.svg" class="face-svg"></div>

        </div>

    </div>

    <button>Complete Cube ${i+1}</button>
    `;

    game.appendChild(level);

    if(i<2){

        const sep=document.createElement("div");
        sep.className="separator";
        sep.innerHTML=`<img src="${separators[i]}">`;
        game.appendChild(sep);

    }

    const cube=level.querySelector(".cube");

    let rx=-25;
    let ry=35;

    let drag=false;
    let lx=0;
    let ly=0;

    cube.onpointerdown=e=>{
        drag=true;
        lx=e.clientX;
        ly=e.clientY;
    };

    window.addEventListener("pointerup",()=>drag=false);

    window.addEventListener("pointermove",e=>{

        if(!drag) return;

        ry+=(e.clientX-lx)*0.5;
        rx-=(e.clientY-ly)*0.5;

        lx=e.clientX;
        ly=e.clientY;

        cube.style.transform=
        `rotateX(${rx}deg) rotateY(${ry}deg)`;

    });

    level.querySelector("button").onclick=()=>{

        if(cube.classList.contains("completed")) return;

        cube.classList.add("completed");

        cube.style.transform=
        `rotateX(-20deg) rotateY(${ry+360}deg)`;

        finished++;

        localStorage.setItem("cube"+i,"done");

        if(i<2){

            document.querySelectorAll(".level")[i+1]
            .scrollIntoView({
                behavior:"smooth",
                inline:"center"
            });

        }

        if(finished===3){

            document
            .getElementById("reward")
            .classList.remove("hidden");

        }

    };

}
