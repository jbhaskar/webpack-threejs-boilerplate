import * as THREE from 'three'
import ColladaLoader from 'three-collada-loader'
import AbstractApplication from 'views/AbstractApplication'
import shaderVert from 'shaders/custom.vert'
import shaderFrag from 'shaders/custom.frag'

class Main extends AbstractApplication{
  constructor(){
    super();
    var loader = new ColladaLoader();
    var self = this;
    loader.load( 'assets/models/MNP_Towers.dae', function ( collada ) {
      var animations = collada.animations;
      var avatar = collada.scene;
      self.scene.add(avatar);
    });
    var ambientLight = new THREE.AmbientLight( 0xffffff, 0.2 );
    this.scene.add( ambientLight );
    var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.8 );
    directionalLight.position.set( 1, 1, - 1 );
    this.scene.add( directionalLight );
    this.animate()
  }

  animate() {
    this.effect.requestAnimationFrame( this.animate.bind(this) );
    this.render();
  }

  onWindowResize() {
    super.onWindowResize();
    this.effect.setSize( window.innerWidth, window.innerHeight );
  }

  render() {
    this.controls.update();
    this.effect.render(this.scene, this.camera);
  }
}

export default Main;
