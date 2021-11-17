import './App.css';
import React, { Component } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import Pizzicato from 'pizzicato'
import CircleLoader from 'react-spinners/CircleLoader'
import { css } from "@emotion/react";

var pingPongDelay = new Pizzicato.Effects.PingPongDelay({
  feedback: 0.6,
  time: 0.3,
  mix: 0.68
});


let renderer = null, scene = null, frontCamera = null, backCamera=null,currentCamera=null,root = null, orbitControls = null,control,skybox=null;

let raycaster = null, mouse = new THREE.Vector2(), intersected, clicked;

let directionalLightFront = null, spotLight = null, directionalLightBack = null, bulbLight =null;

let currentTime = Date.now();

let front =true,ghostBool=false,counter_vueltas=0

let sound, song;

let objects=[]
let valve
let modelUrls = ["./models/test/guitar.glb"];
let grid=new THREE.GridHelper( 300, 10 ) 

//const mapUrl = "./media/checker_large.gif";
const back = new THREE.TextureLoader().load("./media/fondo.png");

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      volume: 10,
      background:1,
      ghostBool:false,
      loading:true,
    }
    this.animate = this.animate.bind(this);
    this.onDocumentPointerDown = this.onDocumentPointerDown.bind(this)
  }
  onError ( err ){ console.error( err ); }
  onProgress( xhr ) 
  {
      if ( xhr.lengthComputable ) {
  
          const percentComplete = xhr.loaded / xhr.total * 100;
          console.log( xhr.target.responseURL, Math.round( percentComplete, 2 ) + '% downloaded' );
      }
  }
  async loadGLTF()
  {
    const gltfLoader = new GLTFLoader();
    const modelsPromises = modelUrls.map(url =>{
        return gltfLoader.loadAsync(url);
    });
    try
    {
        const results = await Promise.all(modelsPromises);

        results.forEach( (result) =>
        {
            const object = result.scene;
            object.scale.set( 50,50,50 );
            object.position.x =  -15;
            object.position.y = 8;
            object.position.z = 0 ;
            object.castShadow=true
            //object.receiveShadow=true
            object.children.forEach((item)=>{
              item.castShadow=true
              if(item instanceof THREE.Mesh){
              const materialTemp=item.material.clone();
              item.material=materialTemp
              }

              item.children.forEach(id=>{
                id.castShadow=true
                if(id instanceof THREE.Mesh){
                  const materialTemp=id.material.clone();
                  id.material=materialTemp
                  }
                //id.receiveShadow=true
              })
              
            })

            object.mixer = new THREE.AnimationMixer( scene );
            for(let x=0;x<0;x++){
              object.action = object.mixer.clipAction( result.animations[x], object).setDuration( 10.0 );
              object.action.play(); 
            }
 
            objects.push(object); 
            console.log(object)    
            root.add(object);
            valve=object.children.filter(id=>id.name==="valvegate")[0] 
            control.attach(valve );
            this.setState({...this.state, loading: false })
            scene.add( skybox ); 
              
    document.addEventListener('pointermove', this.onDocumentPointerMove );
    document.addEventListener('pointerdown', this.onDocumentPointerDown);
        });        
    }
    catch(err)
    {
        console.error(err);
    }
  }

  async loadLamp(){
    const gltfLoader = new GLTFLoader();
    const temp=["./models/lamp2/Lamp.glb"]
    const modelsPromises = temp.map(url =>{
      return gltfLoader.loadAsync(url);
  });
    try
    {
        const results = await Promise.all(modelsPromises);
        
        results.forEach( (result) =>
        {
            const object = result.scene;
            object.scale.set( 35,35,35 );
            object.position.x =  37;
            object.position.y = 10;
            object.position.z = 32 ;

            objects.push(object); 
            object.children[0].children[0].children[0].material.emissive=0xffffee
            object.children[0].children[0].children[0].material.emissiveIntensity=1
            object.children[0].children[0].children[0].material.color= 0x000000
            console.log(object.children[0].children[0].children[0].material)    
            bulbLight = new THREE.PointLight( 0xffee88, 1, 1000, 4 );
            object.children[0].children[0].children[0].add(bulbLight);

            root.add(object);

        });    

    } catch(err)
    {
        console.error(err);
    }
  }

  renderizar(){
    renderer.render(scene, currentCamera);
  }

  init() {

    renderer =  new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.shadowMap.enabled = true;

    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    scene = new THREE.Scene();
    grid.visible=false
    scene.add( grid);

    frontCamera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,20000);
    backCamera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,20000);
    currentCamera=frontCamera
    currentCamera.position.set(0, 35, 120);

    orbitControls = new OrbitControls(currentCamera, renderer.domElement);
    orbitControls.target.set(0,0,0);

    orbitControls.maxAzimuthAngle = Math.PI / 2;  
    orbitControls.minAzimuthAngle = -Math.PI / 2;

    directionalLightBack= new THREE.DirectionalLight(0xffffff, 1, 100);
    directionalLightBack.position.set(0, 0, -400);
    directionalLightBack.visible=false
    scene.add(directionalLightBack)
    
    directionalLightFront = new THREE.DirectionalLight(0xffffff, 1, 100);
    directionalLightFront.position.set(0, 0, 400);
    scene.add(directionalLightFront)
     
    spotLight = new THREE.SpotLight (0xffffff);
    spotLight.position.set(0, 195, 0);
    spotLight.castShadow = true;
    spotLight.angle=Math.PI/6
    spotLight.shadow.mapSize.width = 100;
    spotLight.shadow.mapSize.height = 100;

    spotLight.shadow.camera.near = 10;
    spotLight.shadow.camera.far = 260;
    spotLight.shadow.camera.fov = 25;
    scene.add(spotLight);

    raycaster = new THREE.Raycaster();

    root = new THREE.Object3D();

    control = new TransformControls( currentCamera, renderer.domElement );
    control.addEventListener( 'change', ()=>{
      this.renderizar()
  
    });
    control.addEventListener( 'mouseUp', ()=>{
      sound.stop() 
      
      if(counter_vueltas>10){
        counter_vueltas=0
      
        song = new Pizzicato.Sound( './sounds/Song.mp3' , () => {
          if(ghostBool)song.addEffect(pingPongDelay);
          song.volume =1 ;
         
          song.play();
        });
      }
       
  
    });
    control.addEventListener( 'dragging-changed', function ( event ) {
      if(event.value){
        sound = new Pizzicato.Sound( './sounds/windClock.mp3' , () => {
          sound.volume = 0.5;
          sound.play();
        });
      }
      orbitControls.enabled = ! event.value;
      
    } );
    control.setMode( 'rotate' );
    
    control.showX = false;
    control.showZ = false;
    control.showY = false;
    //control.setRotationSnap( THREE.Math.degToRad( 1 ) );
    control.setSpace('local')
    scene.add( control );
    scene.add( root );
 
    let materialArray = [];

    let texture_ft = new THREE.TextureLoader().load( './media/boxTexture.jpg');
    let texture_bk = new THREE.TextureLoader().load( './media/boxTexture.jpg');
    let texture_up = new THREE.TextureLoader().load( './media/boxTexture.jpg');
    let texture_dn = new THREE.TextureLoader().load( './media/boxTexture.jpg');
    let texture_rt = new THREE.TextureLoader().load( './media/boxTexture.jpg');
    let texture_lf = new THREE.TextureLoader().load( './media/boxTexture.jpg');

    materialArray.push(new THREE.MeshStandardMaterial( { map: texture_ft }));
    materialArray.push(new THREE.MeshStandardMaterial( { map: texture_bk }));
    materialArray.push(new THREE.MeshStandardMaterial( { map: texture_up }));
    materialArray.push(new THREE.MeshStandardMaterial( { map: texture_dn }));
    materialArray.push(new THREE.MeshStandardMaterial( { map: texture_rt }));
    materialArray.push(new THREE.MeshStandardMaterial( { map: texture_lf }));

    for (let i = 0; i < 6; i++){
       materialArray[i].side = THREE.BackSide;
       materialArray[i].shininess=0
       //materialArray[i].specular=0x111111
    }
    let skyboxGeo = new THREE.BoxGeometry( 300, 300, 300);
    skybox = new THREE.Mesh( skyboxGeo, materialArray );
    skybox.position.y=100
    //skybox.castShadow = true
    skybox.receiveShadow = true;
    
    this.loadGLTF()
    this.loadLamp()
    return renderer.domElement;
  }

  removeObject3D(object) {

    var selectedObject = scene.getObjectByName(object.name);
    console.log(selectedObject)
    selectedObject.parent.remove( selectedObject );
  }
  animate() {
    requestAnimationFrame(this.animate);
    orbitControls.update();

    const now = Date.now();
    const deltat = now - currentTime;
    currentTime = now;

    if(control.dragging){
     
      let aux= valve.rotation.z.toFixed(1)
      if(aux>=2.3){
        counter_vueltas++
        console.log("add")
      }
      
    }

    for(const object of objects)
    {
        if(object.mixer)
            object.mixer.update(deltat*0.001);
    }

    this.renderizar()
  }

  onDocumentPointerMove( event ) 
  {
      mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
      mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
      raycaster.setFromCamera( mouse, currentCamera );
      //console.log(objects[0].children)
      
      const intersects = raycaster.intersectObjects( objects[1].children );

      if ( intersects.length > 0 ) 
      {
          if ( intersected !== intersects[ 0 ].object ) 
          {
            console.log(intersected)

              if ( intersected )
                  intersected.material.emissive.set( intersected.currentHex );

              intersected = intersects[ 0 ].object;
              intersected.currentHex = intersected.material.emissive.getHex();
              if(
                  intersected.name==="selector_Cube095_1" ||
                  intersected.name==="Cuerda1"||
                  intersected.name==="Cuerda2"||
                  intersected.name==="Cuerda3"||
                  intersected.name==="Cuerda4"||
                  intersected.name==="Cuerda5"||
                  intersected.name==="Cuerda6"
                 
                ){
                intersected.material.emissive.set('#00FFFF' );
                } else if( intersected.name==="perilla2"){
                  intersected.material.emissive.set('#FF0000' );
                } else if( intersected.name==="perilla1"){
                  intersected.material.emissive.set('#6ADD33' );
                }
          }
      } 
      else 
      {
          if ( intersected ) 
              intersected.material.emissive.set( intersected.currentHex );

          intersected = null;
      }
  }

  onDocumentPointerDown(event)
  {
    event.preventDefault();
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    raycaster.setFromCamera( mouse, currentCamera );

    let intersects = raycaster.intersectObjects( objects[1].children );

    if ( intersects.length > 0) 
    {
      clicked = intersects[ 0 ].object;
      console.log(clicked)
      //clicked.material.emissive.set( 0x00ff00 );
      if(clicked.name==='Cuerda1' && front) 
      {
        sound = new Pizzicato.Sound( './sounds/E4.mp3' , () => {
          if(ghostBool)sound.addEffect(pingPongDelay);
          //sound.addEffect(quadrafuzz);
          sound.volume = this.state.volume/10;
          sound.play();
        });
      }
      if(clicked.name==='Cuerda6'&& front) 
      {
        sound = new Pizzicato.Sound( './sounds/E5.mp3' , () => {
          if(ghostBool)sound.addEffect(pingPongDelay);
          //sound.addEffect(quadrafuzz);
          sound.volume = this.state.volume/10;
          sound.play();
        });
      }
      if(clicked.name==='Cuerda5'&& front) 
      {
        sound = new Pizzicato.Sound( './sounds/B5.mp3' , () => {
          if(ghostBool)sound.addEffect(pingPongDelay);
          //sound.addEffect(quadrafuzz);
          sound.volume = this.state.volume/10;
          sound.play();
        });
      }
      if(clicked.name==='Cuerda4'&& front) 
      {
        sound = new Pizzicato.Sound( './sounds/G5.mp3' , () => {
          if(ghostBool)sound.addEffect(pingPongDelay);
          //sound.addEffect(quadrafuzz);
          sound.volume = this.state.volume/10;
          sound.play();
        });
      }
      if(clicked.name==='Cuerda3'&& front) 
      {
        sound = new Pizzicato.Sound( './sounds/D5.mp3' , () => {
          if(ghostBool)sound.addEffect(pingPongDelay);
          //sound.addEffect(quadrafuzz);
          sound.volume = this.state.volume/10;
          sound.play();
        });
      }
      if(clicked.name==='Cuerda2'&& front) 
      {
        sound = new Pizzicato.Sound( './sounds/A5.mp3' , () => {
          if(ghostBool)sound.addEffect(pingPongDelay);
          //sound.addEffect(quadrafuzz);
          sound.volume = this.state.volume/10;
          sound.play();
        });
      }
      if(clicked.name==='selector_Cube095_1')
      {
        
        ghostBool=!ghostBool
        this.setState({...this.state, ghostBool: !this.state.ghostBool })
      }
      if(clicked.name==="perilla1")
      {
        if(this.state.volume<10) this.setState({...this.state, volume: this.state.volume + 1 })
      }          
      if(clicked.name==="perilla2")
      {
        if(this.state.volume>0) this.setState({...this.state, volume: this.state.volume - 1 })
      }
    }  
    else
      {

          if ( clicked ) 
          {
              clicked.material.emissive.set( clicked.currentHex );
          }

          clicked = null;
      }
  }

  changeCamera(){
    if(front){
      directionalLightBack.visible=true;
      currentCamera = backCamera
      currentCamera.position.set(0, 25, -50)
      currentCamera.lookAt( 0, 0, 100 );
      control.camera = currentCamera;
      orbitControls.object = currentCamera;
      control.showZ = true;
      orbitControls.maxAzimuthAngle = -Math.PI / 2;  
      orbitControls.minAzimuthAngle = Math.PI / 2;
      directionalLightFront.visible=false
    }else{
      directionalLightFront.visible=true
      currentCamera = frontCamera
      currentCamera.position.set(0, 25, 100)
 
      control.showZ = false;
      orbitControls.object = currentCamera;
      orbitControls.maxAzimuthAngle = Math.PI / 2;  
      orbitControls.minAzimuthAngle = -Math.PI / 2;
      directionalLightBack.visible=false;
    }
    front=!front
  }

  changeBackground(x){
    if(this.state.background===x) return
    if(this.state.background===1){
      
      skybox.visible=false
      grid.visible=true
      
      scene.background =back
      this.setState({...this.state,background:2})
    }else{
      grid.visible=false
      skybox.visible=true
      scene.background =null
      this.setState({...this.state,background:1})
    }

  }

  componentDidMount() {
    
    document.getElementById("Render").appendChild(this.init());
    this.animate()

      
  }

  render() {
    const override = css`
    position: fixed; 
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

  `;
    return (
      <div id="Render" className="App">
      {
        this.state.loading ? 
        <CircleLoader loading={this.state.loading} size={150} color={"#fff"} css={override}/> :
      <div>
        <div className="volumen">
          <img src={'./media/Volume_Bar.png'} alt="Volumen"/>
          <div className="texto">
              Volumen: {this.state.volume}
          </div>
        </div>

        <div className="camara">
          <img src={'./media/btn_camara.png'} alt="camara" onClick={()=>this.changeCamera()}/>
          <div className="texto">
                Cambiar Vista
            </div>
        </div>

        <div className="background">
          <img src={'./media/back_btn.png'} 
                alt="camara" 
                onClick={()=>this.changeBackground(1)} 
                className={this.state.background === 1 ? 'active':'' }
                style={{paddingLeft:'5px'}}
                />
          <img src={'./media/back_btn2.png'} 
                alt="camara" 
                onClick={()=>this.changeBackground(2)}
                className={this.state.background === 2 ? 'active':'' }
                style={{paddingRight:'5px'}}/>
        </div>

        <div className="effect">
          <img src={this.state.ghostBool ? './media/On_Effect.png':'./media/Off_Effect.png' } alt="camara" onClick={()=>this.changeCamera()}/>
            <div className="texto">
                  Efecto Ghost
            </div>
        </div>

      </div>

      }
    
    </div>
    
    );
  }
}
export default App;
