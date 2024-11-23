function getMicrotime() {
    return new Date().getTime();
}

let htmlListSlide;

// fetch(`${urlAPI}get-slides-project/${idProject}`, {
//     method: "GET",
//     headers: {
//         "Content-Type": "application/json; charset=UTF-8",
//         Accept: "application/json",
//     },
// })
//     .then((res) => res.json()) // the .json() method parses the JSON response into a JS object literal
//     .then((data) => {
//         data = data.data;
//         for (let i = 0; i < data.length; i++) {
//             htmlListSlide += `
//       <li data-slide="${data[i].id}"  id="li-slide-${data[i].id}" class="dnd-sortable-item dnd-sortable-handle">
//          <div class="slide-title" id="slide-${data[i].id}-title" contenteditable="true" onkeyup="parent.addFrameTitle(this)">${data[i].ds_name} ${data[i].id}</div>
//          <div class="slide-box" id="slide-${data[i].id}" onclick="activeSlide('li-slide-${data[i].id}');parent.swithSlide(${data[i].id}, document.getElementById('slide-${data[i].id}-title').innerText, ${data[i].id})">

//          </div>
//       </li>
//       `;
//             lastSlide = data[i].id;
//         }
//         document.getElementById("ul-slide").innerHTML = htmlListSlide;
//         parent.showSlideContent(lastSlide);
//     });

function setSortLayer() {
    let layerSort = document.getElementsByClassName("dnd-sortable-item");
    let calcCountLayers = layerSort.length + 1;
    for (let i = 0; i < layerSort.length; i++) {
        layerSort[i].setAttribute("data-sort", calcCountLayers);
        document.getElementById(
            layerSort[i].getAttribute("data-control")
        ).style.zIndex = calcCountLayers;
        document.getElementById(
            layerSort[i].getAttribute("data-object")
        ).style.zIndex = calcCountLayers;
        calcCountLayers--;
    }
}

AreaSortable("vertical", {
    container: "ul-slide",
    animationMs: 180,
    autoscroll: true,
    onEnd: function (item) {
        setSortLayer();
    },
});

