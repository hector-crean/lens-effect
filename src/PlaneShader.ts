export const vertex = /*glsl*/`


varying vec2 vUv;

void main() {
        vUv = uv;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`

export const fragment = /*glsl*/`
    uniform sampler2D uMask;
    uniform sampler2D uDiffuse;

    uniform float theta1;
    uniform float theta2;
    uniform float A1;
    uniform float A2;

    uniform float psi1;
    uniform float psi2;
    uniform float B1;
    uniform float B2;

    varying vec2 vUv;

    void main() {
        vec4 white = vec4(0.,0.,0.,1.);
        vec4 black = vec4(1.,1.,1.,1.);

        vec4 outputColor = white;
 

        // Sample the alpha value from the mask texture at the given UV coordinates
        vec4 mask = texture2D(uMask, vUv);

        // Calculate the distortion offsets based on the sampled alpha value and sine/cosine functions
        vec2 offset = vec2(
            A1 * sin(mask.r * theta1) + A2 * cos(mask.r * theta2),
            B1 * sin(mask.r * psi1) + B2 * cos(mask.r * psi2)
        );

        // Sample the diffuse texture using the modified UV coordinates with the calculated offset
        vec4 color = texture2D(uDiffuse, vUv + mask.a * offset);

        outputColor = color;

        // outputColor = mix(color, white, mask.a);
        // Output the final color
        gl_FragColor = outputColor;
    }`
