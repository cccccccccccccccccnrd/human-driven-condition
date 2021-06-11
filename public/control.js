import { WebGLRenderer, PerspectiveCamera, Scene, PointLight, CubeTextureLoader, Color } from 'https://cdn.skypack.dev/three@0.128.0/build/three.module.js'
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/controls/OrbitControls.js'

import { MeshoptDecoder } from './decoder.js'

const canvas = document.querySelector('#c')
const scrolls = document.querySelectorAll('.s')

const loader = new GLTFLoader()
loader.setMeshoptDecoder(MeshoptDecoder)
const renderer = new WebGLRenderer({
  canvas,
  alpha: true,
  antialias: true,
  logarithmicDepthBuffer: true
})
const scene = new Scene()

renderer.setSize(canvas.clientWidth, canvas.clientHeight)

const camera = new PerspectiveCamera(2, canvas.clientWidth / canvas.clientHeight, 0.1, 1000)
camera.position.set(100, 50, 100)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableZoom = false
controls.enablePan = false
controls.autoRotate = true
controls.autoRotateSpeed = 0.2
controls.target.set(0, 2, 0)
controls.update()

const pointLight = new PointLight('white', 50)
pointLight.position.set(0, 5, 0)
scene.add(pointLight)

const env = new CubeTextureLoader().setPath('env/').load(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg'])

loader.load(`rack-${ Math.random() < 0.5 ? '01' : '02' }.gltf`, (gltf) => {
  const root = gltf.scene
  scene.add(root)
  scene.traverse((node) => {
    console.log(node)

    if (node.name === 'Rack') {
      node.rotation.set(0, 0, 0)
    }

    if (node.name === 'mesh_0_1') {
      node.material.metalness = 1
      node.material.roughness = 0
      node.material.envMap = env
      node.material.flatShading = true
      node.geometry.computeVertexNormals(true)
    } else if (node.name === 'mesh_0') {
      node.material.metalness = 1
      node.material.roughness = 0.25
      node.material.color = new Color(0xffffff)
      node.material.envMap = env
    }
  })

  render()
}, undefined, (error) => {
	console.error(error)
})

function render() {
  renderer.render(scene, camera)
  controls.update()
  requestAnimationFrame(render)
}

window.addEventListener('resize', () => {
  renderer.setSize(document.body.clientWidth, document.body.clientHeight)
  camera.aspect = document.body.clientWidth / document.body.clientHeight
  camera.updateProjectionMatrix()
})

c.addEventListener('wheel', (event) => {
  event.preventDefault()
  console.log(camera.rotation)
  scrolls.forEach((s) => s.scrollTop += event.deltaY)
})

console.log(`%c<-- 𝒽𝓊𝓂𝒶𝓃 𝒹𝓇𝒾𝓋𝑒𝓃 𝒸𝑜𝓃𝒹𝒾𝓉𝒾𝑜𝓃 (2021)`, 'padding: 0.5em; color: white; font-size: 2em;')
