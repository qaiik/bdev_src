import * as dat from '../jsm/dg_module.js';

const g = new dat.GUI();

const m = g.addFolder("map")

export let data = {
    map: {
        size: 1,
        roomSize: 1
    }
}

const slider = m.add(data.map, 'size').min(1).max(256).step(1)

slider.onSqrVal = () => {}
slider.onChange(v => {
    const sq = Math.round(Math.sqrt(v)) ** 2
    if (v == sq) return
    slider.setValue(sq)
    slider.onSqrVal(sq)
})

const rslider = m.add(data.map, 'roomSize').min(1).max(10).step(1)

rslider.onSqrVal = () => {}
rslider.onChange(v => {
    rslider.onSqrVal(v)
})

export const gui = g
export const mapSizeSlider = slider
export const roomSizeSlider = rslider