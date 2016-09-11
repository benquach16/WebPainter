var FS_SHADER_SOURCE=`

varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;

varying vec3 worldSpaceLightPos;

uniform sampler2D tex;

const vec4 ambientColor = vec4(0.2, 0.2, 0.2, 1.0);
const float specConstant = 0.1;

void main()
{
    //apply phong shader
    vec3 lightDirection = normalize(vPosition - worldSpaceLightPos);

    vec4 texColor = texture2D(tex, vUv);  
	vec4 color;
    vec4 ambient = ambientColor;
    ambient = ambient * texColor;

    //specular code
    vec3 viewDirection = normalize(vPosition - cameraPosition);
    vec3 reflectVector = normalize(-reflect(lightDirection, vNormal));
    float specular = specConstant * pow(max(dot(reflectVector, viewDirection), 0.0), 9.0) ;

    color = texColor * max(dot(vNormal, lightDirection), 0.0);
    gl_FragColor = (color + specular) + ambient;

}
`;
