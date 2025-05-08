import { ShaderMaterial, FrontSide, Vector4, Group } from 'three';
import WebGLObject
import WebGLObject from '../_app/cuchillo/3D/WebGLObject';
import { Metrics } from '../_app/cuchillo/core/Metrics';
import { Maths } from '../_app/cuchillo/utils/Maths';
import { GetBy } from '../_app/cuchillo/core/Element';
import Image from '../_app/cuchillo/3D/Image';
import Keyboard, { KEYS } from '../_app/cuchillo/core/Keyboard';
import gsap, { Power0, Power2 } from 'gsap';
import InfiniteScroll from '../_app/cuchillo/scroll/InfiniteScroll';
import InfiniteScroll__Item from '../_app/cuchillo/scroll/InfiniteScroll__Item';
import CircleSlider from './CircleSlider';
import Header from '../layout/Header';
import BezierEasing from 'bezier-easing'

export default class FullSlider extends Group {
    static instance = null;
    static radius = 100;
    static rot = 0;
    static rotProgess = 0;
    static rotOffset = 0;
    static angle = 0;
    static scale = 1;
    static speed = 0;
    static _alpha = 1;
    static pChecker = 300;
    static maxRadius = 400;
    static offsetScale = .3;
    static easing = BezierEasing(0.69, 0.27, 0.43, 0.56);

    dom;
    data = [];
    total = 0;
    totalVisibles = 1;
    actual = 0;
    timerMove;
    enabled = false;
    isShow = false;

    static get alpha() { return FullSlider._alpha }
    static set alpha(__alpha) {
        FullSlider._alpha = __alpha;

        if(FullSlider.getInstance().scroller) {
            for (let i = 0; i < FullSlider.getInstance().scroller.total_items; i++) {
                FullSlider.getInstance().scroller._items[i].image.material.uniforms.opacity.value = FullSlider._alpha;
            }
        }
    }
                
    static getInstance(data) {
        if (!FullSlider.instance) {
            FullSlider.instance = new FullSlider(data);
        }
        return FullSlider.instance;
    }

    get vuelta() { return Math.floor(this.actual/this.total); }
    get index() { 
        return this.actual - this.total*this.vuelta;
    }

    constructor(__dom) {
        if (FullSlider.instance) {
            return FullSlider.instance;
        }

        super();

        FullSlider.instance = this;
        this.dom = __dom;
        this.visible = false;
        this.load();
        FullSlider.alpha = 0;

        const ratio = Metrics.WIDTH/Metrics.HEIGHT;
        let checker = 100;
        if(ratio >= 1.5) {
            checker = 300;
        } else if(ratio >= 1.2) {
            checker = 200;
        }

        FullSlider.pChecker = checker;
    }

    load() {
       
        this.scroller = new InfiniteScroll(InfiniteScroll.AXIS_X, {
            domResize: this.dom,
            container: this.dom,
            multiplicator: 2,
            itemClass: FullSlider__Item,
            minSpeed: 0,
            inverted: false,
            gap: 0,
            hasVirtuaScroll: true
        });
    }

    hideItems() {

    }

    showItems() {

    }
    
    init() {
        this.visible = true;
        FullSlider.alpha = 0;
        this.scroller.start();
        this.scroller.show();
    }

    show() {
        gsap.killTweensOf(FullSlider);
        this.visible = true;
        this.isShow = true;
        gsap.to(FullSlider, {alpha:.7, ease:Power2.easeIn, duration:.4, delay:0});
    }

    hide(__hideTitle = true) {
        let time = .8;
        if(!__hideTitle) {
            this.enabled = false;
            time = .4;
        }

        this.isShow = false;
        gsap.killTweensOf(FullSlider);
        gsap.to(FullSlider, {alpha:0, ease:Power2.easeIn, duration:time, delay:0, onComplete:()=> {
            this.visible = false;
            if(__hideTitle) 
                Header.hideTitle()
            }
        });
    }

    stop() {
        clearTimeout(this.timerMove);
        this.enabled = false;
        this.hide(false);
        this.scroller.hide();
    }

    loop() {
        if(!this.scroller.enabled) return;

        const dist = Math.abs(this.scroller.target-this.scroller.position);

        if(this.enabled) {
            if(dist && dist < 0.1){
                this.scroller.position = this.scroller.target;

                clearTimeout(this.timerMove);
                this.timerMove = setTimeout(()=> {
                    this.timerMove = null;
                    this.hide();
                }, 1000);

            } else {
                if(!this.isShow && dist) {
                    clearTimeout(this.timerMove);
                    this.show();
                }
            }
        }

        this.scroller.loop();
    }

    resize() {
        const ratio = Metrics.WIDTH/Metrics.HEIGHT;

        let checker = 100;
        if(ratio >= 1.5) {
            checker = 300;
        } else if(ratio >= 1.2) {
            checker = 200;
        }

        FullSlider.pChecker = checker;
        this.scroller.resize();
    }
}


class FullSlider__Item extends InfiniteScroll__Item {
    group;
    image;
    title;
    url;

    constructor(__d, __i, __axis = InfiniteScroll.AXIS_Y) {
        super(__d, __i, __axis, false);
        this.image = new Image({dom:this.dom, hasFreePosition:true});
        this.title = this.dom.dataset.title;
        this.url = this.dom.dataset.url;
        FullSlider.getInstance().add(this.image);
    }

    resize() {
        super.resize();
    }

    drawHook() {
       this.move();
    }

    move() {
        const scale = Maths.lerp(1, .1, FullSlider.easing(Math.abs(this.progress) * .5));
        const center = Maths.lerp(0.3, .7, FullSlider.easing(this.progressInside * .3));
        
       
        if(scale > .3 && FullSlider.getInstance().isShow) {
            this.image.play();
        } else {
            this.image.pause();
        }

        this.image.material.uniforms.imageScale.value = scale;
        this.image.material.uniforms.scaleCenter.value = center;
        

        if(this.indice == 0) {
           
        }
        

        


        const p = this.realX;
        if(this.image) this.image.position.x =  p;


       


        
         

        if(p > -FullSlider.pChecker && p < FullSlider.pChecker) {

           

           if(FullSlider.alpha > .01) Header.changeTitle( this.title, this.url);
           CircleSlider.getInstance().gotoIndex(this.indice, FullSlider.getInstance().scroller.direction);
        }
        //


       /* const p = Maths.lerp(0, this._figureOffset, this.progressItem);
        this._figure.style[CSS.transform] = isTouch? CSS.translate3D(0, p, 0) : CSS.translate3D(p, 0, 0);

        let position = { x: this.realX, y: this.realY, z: 3 }

        if ((this.realX > -this.width*2 && this.realX < (Metrics.WIDTH + this.width) && !isTouch)
            || (this.realY > -this.height*2 && this.realY < (Metrics.HEIGHT + this.height) && isTouch)) {
            this._isShow = true;
            this.play();
            this.drawText(position);
        } else if (this._isPlay || this._isShow == null) {
            this._isShow = false;
            this.pause();
        }*/
    }

    dispose() {
        super.dispose();
    }

    resize() {
        super.resize();
        if(this.image) this.image.resize();
    }
}