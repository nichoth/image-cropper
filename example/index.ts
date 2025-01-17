import { FunctionComponent, render } from 'preact'
import { waitFor } from '@bicycle-codes/dom'
import Debug from '@bicycle-codes/debug'
import { html } from 'htm/preact'
import { ImageCropper } from '../src/index.js'
const debug = Debug()

// eslint-disable-next-line -- need to render first so we can find the canvas
let cropper:InstanceType<typeof ImageCropper>|undefined

const Example:FunctionComponent<unknown> = function () {
    function getImage (ev) {
        const file = (ev.target as HTMLInputElement).files![0]
        const img = new Image()
        const url = URL.createObjectURL(file)
        img.src = url

        img.onload = () => {
            debug('the image source', img.src)
            cropper!.setImage(img)
        }
    }

    return html`<div>
        <canvas id="the-canvas" width="600" height="400">
            An alternative text describing what your canvas displays.
        </canvas>

        <input type="file" accept="image/*" onChange=${getImage} />
    </div>`
}

render(html`<${Example} />`, document.getElementById('root')!)

const width = 600
const height = 300
const canvas = await waitFor('#the-canvas') as HTMLCanvasElement

// constructor (
//     canvas:HTMLCanvasElement,
//     x:number = 0,
//     y:number = 0,
//     width:number = 100,
//     height:number = 50,
//     keepAspect:boolean = true,
//     touchRadius:number = 20
// )

debug('canvas.width', canvas.width)
debug('canvas.height', canvas.height)
debug('start position left', (canvas.width / 2) - (width / 2))
debug('start position top', (canvas.height / 2) - (height / 2))

cropper = new ImageCropper(
    canvas,
    (canvas.width / 2) - (width / 2),
    (canvas.height / 2) - (height / 2),
    width,
    height,
    true
)

debug('image cropper', cropper)
