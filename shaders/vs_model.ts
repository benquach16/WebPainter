var VS_SHADER_SOURCE = `

varying vec3 vNormal;
varying vec3 vPosition;
varying vec2 vUv;


void main()
{
    vUv = uv; 
    vPosition = position;
    vNormal = normalize(normal);
	gl_Position = projectionMatrix *
                modelViewMatrix *
                vec4(position,1.0);
}
`;
