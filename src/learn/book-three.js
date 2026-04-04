import * as THREE from 'three'

function prefersReducedMotion() {
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  } catch {
    return true
  }
}

function isDarkTheme() {
  const t = document.documentElement.getAttribute('data-theme') || ''
  return t.includes('dark')
}

/**
 * @param {THREE.MeshStandardMaterial} cover
 * @param {THREE.MeshStandardMaterial} spine
 * @param {THREE.MeshStandardMaterial} page
 */
function applyBookMaterials(cover, spine, page) {
  const dark = isDarkTheme()
  cover.color.setHex(dark ? 0x3d8fd4 : 0x0a6ead)
  cover.emissive.setHex(dark ? 0x051a30 : 0x000000)
  cover.emissiveIntensity = dark ? 0.12 : 0
  spine.color.copy(cover.color)
  spine.emissive.copy(cover.emissive)
  spine.emissiveIntensity = cover.emissiveIntensity
  page.color.setHex(dark ? 0x2a2824 : 0xf4eee4)
}

/**
 * Lightweight WebGL book for the learn header. Returns a dispose function.
 * @param {HTMLCanvasElement | null} canvas
 * @returns {() => void}
 */
export function initBookThreeDecor(canvas) {
  if (!(canvas instanceof HTMLCanvasElement)) return () => {}

  const host = canvas.parentElement
  if (!host) return () => {}

  let renderer
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'low-power',
    })
  } catch {
    return () => {}
  }

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
  renderer.outputColorSpace = THREE.SRGBColorSpace

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(38, 1, 0.08, 50)
  camera.position.set(0.15, 0.35, 3.6)
  camera.lookAt(0, 0, 0)

  scene.add(new THREE.AmbientLight(0xffffff, 0.62))
  const key = new THREE.DirectionalLight(0xfff5e6, 1.05)
  key.position.set(2.2, 3.5, 4)
  scene.add(key)
  const fill = new THREE.DirectionalLight(0xb8d4ff, 0.35)
  fill.position.set(-3, 1, 2)
  scene.add(fill)

  const coverMat = new THREE.MeshStandardMaterial({
    roughness: 0.42,
    metalness: 0.08,
  })
  const spineMat = new THREE.MeshStandardMaterial({
    roughness: 0.38,
    metalness: 0.06,
  })
  const pageMat = new THREE.MeshStandardMaterial({
    roughness: 0.88,
    metalness: 0,
  })
  const ribbonMat = new THREE.MeshStandardMaterial({
    color: 0xd9782d,
    roughness: 0.55,
    metalness: 0,
  })

  applyBookMaterials(coverMat, spineMat, pageMat)

  const book = new THREE.Group()

  const pageBlock = new THREE.Mesh(new THREE.BoxGeometry(1.05, 1.48, 0.11), pageMat)
  pageBlock.position.set(0.04, 0, 0)
  book.add(pageBlock)

  const backCover = new THREE.Mesh(new THREE.BoxGeometry(1.12, 1.54, 0.038), coverMat)
  backCover.position.set(0, 0, -0.074)
  book.add(backCover)

  const spine = new THREE.Mesh(new THREE.BoxGeometry(0.055, 1.54, 0.26), spineMat)
  spine.position.set(-0.53, 0, 0)
  book.add(spine)

  const hinge = new THREE.Group()
  hinge.position.set(-0.53, 0, 0.065)
  const frontCover = new THREE.Mesh(new THREE.BoxGeometry(1.12, 1.54, 0.038), coverMat)
  frontCover.position.set(0.56, 0, 0)
  hinge.add(frontCover)
  hinge.rotation.y = 0.52
  book.add(hinge)

  const ribbon = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.42, 0.018), ribbonMat)
  ribbon.position.set(0.18, -0.42, 0.065)
  book.add(ribbon)

  book.rotation.set(-0.18, 0.42, 0.06)
  scene.add(book)

  let raf = 0
  let running = true
  let t = 0

  const reduceMotion = prefersReducedMotion()

  function resize() {
    const w = host.clientWidth
    const h = host.clientHeight
    if (w < 8 || h < 8) return
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    renderer.setSize(w, h, false)
  }

  const ro = new ResizeObserver(resize)
  ro.observe(host)

  function tick() {
    if (!running) return
    raf = requestAnimationFrame(tick)
    if (!reduceMotion) {
      t += 0.014
      book.rotation.y = 0.42 + Math.sin(t) * 0.09
      book.rotation.x = -0.18 + Math.sin(t * 0.73) * 0.035
    }
    renderer.render(scene, camera)
  }

  const mo = new MutationObserver(() => {
    applyBookMaterials(coverMat, spineMat, pageMat)
  })
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

  resize()
  tick()

  return () => {
    running = false
    cancelAnimationFrame(raf)
    ro.disconnect()
    mo.disconnect()
    scene.traverse((obj) => {
      if (!(obj instanceof THREE.Mesh)) return
      obj.geometry?.dispose()
      const mat = obj.material
      if (Array.isArray(mat)) mat.forEach((m) => m.dispose())
      else mat?.dispose()
    })
    renderer.dispose()
  }
}
