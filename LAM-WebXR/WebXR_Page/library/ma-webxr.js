const getFileExtension = filename => filename.split('.').pop();
const warn = message => console.log(`%c Ma-WebXR waarschuwing: ${message}`, 'background: #222; color: #ff0000');
const log = message => console.log(`%c Ma-WebXR waarschuwing: ${message}`, 'background: #222; color: #bada55');

class Controls {
    constructor(speed = 10) {
        this.speed = speed;
        this.addCameraRig();
        this.camera = document.querySelector('#head');
        this.camera.setAttribute(`cursor`, `rayOrigin: mouse`);
        this.disableMovement();
    }

    addCameraRig(){
        const scene = document.querySelector('a-scene');

        const cameraRig = document.createElement('a-entity');
        cameraRig.id = "cameraRig";
        cameraRig.innerHTML = `<a-entity id="head" camera="active: true" look-controls cursor="rayOrigin: mouse" position="0 1.54 0"></a-entity>
                          <a-entity id="lefthand" oculus-touch-controls="hand: left"
                                    teleport-controls="button: trigger; collisionEntities: .collidable; cameraRig: #cameraRig; teleportOrigin: #head; hitCylinderColor: #3fa9fa; curveHitColor: #3fa9fa; curveMissColor: #3fa9fa;"></a-entity>
                          <a-entity id="righthand" oculus-touch-controls="hand: right" laser-controls="hand: right">
                       </a-entity>`;
        scene.appendChild(cameraRig);
    }

    setSpeed(speed) {
        this.speed = speed;
    }

    enableMovement() {
        this.camera.setAttribute(`wasd-controls`, `acceleration:${this.speed}`);
    }

    disableMovement() {
        this.camera.removeAttribute('wasd-controls');
    }
}

// abstract class. Do not instantiate
class VRElement {

    static uniqueId = 0;

    setup(shouldAppendToScene = true) {
        this.scene = document.querySelector(`a-scene`);

        this.width = 1;
        this.height = 1;
        this.position = {x: 0, y: 0, z: -5};
        this.rotation = {x: 0, y: 0, z: 0};
        this.scale = {x: 1, y: 1, z: 1};
        this.elem.setAttribute(`width`, this.width);
        this.elem.setAttribute(`height`, this.height);
        this.elem.setAttribute(`position`, this.position);
        this.elem.setAttribute(`rotation`, this.rotation);
        this.elem.setAttribute(`scale`, this.scale);

        if(this.elem.id === '')
            this.setId(`webxrElement${VRElement.uniqueId++}`)

        if (shouldAppendToScene)
            this.scene.appendChild(this.elem);
    }

    setId(newId){
        this.elem.id = newId;
    }

    getId(){
        return this.elem.id;
    }

    setElement(elementType) {
        this.elem = document.createElement(elementType);
    }

    setWidth(w) {
        this.width = w;
        this.elem.setAttribute(`width`, this.width);
    }

    setHeight(h) {
        this.height = h;
        this.elem.setAttribute(`width`, this.height);
    }

    setPosition(x, y, z) {
        this.position.x = x;
        this.position.y = y;
        this.position.z = z;

        this.elem.setAttribute(`position`, this.position);
    }

    addPosition(x, y, z) {
        this.position.x += x;
        this.position.y += y;
        this.position.z += z;

        this.elem.setAttribute(`position`, this.position);
    }

    setRotation(x, y, z) {
        this.rotation.x = x;
        this.rotation.y = y;
        this.rotation.z = z;

        this.elem.setAttribute(`rotation`, this.rotation);
    }

    addRotation(x, y, z) {
        this.rotation.x += x;
        this.rotation.y += y;
        this.rotation.z += z;

        this.elem.setAttribute(`rotation`, this.rotation);
    }

    setScale(x, y, z) {
        this.scale.x = x;
        this.scale.y = y;
        this.scale.z = z;

        this.elem.setAttribute(`scale`, this.scale);
    }

    addScale(x, y, z) {
        this.scale.x += x;
        this.scale.y += y;
        this.scale.z += z;

        this.elem.setAttribute(`scale`, this.scale);
    }

    setVisible(isVisible) {
        this.elem.setAttribute(`visible`, isVisible);
    }

    setOpacity(newOpacity) {
        this.elem.setAttribute('opacity', newOpacity);
    }

    addEventListener(interaction, event) {
        this.elem.addEventListener(interaction, event);
    }

    removeEventListener(interaction, event) {
        this.elem.removeEventListener(interaction, event);
    }


}

class Wrapper extends VRElement {

