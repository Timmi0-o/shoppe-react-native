import * as React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'
const Filters = (props: SvgProps) => (
	<Svg width={18} height={18} fill='none' {...props}>
		<Path
			fill='#A18A68'
			d='M15.213 3.954H7.181a1.66 1.66 0 0 0-1.57-1.13c-.73 0-1.35.474-1.57 1.13H2.786a.527.527 0 0 0 0 1.055H4.04a1.66 1.66 0 0 0 1.571 1.13c.73 0 1.35-.475 1.57-1.13h8.032a.527.527 0 1 0 0-1.055Zm-9.602 1.13a.603.603 0 1 1 .001-1.206.603.603 0 0 1-.001 1.206ZM15.213 8.473H13.96a1.66 1.66 0 0 0-1.571-1.13c-.73 0-1.35.474-1.57 1.13H2.787a.527.527 0 0 0 0 1.054h8.032a1.66 1.66 0 0 0 1.57 1.13c.73 0 1.35-.474 1.57-1.13h1.254a.527.527 0 1 0 0-1.054Zm-2.824 1.13a.603.603 0 1 1 .001-1.207.603.603 0 0 1 0 1.206ZM15.213 12.992H9.441a1.66 1.66 0 0 0-1.57-1.13c-.73 0-1.35.474-1.571 1.13H2.787a.527.527 0 0 0 0 1.054H6.3a1.66 1.66 0 0 0 1.57 1.13c.73 0 1.35-.474 1.57-1.13h5.773a.527.527 0 1 0 0-1.054Zm-7.343 1.13a.603.603 0 1 1 .002-1.207.603.603 0 0 1-.002 1.206Z'
		/>
	</Svg>
)
export default Filters
