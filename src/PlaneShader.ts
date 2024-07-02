export const vertex = /*glsl*/`
    varying vec2 vUv;
    uniform sampler2D uMassTexture;  // Texture containing mass distribution
    uniform ivec2 uTextureSize;       // Size of the mass texture

    void main() {
        vec2 uCentre = vec2(0., 0.);

        vUv = uv;

        vec3 deformedPosition = position;
        float deformation = 0.0;

        // Loop over the entire texture to accumulate the gravitational effect
        for (int y = 0; y < uTextureSize.y; y++) {
            for (int x = 0; x < uTextureSize.x; x++) {
                vec2 sampleUv = vec2(x / uTextureSize.x, y / uTextureSize.y);
                vec3 massSample = texture2D(uMassTexture, sampleUv).rgb;
                float mass = massSample.r; // Assume the mass is encoded in the red channel

                // Calculate the position of the sampled mass point
                vec2 samplePos = (sampleUv - 0.5) * 2.0 * uCentre.xy;

                // Calculate the distance from the vertex to the sampled mass point
                float distance = length(position.xy - samplePos);

                // Accumulate the deformation from this mass point
                deformation += mass / (distance + 1.0);  // Adding 1.0 to avoid division by zero
            }
        }

        // Apply the accumulated deformation to the z-coordinate of the vertex position
        deformedPosition.z -= deformation;  // Adjust sign if necessary

        gl_Position = projectionMatrix * modelViewMatrix * vec4(deformedPosition, 1.0);

    }`

export const fragment = /*glsl*/`
    uniform sampler2D uTexture;
    varying vec2 vUv;
    void main() {
        vec4 color = texture2D(uTexture, vUv);
        gl_FragColor = color;  
    }`