function addFrame() {
    let countSlide = document.getElementsByClassName("slide-box").length + 1;
    let microtimeHTML = getMicrotime();

    let htmlLayer = `
       <li id="layer-objSquare-${microtimeHTML}" class="dnd-sortable-item dnd-sortable-handle" data-sort="1" data-control="objControl-${microtimeHTML}" data-object="objSquare-${microtimeHTML}">
         <div class="layer-badge"></div>
         <div class="layer-title" id="layer-${microtimeHTML}" data-target="objSquare-${microtimeHTML}" contenteditable="true" data-control="objControl-${microtimeHTML}">Camada 1</div>
         <div class="layer-box" id="layer-1">
               <ul>
                  <li class="bi bi-unlock" title="Travar/Destravar" id="layer-lock-objControl-${microtimeHTML}" onclick="lockUnlockObject('objControl-${microtimeHTML}','objSquare-${microtimeHTML}', 'layer-lock-objControl-${microtimeHTML}')"></li>
                  <li class="bi bi-image" title="Imagem de fundo" onclick="addImage('objSquare-${microtimeHTML}')"></li>
                  <li onclick="addInlineText('objSquare-${microtimeHTML}', 'objControl-${microtimeHTML}')" class="bi bi-fonts" title="Texto"></li>
                  <li class="bi bi-trash2" title="Remover" onclick="removeObj('objSquare-${microtimeHTML}', 'objControl-${microtimeHTML}')"></li>
               </ul>
         </div>
      </li>
      `;

    let htmlSlide = `
         <div id="into-frame"><div id="objSquare-${microtimeHTML}" class="editable-object" style="width: 100px; height: 100px; border: 1px solid transparent; top: 21.5px; left: 26.5px; position: absolute; z-index: 1; background: rgb(196, 196, 196);" microtime="${microtimeHTML}" calc-width="100" calc-height="100" data-lock="false"></div></div>
         <div id="objControl-${microtimeHTML}" target="objSquare-${microtimeHTML}" class="movable-object movable-object-hide" style="width: 150px; height: 150px; top: 9px; left: 14px; z-index: 1;" aria-top="12.5" aria-left="12.5" defaultcolor="" microtime="${microtimeHTML}" data-lock="false" data-hide="false">
         
            <div style="bottom: -10px;left: -10px" class="bullet-text" id="bulletControlBottomLeft-${microtimeHTML}" direction="bottomLeft" parent="objControl-${microtimeHTML}" parent-target="objSquare-${microtimeHTML}" onclick="removeObj('objSquare-${microtimeHTML}', 'objControl-${microtimeHTML}')">
            <i class="bi bi-trash2"></i>
            </div>
         <div style="top: -35px;right: 0;" class="bullet-text" id="bulletControlTopRight-${microtimeHTML}" direction="topRight" parent="objControl-${microtimeHTML}" parent-target="objSquare-${microtimeHTML}" onclick="addInlineText('objSquare-${microtimeHTML}', 'objControl-${microtimeHTML}')">T</div>
         <div style="top: -35px;right: 34px;" class="bullet-text" id="bulletControlTopRightImg-${microtimeHTML}" direction="topRight" parent="objControl-${microtimeHTML}" parent-target="objSquare-${microtimeHTML}" onclick="addImage('objSquare-${microtimeHTML}')">
                  <i class="bi bi-image"></i>
            </div>
         
            <div style="top: -35px;right: 68px;" class="bullet-color" id="bulletControlTopRightImg-${microtimeHTML}" direction="topRight" parent="objControl-${microtimeHTML}" parent-target="objSquare-${microtimeHTML}" onclick="addColor('objSquare-${microtimeHTML}', 'objControl-${microtimeHTML}')">
                  <div class="clr-field" style="color: #c4c4c4">
                  <button type="button" aria-labelledby="clr-open-label" class="bi bi-paint-bucket"></button>
                  <input type="text" value="" data-coloris="" wfd-id="id0"></div>
            </div>
         <div style="bottom: -6px;right: -10px;cursor: nw-resize" class="resizer" id="bulletControlBottomRight-${microtimeHTML}" direction="bottomRight" parent="objControl-${microtimeHTML}" parent-target="objSquare-${microtimeHTML}"></div>
         </div>
      `;

    const url = `${urlAPI}project-slide`;
    let post = JSON.stringify({
        ds_name: `Quadro ${countSlide}`,
        tx_html_layer: htmlLayer,
        id_project: 1,
        tx_html_slide: htmlSlide,
        nr_order: countSlide,
    });
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    xhr.onreadystatechange = function (data) {
        if (xhr.status === 201) {
            let contentSlides = JSON.parse(data.srcElement.response);
            document.getElementById("ul-slide").innerHTML += `
            <li data-slide="${countSlide}"  id="li-slide-${countSlide}" class="dnd-sortable-item dnd-sortable-handle">
               <div class="slide-title" id="slide-${countSlide}-title" contenteditable="true" onkeyup="parent.addFrameTitle(this)">Quadro</div>
               <div class="slide-box" id="slide-${countSlide}" onclick="activeSlide('li-slide-${countSlide}');parent.swithSlide(${countSlide}, 'Quadro ${countSlide}', ${contentSlides.data.id})"></div>
            </li>
            `;
            parent.swithSlide(
                countSlide,
                `Quadro ${countSlide}`,
                contentSlides.data.id
            );
        }
    };
    xhr.send(post);

    objectHistory = {};
    objectLayers = {};
    countObjectHistory = 0;
}

let slidePrev;
function activeSlide(id_slide) {
    if (slidePrev !== undefined) {
        document.getElementById(slidePrev).style.background = "";
    }
    document.getElementById(id_slide).style.background = "#a7c5d1";
    slidePrev = id_slide;
}

function setThumb(finalThumb, valor) {
    document.getElementById(
        valor
    ).innerHTML = `<img src="${finalThumb}" style="width: 254px;height: 145px">`;
}
