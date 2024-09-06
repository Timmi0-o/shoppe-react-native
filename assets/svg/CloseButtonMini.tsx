import * as React from 'react'
import Svg, { Defs, G, Path, SvgProps } from 'react-native-svg'
const CloseButtonMini = (props: SvgProps) => (
	<Svg
		width={props.width || 16}
		height={props.height || 16}
		viewBox='0 0 13 13'
		fill='none'
		{...props}
	>
		<G filter='url(#a)'>
			<Path
				stroke='#000'
				strokeWidth={1.5}
				d='M5 1.092 10.908 7M5 6.908 10.908 1'
			/>
		</G>
		<Defs></Defs>
	</Svg>
)
export default CloseButtonMini
