var VS_SHADER_SOURCE = `

varying vec3 vNormal;
varying vec3 vPosition;
varying vec2 vUv;

varying vec3 worldSpaceLightPos;

vec3 lightPos = vec3(2.0, -250.0, -20.0);

void main()
{
    vUv = uv; 
    vPosition = position;
    vNormal = normalize(normal);

    worldSpaceLightPos = lightPos;

	gl_Position = projectionMatrix *
                modelViewMatrix *
                vec4(position,1.0);
}
`;
