var FS_SHADER_SOURCE=`

varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;
uniform sampler2D tex;

vec3 lightPos = vec3(2.0, 0.0, 10.0);

void main()
{
    //apply phong shader
    vec3 lightDirection = normalize(vPosition - lightPos);

	vec4 color = texture2D(tex, vUv);
    color = color * max(dot(vNormal, lightDirection), 0.0);

    gl_FragColor = color;

}
`;
