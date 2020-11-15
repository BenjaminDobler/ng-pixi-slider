// import disp from './images/disp.jpg';

import fit from 'math-fit';

import * as PIXI from 'pixi.js';

function loadImages(paths, whenLoaded) {
  const loadedImages = [];
  paths.forEach((src) => {
    const img = new Image();
    img.onload = function () {
      loadedImages.push({ src, img: this });
      if (loadedImages.length === paths.length) {
        whenLoaded(loadedImages);
      }
    };
    img.src = src;
  });
}

export class SliderApp {
  margin = 50;
  scroll = 0;
  scrollTarget = 50;
  width: number;
  height: number;
  thumbs: any[];
  app: PIXI.Application;
  container: PIXI.Container;
  WHOLEWIDTH: number;
  loadedImages: any[];
  displacement;
  displacementFilter;

  visibleItems = 4;

  constructor(private images: any[], private host: HTMLElement) {

    console.log(PIXI);

    const hostRect = this.host.getBoundingClientRect();

    this.width = (hostRect.width - 2 * this.margin) / this.visibleItems;
    this.height = hostRect.height * 0.8;
    this.thumbs = [];

    this.app = new PIXI.Application({
      backgroundColor: 0x1099bb,
      resizeTo: this.host,
    });
    this.host.appendChild(this.app.view);

    this.container = new PIXI.Container();
    this.app.stage.addChild(this.container);

    this.WHOLEWIDTH = this.images.length * (this.width + this.margin);


    loadImages(this.images, (images) => {
      this.loadedImages = images;
      this.add();
      this.addDisplacement();

      this.render();
      this.scrollEvent();
    });
  }

  addDisplacement() {
    // this.displacement = PIXI.Sprite.from(disp);
    // const cover = fit(
    //   { w: 512, h: 512 },
    //   { w: window.innerWidth, h: window.innerHeight }
    // );

    // this.displacement.position.set(cover.left, cover.top);
    // this.displacement.scale.set(cover.scale);
    // this.app.stage.addChild(this.displacement);

    // this.displacementFilter = new PIXI.filters.DisplacementFilter(
    //   this.displacement
    // );
    // this.displacementFilter.scale.x = 100;
    // this.displacementFilter.scale.y = 0;

    // this.container.filters = [this.displacementFilter];
  }

  add() {
    const parent = {
      w: this.width,
      h: this.height,
    };
    this.loadedImages.forEach((img, i) => {
      console.log('img ', img);
      const texture = PIXI.Texture.from(img.img);
      const sprite = new PIXI.Sprite(texture);
      const container = new PIXI.Container();
      const spriteContainer = new PIXI.Container();

      const mask = new PIXI.Sprite(PIXI.Texture.WHITE);
      mask.width = this.width;
      mask.height = this.height;

      const image = {
        w: sprite.texture.orig.width,
        h: sprite.texture.orig.height,
      };

      let cover = fit(image, parent);
      console.log(sprite.texture);
      spriteContainer.position.set(cover.left, cover.top);
      spriteContainer.scale.set(cover.scale);

      sprite.anchor.set(0.5);
      sprite.position.set(
        sprite.texture.orig.width / 2,
        sprite.texture.orig.height / 2
      );
      sprite.mask = mask;

      container.x = (this.margin + this.width) * i;
      container.y = this.height / 10;
      container.interactive = true;
      container.on('mouseover', this.mouseOver);
      container.on('mouseout', this.mouseOut);

      spriteContainer.addChild(sprite);
      container.addChild(spriteContainer);
      container.addChild(mask);
      this.container.addChild(container);

      this.thumbs.push(container);
    });
  }

  mouseOver(e) {
    // const sprite = e.target.children[0].children[0];
    // gsap.to(sprite.scale, {
    //   duration: 1,
    //   x: 1.1,
    //   y: 1.1,
    // });
  }

  mouseOut(e) {
    // const sprite = e.currentTarget.children[0].children[0];
    // gsap.to(sprite.scale, {
    //   duration: 1,
    //   x: 1,
    //   y: 1,
    // });
  }

  scrollEvent() {
    this.host.addEventListener('mousewheel', (e: any) => {
      this.scrollTarget = e.wheelDelta / 3;
    });
  }

  addFilter() {}

  calcPos(src, pos) {
    let temp =
      ((src + pos + this.WHOLEWIDTH + this.width + this.margin) %
        this.WHOLEWIDTH) -
      this.width -
      this.margin;
    return temp;
  }

  render() {
    this.app.ticker.add(() => {
      this.app.renderer.render(this.container);

      this.scroll += (this.scrollTarget - this.scroll) * 0.1;

      this.thumbs.forEach((thumb) => {
        thumb.position.x = this.calcPos(this.scroll, thumb.position.x);
      });

      const direction = this.scroll > 0 ? -1 : 1;
      // this.displacementFilter.scale.x = 3 * Math.abs(this.scroll) * direction;
    });
  }
}
