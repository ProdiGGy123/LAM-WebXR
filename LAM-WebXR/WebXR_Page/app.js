// voeg controls toe (teleport & WASD controls)
const controls = new Controls(200);
controls.enableMovement();



//Roomn Model
const roomModel = new Model('assets/models/Room/EmptyRoom(OBJ).obj');
roomModel.setPosition(0, 0, 0);
roomModel.setScale(1, 1, 1);
roomModel.setRotation(0, 0, 0);

// create an image
const image = new XRImage('assets/images/sampleImage.jpg');
image.setPosition(-1.48819, 2.45839, -5);

// create a 360 image
const image360 = new Sky('assets/360_world.jpg');

const spotLight = new SpotLight();
spotLight.setPosition(-3.39382, 4.72931, 1.37905);
spotLight.setTarget(roomModel);

// listen for an event
minecraftModel.addEventListener('click', () => console.log('je klikt op mij'));