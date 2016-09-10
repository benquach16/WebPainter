var FS_SHADER_SOURCE=`

varying vec2 vUv;
uniform sampler2D tex;

void main()
{
	gl_FragColor=texture2D(tex, vUv);

}
`;
