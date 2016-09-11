var FS_SHADER_SOURCE=`

varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;

varying vec3 worldSpaceLightPos;

uniform sampler2D tex;


void main()
{
    //apply phong shader
    vec3 lightDirection = normalize(vPosition - worldSpaceLightPos);

    vec4 texColor = texture2D(tex, vUv);  
	vec4 color;
    vec4 ambient = vec4(0.2, 0.2, 0.2, 1.0);
    ambient = ambient * texColor;
    color = texColor * max(dot(vNormal, lightDirection), 0.0);
    gl_FragColor = color + ambient;

}
`;
