import 'three'
import 'three/examples/js/controls/OrbitControls'
import 'three/examples/js/effects/VREffect'
import 'three/examples/js/controls/VRControls'

class AbstractApplication {

    constructor(){
        this._camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
        this._camera.position.z = 400;

        this._scene = new THREE.Scene();
        this._scene.add(this._camera);
        this._renderer = new THREE.WebGLRenderer();
        this._renderer.setPixelRatio( window.devicePixelRatio );
        this._renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( this._renderer.domElement );

        this._controls = new THREE.OrbitControls( this._camera, this._renderer.domElement );
        this._effect = new THREE.VREffect(this._renderer);
        this._effect.setSize(window.innerWidth, window.innerHeight);
        window.addEventListener( 'resize', this.onWindowResize.bind(this), false );
    }

    get renderer(){
        return this._renderer;
    }

    get camera(){
        return this._camera;
    }

    get scene(){
        return this._scene;
    }

    get effect(){
        return this._effect;
    }

    get controls() {
        return this._controls;
    }

    onWindowResize() {

        this._camera.aspect = window.innerWidth / window.innerHeight;
        this._camera.updateProjectionMatrix();

        this._renderer.setSize( window.innerWidth, window.innerHeight );

    }

    animate(timestamp) {
        this._effect.requestAnimationFrame( this.animate.bind(this) );
        this._controls.update();
        this._effect.render(this._scene, this._camera);
    }


}
export default AbstractApplication;
