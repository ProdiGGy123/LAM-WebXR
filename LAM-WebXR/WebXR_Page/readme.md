# `Ma WebXR`

### Een WebXR library voor 1e jaars SD

Met deze library kunnen jullie eenvoudig een WebXR project maken.

### Welke bestanden en voorbeelden zijn er:
##### index.html 
Dit bestand laat zien hoe je fullscreen een WebXR project kunt laten zien.

##### index-voorbeeld-in-pagina.html 
Dit bestand laat een voorbeeld zien hoe je WebXR als 'component' kunt verwerken in je site. Voor de Museum Online opdracht hebben jullie dit nodig.

##### app.js
Hier kan je je eigen code schrijven. Als voorbeeld hebben we hier alvast wat code voor je neergezet.

### Wat kan je allemaal aanmaken met deze library:

|Wat kun je aanmaken |Hoe maak je het aan|Wat kan je er mee?|
|---|:---|---|
| XRImage | const image = new XRImage('assets/images/sampleImage.jpg'); | Een afbeelding/plaatje laten zien |
| Cube | const testCube = new Cube(); | Hiermee maak je een 3d box aan |
| Sphere | const testSphere = new Sphere(); | Hiermee maak je een sphere aan |
| Plane | const floor = new Plane(); | Hiermee voeg je een plat vlak toe in je 3D wereld |
| Cylinder | const barrel = new Cylinder(); | Hiermee voeg je een cylinder vorm toe aan je 3D wereld |
| Cone | const testCone = new Cone(); | Hiermee voeg je een cone toe |
| Text | const welcomeText = new Text(); | Hiermee kan je tekst weergeven in je 3D wereld |
| Model | const art = new Mode('pad/naar/mijn.gltf'); | Hiermee kan je 3D models inladen in je wereld |
| Controls | const controls = new Controls(50); controls.enableMovement(); | Hiermee zetten we de mogelijkheid aan om te teleporten (Oculus quest) en het bewegen met de pijltjes toetsen |
| AmbientLight | const light = new AmbientLight(); | Voeg een ambientlight toe |
| DirectionalLight | const light = new DirectionalLight() | Voeg een directional light toe |
| PointLight | const light = new PointLight(); | Voeg een pointlight toe |
| SpotLight | const light = new SpotLight(); | Voeg een spotlamp toe. Deze kan specifiek richten op een ander voorwerp |
| Sky | const sky = new Sky(); | Voeg een 360 afbeelding toe |

#### Mocht je het interessant vinden: hoe is deze library opgebouwd?
Deze library is gebouwd op A-Frame. Als je hier meer over wilt weten dan kun je kijken op https://aframe.io/ . Hier staan ook simpele voorbeelden over wat je nog meer kunt met A-Frame.
A-Frame maakt zelf weer gebruik van Three.js. Three.js is een JavaScript library die het makkelijker maakt om 3D te laten zien in de browser. Hiervoor gebruikt Three.js WebGL.