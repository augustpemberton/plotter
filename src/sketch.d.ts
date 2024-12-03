type Sketch = {
    prepare?: () => Promise<void>,
    setup: (p: p5) => void
    draw: (p: p5) => void,
}