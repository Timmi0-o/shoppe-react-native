import * as React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'
const InputArrowFooter = (props: SvgProps) => (
	<Svg width={25} height={9} fill='none' {...props}>
		<Path
			fill='#707070'
			d='M0 4.991v-1.25c0-.345.28-.625.625-.625h19.381v-2.5A.625.625 0 0 1 21.07.18l3.751 3.75c.24.247.24.64 0 .887l-3.751 3.75a.625.625 0 0 1-1.063-.45v-2.5H.626A.625.625 0 0 1 0 4.991Z'
		/>
	</Svg>
)
export default InputArrowFooter
