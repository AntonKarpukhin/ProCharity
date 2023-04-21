class ImageCropper {
  constructor({
    containerClass,
    bracketClass,
    overlayClass,
    handleLeftClass,
    handleRightClass,
    handleUpClass,
    handleDownClass,
  }) {
    this.container = document.querySelector(containerClass);
    this.containerStyle = window.getComputedStyle(this.container);
    this.bracket = document.querySelector(bracketClass);
    this.bracketStyle = window.getComputedStyle(this.bracket);
    this.overlay = document.querySelector(overlayClass);
    this.overlayStyle = window.getComputedStyle(this.overlay);
    this.handles = {
      left: document.querySelector(handleLeftClass),
      right: document.querySelector(handleRightClass),
      up: document.querySelector(handleUpClass),
      down: document.querySelector(handleDownClass),
    };
    this._setEventListeners();
    this._boundOnMouseMove = this._onMouseMove.bind(this);
    this._boundOnMouseUp = this._onMouseUp.bind(this);
    this._updateOverlay();
  }

  _setEventListeners() {
    this.bracket.addEventListener("mousedown", (evt) => {
      evt.preventDefault();
      this.activeElement = evt.target;
      this._onMouseDown();
    });
  }

  _onMouseDown() {
    window.addEventListener("mousemove", this._boundOnMouseMove, false);
    window.addEventListener("mouseup", this._boundOnMouseUp, false);
  }

  _onMouseMove(evt) {
    switch (this.activeElement) {
      case this.bracket:
        this._move({
          x: evt.movementX,
          y: evt.movementY,
        });
        break;
      case this.handles.right:
        this._resize({
          width: evt.movementX,
          height: 0,
        });
        break;
      case this.handles.down:
        this._resize({
          width: 0,
          height: evt.movementY,
        });
        break;
      case this.handles.left:
        this._resize({
          width: -evt.movementX,
          height: 0,
        });
        this._move({
          x: evt.movementX,
          y: 0,
        });
        break;
      case this.handles.up:
        this._resize({
          width: 0,
          height: -evt.movementY,
        });
        this._move({
          x: 0,
          y: evt.movementY,
        });
        break;
    }
    this._updateOverlay();
  }

  _onMouseUp() {
    window.removeEventListener("mousemove", this._boundOnMouseMove, false);
    window.removeEventListener("mouseup", this._boundOnMouseUp, false);
  }

  _move({ x, y }) {
    var posX = Math.max(0, parseInt(this.bracketStyle.left, 10) + x);
    var posY = Math.max(0, parseInt(this.bracketStyle.top, 10) + y);
    posX = Math.min(
      parseInt(this.containerStyle.width, 10) -
        parseInt(this.bracketStyle.width, 10),
      posX
    );
    posY = Math.min(
      parseInt(this.containerStyle.height, 10) -
        parseInt(this.bracketStyle.height, 10),
      posY
    );
    this.bracket.style.left = posX + "px";
    this.bracket.style.top = posY + "px";
  }

  _resize({ width, height }) {
    var adjWidth;
    var adjHeight;
    adjWidth = parseInt(this.bracketStyle.width, 10) + width;

    adjHeight = parseInt(this.bracketStyle.height, 10) + height;

    if (Math.abs(width) > 0) {
      adjHeight = adjWidth;

      adjHeight = Math.min(
        parseInt(this.containerStyle.height) - parseInt(this.bracketStyle.top),
        adjHeight,
        adjWidth
      );
      adjWidth = Math.min(
        parseInt(this.containerStyle.width) - parseInt(this.bracketStyle.left),
        adjWidth,
        adjHeight
      );
    }
    if (Math.abs(height) > 0) {
      adjWidth = adjHeight;

      adjWidth = Math.min(
        parseInt(this.containerStyle.width) - parseInt(this.bracketStyle.left),
        adjWidth,
        adjHeight
      );
      adjHeight = Math.min(
        parseInt(this.containerStyle.height) - parseInt(this.bracketStyle.top),
        adjHeight,
        adjWidth
      );
    }

    this.bracket.style.width = adjWidth + "px";
    this.bracket.style.height = adjHeight + "px";
  }

  _updateOverlay() {
    const radius = parseInt(this.bracketStyle.width) / 2;
    const centerX = parseInt(this.bracketStyle.left) + radius;
    const centerY = parseInt(this.bracketStyle.top) + radius;
    this.overlay.style.setProperty("--x-pos", `${centerX}px`);
    this.overlay.style.setProperty("--y-pos", `${centerY}px`);
    this.overlay.style.setProperty("--radius", `${radius}px`);
  }

  resetBracketInitialSize() {
    setTimeout(() => {
      const imageWidth = parseInt(this.containerStyle.width);
      const imageHeight = this.container.clientHeight;

      const minDimension = Math.min(imageWidth, imageHeight);

      this.bracket.style.width = `${minDimension}px`;
      this.bracket.style.height = `${minDimension}px`;

      this.bracket.style.left = `${imageWidth - minDimension}px`;
      this.bracket.style.top = `${imageHeight - minDimension}px`;

      this._updateOverlay();
    }, 0);
  }

  getCroppedArea() {
    const posX =
      -parseInt(this.bracketStyle.left) / parseInt(this.bracketStyle.width);
    const posY =
      -parseInt(this.bracketStyle.top) / parseInt(this.bracketStyle.height);
    const adjWidth =
      parseInt(this.containerStyle.width) / parseInt(this.bracketStyle.width);
    const adjHeight =
      parseInt(this.containerStyle.height) / parseInt(this.bracketStyle.height);

    return {
      x: parseInt(posX * 100) + "%",
      y: parseInt(posY * 100) + "%",
      width: parseInt(adjWidth * 100) + "%",
      height: parseInt(adjHeight * 100) + "%",
    };
  }
}

export { ImageCropper };