    constructor(element) {
        super();
        if (!element)
            return;

        this.elem = element;
        super.setup(false);
    }

}

class Text extends VRElement {
    constructor(text = '') {
        super();
        this.setElement(`a-text`);
        this.color = `black`;
        this.setColor(this.color);


        this.setText(text);

        this.setVisible(true);
        super.setup();
        this.setScale(5, 5, 5);
    }

    setAlignCenter() {
        this.elem.setAttribute(`align`, `center`);
    }

    setText(text) {
        this.text = text;
        this.elem.setAttribute(`value`, this.text);
    }

    setColor(color) {
        this.color = color;
        this.elem.setAttribute(`color`, color);
    }

    setFontsize(newFontSize){
        this.elem.setAttribute(`width`, newFontSize);
    }

}

// abstract class. Do not instantiate
class Primitive extends VRElement {
    constructor(type, url = '') {
        super();
        this.setElement(type);

        if (url !== '') this.setSRC(url);

        this.setVisible(true);
        super.setup();
    }

    setSRC(url) {
        this.elem.setAttribute(`src`, url);
        this.setColor('');
    }

    setColor(color) {
        this.elem.setAttribute(`color`, color);
    }

}

// abstract class. Do not instantiate
class Light extends VRElement {
    constructor(type = 'ambient') {
        super();
        this.setElement('a-light');
        this.elem.setAttribute('type', type);
        super.setup();
    }

    setIntensity(intensity) {
        this.elem.setAttribute('intensity', intensity);
    }

    setColor(color) {
        this.elem.setAttribute(`color`, color);
    }
}

class AmbientLight extends Light {
    constructor() {
        super();
    }
}

class DirectionalLight extends Light {
    constructor() {
        super('directional');
    }
}

class PointLight extends Light {
    constructor() {
        super('point');
    }

    setDecay(newDecay){
        this.elem.setAttribute('decay', newDecay);
    }

    setDistance(newDistance){
        this.elem.setAttribute('distance', newDistance);
    }
}

class SpotLight extends Light {
    constructor() {
        super('spot');
    }

    setDecay(newDecay){
        this.elem.setAttribute('decay', newDecay);
    }

    setDistance(newDistance){
        this.elem.setAttribute('distance', newDistance);
    }

    setAngle(newAngle){
        this.elem.setAttribute('angle', newAngle);
    }

    setPenumbra(newPenumbra){
        this.elem.setAttribute('penumbra', newPenumbra);
    }

    setTarget(newTarget){
        this.elem.setAttribute('target', `#${newTarget.getId()}`);
    }
}

class Cube extends Primitive {
    constructor() {
        super('a-box');
    }
}

class Plane extends Primitive {
    constructor() {
        super('a-plane');
    }
}

class Cylinder extends Primitive {
    constructor() {
        super('a-cylinder');
    }
}

class Cone extends Primitive {
    constructor() {
        super('a-cone');
    }
}

class Sky extends Primitive {
    constructor(url) {
        super('a-sky', url);
    }
}

class XRImage extends Primitive {
    constructor(url) {
        super('a-image', url);
        if(url === undefined){
            this.setColor('pink');
        }
    }
}

class Sphere extends Primitive {
    constructor() {
        super('a-sphere');
    }

    setRadius(radius) {
        this.elem.setAttribute('radius', radius);
    }
}

class Model extends VRElement {
    constructor(modelURL, materialURL = '') {
        super();

        this.extension = getFileExtension(modelURL);
        if (this.extension.toLowerCase() !== 'gltf' && this.extension.toLowerCase() !== 'obj') {
            warn(`De extensie ${this.extension} wordt niet ondersteund. Je kunt een GLTF of een OBJ model gebruiken`);
            return;
        }

        this.setElement(`a-${this.extension}-model`);

        this.setModel(modelURL);

        if (materialURL !== '') {
            this.setMaterial(materialURL);
        } else if (this.extension === 'obj') {
            warn('Je maakt een OBJ 3d model aan zonder material. Om je model goed te kunnen zien kun je beter wel ook het mtl bestand doorgeven.');
        }

        this.setVisible(true);
        super.setup();
    }

    setModel(model) {
        this.model = model;
        this.elem.setAttribute('src', model);
    }

    setMaterial(material) {
        if (this.extension === 'gltf') {
            warn('Je probeert een material door te geven voor een GLTF model. Je kan alleen een material instellen bij OBJ modellen.');
            return;
        }
        this.material = material;
        this.elem.setAttribute('mtl', material);
    }

}

const cameraElement = document.querySelector('[camera]');
const mainCamera = new Wrapper(cameraElement);
mainCamera.setPosition(0, 0, 0);
