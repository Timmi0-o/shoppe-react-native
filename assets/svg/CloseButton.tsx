import * as React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'
const CloseButton = (props: SvgProps) => (
	<Svg width={18} height={18} fill='none' {...props}>
		<Path
			stroke='#000'
			strokeWidth={1.5}
			d='M1 1.245 16.755 17M1 16.755 16.755 1'
		/>
	</Svg>
)
export default CloseButton
