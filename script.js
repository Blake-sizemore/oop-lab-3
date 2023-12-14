$(document).ready(function () {
    class htmlLayout {
        constructor(addWhere, addElement, addId, addClass) {
            this.addWhere = addWhere;
            this.addElement = addElement;
            this.addId = addId;
            this.addClass = addClass;
        }
        addSingle() {
            $(this.addWhere).append(`<${this.addElement} id=${this.addId} class="${this.addClass}"></${this.addElement}>`);
            return this
        }
        addH5(addText, addClass) {
            $(`#${this.addId}`).append(`<h5 class="${addClass}">${addText}</h1>`);
            return this;
        }
        addArrBtn(addWhere, addArr, element, element2, element3, addClass, addClass2, addClass3, addText1) {
            let count = 0;
            let sizeInput = null;
            addArr.forEach(() => {
                $(addWhere).append(`<${element} class="${addClass}" id="grid${addArr[count]}"><${element2} type="submit" id="btn${addArr[count]}" class="${addClass2}"><h5>${addText1} ${addArr[count]}</h5></${element2}><${element3} id="${element3}${addArr[count]}" class="${addClass3}" type="text" name="${addArr[count]}Value" value="" placeholder="Enter pixel sides"></${element3}></${element}>`);
                if (addArr[count] == `Rectangle`) {
                    $(`#inputRectangle`).after(`<input id="inputRectangle2" type="text" name="RectangleValueY" value="">`);
                    $(`#inputRectangle2`).attr(`placeholder`, "Enter width (px)").addClass(`${addClass3}`);
                    $(`#inputRectangle`).attr(`placeholder`, "Enter height (px)");
                    $(`#btnRectangle`).on(`click`, function (event) {
                        event.preventDefault();
                        let widthInput = $(`#inputRectangle`).val();
                        let heightInput = $(`#inputRectangle2`).val();
                        let max = 400 - widthInput;
                        let maxy = 400 - heightInput;
                        let xVal = randomValue(0, max);
                        let yVal = randomValue(0, maxy);
                        let rec = new rectangle(yVal, xVal, widthInput, heightInput);
                        console.log(`Rectangle`, widthInput, heightInput);
                    });
                }
                if (addArr[count] == `Circle`) {
                    $(`#inputCircle`).attr(`placeholder`, "Enter diameter (px)");
                    $(`#btnCircle`).on(`click`, function (event) {
                        event.preventDefault();
                        sizeInput = $(`#inputCircle`).val();
                        let max = 400 - sizeInput;
                        let xVal = randomValue(0, max);
                        let yVal = randomValue(0, max);
                        let cir = new circle(yVal, xVal, sizeInput);
                        cir.changeDetails(`Circle`);
                        console.log(`Circle`, sizeInput);
                    });
                }
                if (addArr[count] == `Triangle`) {
                    $(`#inputTriangle`).attr(`placeholder`, "Enter base width (px)");
                    $(`#btnTriangle`).on(`click`, function (event) {
                        event.preventDefault();
                        sizeInput = $(`#inputTriangle`).val();
                        let max = 400 - sizeInput;
                        let xVal = randomValue(0, max);
                        let yVal = randomValue(0, max);
                        let tri = new triangle(yVal, xVal, sizeInput);
                        console.log(`Triangle`, sizeInput);
                    });
                }
                if (addArr[count] == `Square`) {
                    $(`#inputSquare`).attr(`placeholder`, "Enter side length (px)");
                    $(`#btnSquare`).on(`click`, function (event) {
                        event.preventDefault();
                        sizeInput = $(`#inputSquare`).val();
                        let reduce = sizeInput * 2;
                        let max = 400 - reduce;
                        let xVal = randomValue(0, max);
                        let yVal = randomValue(0, max);
                        let sq = new square(yVal, xVal, sizeInput);
                        console.log(`Square`, sizeInput);
                    });
                }
                ++count;
            })
            return this
        }
        addArrDetails(addWhere, addArr, element1, element2, element3, addClass1, addClass2, addClass3, addText1, addText2) {
            let count = 0;
            addArr.forEach(() => {
                $(addWhere).append(`<${element1} class="${addClass1}"><${element2} class="${addClass2} id="title${addArr[count]}"><h5>${addText1} ${addArr[count]}</h5></${element2}><${element3} id="output${addArr[count]}" class="${addClass3}"><h5>${addText2}</h5></${element3}></${element1}>`);
                ++count;
            })
            return this
        }
    }
    function randomValue(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    class square {
        constructor(x, y, size) {
            this.div = document.createElement(`div`);
            this.whereShape = document.getElementById('canvasFrame');
            this.size = size;
            this.div.style.left = `${x}px`;
            this.div.style.top = `${y}px`;
            this.div.style.position = `absolute`;
            this.whereShape.appendChild(this.div);
            this.div.style.backgroundColor = this.updateColor();
            this.div.style.height = `${this.size}px`;
            this.div.style.width = `${this.size}px`;
            this.div.classList.add(`square`);
            this.changeDetails(`Square`, `${this.size}px`, `${this.size}px`, `${this.size * this.size}px`, `${this.size * 4}px`, `No Radius`);
            $(this.div).on(`click`, () => {
                this.changeDetails(`Square`, `${this.size}px`, `${this.size}px`, `${this.size * this.size}px`, `${this.size * 4}px`, `No Radius`);
            });
        };

        updateColor() {
            let randomColor = `rgb(${randomValue(0, 255)} ,${randomValue(0, 255)},${randomValue(0, 255)})`;
            return randomColor
        }
        randomValue(min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        }
        changeDetails(shapeId, heightId, widthId, areaId, perimeterId, radiusId) {
            let shape = document.getElementById(`outputShape`);
            let height = document.getElementById(`outputHeight`);
            let width = document.getElementById(`outputWidth`);
            let area = document.getElementById(`outputArea`);
            let perimeter = document.getElementById(`outputPerimeter`);
            let radius = document.getElementById(`outputRadius`);
            $(shape).text(shapeId);
            $(height).text(heightId);
            $(width).text(widthId);
            $(area).text(areaId);
            $(perimeter).text(perimeterId);
            $(radius).text(radiusId);
        }
    }
    class circle extends square {
        constructor(x, y, size) {
            super(x, y, size)
            const PI = 3.1415
            let radius = this.size/2;
            let area
            this.div.classList.remove(`square`);
            this.div.classList.add(`circle`);
            this.div.classList.add(`rounded-circle`);
            this.changeDetails(`Circle`, `${this.size}px`, `${this.size}px`, `${PI * [[this.size / 2] * [this.size / 2]]}px`, `${PI * this.size}px`, `${this.size / 2}px`);
            $(this.div).on(`click`, () => {
                this.changeDetails(`Circle`, `${this.size}px`, `${this.size}px`, `${PI * [[this.size / 2] * [this.size / 2]]}px`, `${PI * this.size}px`, `${radius.toFixed(2)}px`);
            });
        }
    }
    class rectangle extends square {
        constructor(x, y, width, height) {
            super(x, y);
            this.width = width;
            this.height = height;
            let heightInt = parseInt(this.height);
            let widthInt = parseInt(this.width);
            this.div.style.width = `${heightInt}px`;
            this.div.style.height = `${parseInt(this.width)}px`;
            this.div.classList.remove(`square`)
            this.div.classList.add(`rectangle`);
            this.changeDetails(`Rectangle`, `${widthInt}px`, `${heightInt}px`, `${heightInt * widthInt}px`, `${heightInt + heightInt + widthInt + widthInt}px`, `No Radius`);
            $(this.div).on(`click`, () => {
                this.changeDetails(`Rectangle`, `${widthInt}px`, `${heightInt}px`, `${heightInt * widthInt}px`, `${heightInt + heightInt + widthInt + widthInt}px`, `No Radius`);
            });
        }
    }
    class triangle extends square {
        constructor(x, y, size) {
            super(x, y, size)
            this.div.classList.remove(`square`);
            let height = this.size / 2;
            let side = Math.sqrt([Math.pow(height, 2) + Math.pow(height, 2)]);
            let hypo = parseFloat(side.toFixed(2));
            let area = [this.size * height] / 2;
            let perimeter = this.size + hypo + hypo;
            this.div.classList.remove(`square`);
            this.div.classList.add(`triangle`);
            this.div.style.left = `${y}px`;
            this.div.style.top = `${x}px`;
            this.div.style.borderTop = `5em solid transparent`;
            this.div.style.borderLeft = `5em solid transparent`;
            this.div.style.borderRight = `5em solid  transparent`;
            this.div.style.borderBottom = `solid rgb(${randomValue(0, 255)} ,${randomValue(0, 255)},${randomValue(0, 255)})`;
            this.div.style.backgroundColor = `transparent`;
            this.div.style.borderWidth = `${height}px`;
            this.div.style.borderBottomColor = `rgb(${randomValue(0, 255)} ,${randomValue(0, 255)},${randomValue(0, 255)})`;
            this.changeDetails(`Triangle`, `${height}px`, `${this.size}px`, `${area}px`, `${perimeter}px`, `No Radius`);
            $(this.div).on(`click`, () => {
                this.changeDetails(`Triangle`, `${height}px`, `${this.size}px`, `${area}px`, `${perimeter}px`, `No Radius`);
            });
        }
    }

    $(`body`).addClass(`container text-white bg-dark text-center`);
    let shapes = [`Square`, `Rectangle`, `Circle`, `Triangle`];
    let details = [`Shape`, `Height`, `Width`, `Area`, `Perimeter`, `Radius`];
    let breakpoint = new htmlLayout(`header`, `div`, `breakpoint`, `row row-cols-6`);
    breakpoint.addSingle().addH5(`xs`, `border border-danger text-start`).addH5(`s`, `border border-danger text-end text-sm-start`).addH5(`md`, `border border-danger text-end text-md-start`).addH5(`lg`, `border border-danger text-end text-lg-start`).addH5(`xl`, `border border-danger text-end text-xl-start`).addH5(`xxl`, `border border-danger text-end text-xxl-start `);
    let title = new htmlLayout(`header`, `div`, `mainTitle`, ``);
    title.addSingle().addH5(`Shape Up and Shape Out`, `m-2`);
    let buttons = new htmlLayout(`header`, `form`, `buttonInterface`, `row g-2`);
    buttons.addSingle().addArrBtn(`form`, shapes, `div`, `button`, `input`, `input-group`, `btn btn-warning col-3`, `form-control`, `Add a`);
    let canvas = new htmlLayout(`main`, `div`, `canvas`, `bg-white mt-3 d-flex  align-content-stretch justify-content-center`);
    canvas.addSingle();
    $(`#canvas`).attr(`style`, `height:400px`);
    let canvasFrame = new htmlLayout(`#canvas`, `div`, `canvasFrame`, `bg-secondary m-0 p-1`);
    canvasFrame.addSingle();
    $(`#canvasFrame`).attr(`style`, `width:400px`);
    let detail = new htmlLayout(`footer`, `div`, `details`, `row row-cols-lg-2 text-black mt-3`);
    detail.addSingle().addArrDetails(`#details`, details, `div`, `div`, `div`, `row row-cols-1 row-cols-md-2 m-0`, `bg-warning my-1`, `bg-white my-1`, ``, `Pick a shape or add a new one`);
});