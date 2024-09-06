import * as React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'
const ClearTextInput = (props: SvgProps) => (
	<Svg width={12} height={13} fill='none' {...props}>
		<Path
			fill='#D8D8D8'
			fillRule='evenodd'
			d='M0 6.857C0 3.508 2.686.794 6 .794c1.591 0 3.117.639 4.243 1.776A6.095 6.095 0 0 1 12 6.857c0 3.348-2.686 6.062-6 6.062s-6-2.714-6-6.062Zm7.945 1.34a.292.292 0 0 0-.091-.213l-1.11-1.127 1.11-1.128a.292.292 0 0 0 0-.424l-.318-.322a.287.287 0 0 0-.42 0L6 6.105 4.884 4.983a.287.287 0 0 0-.42 0l-.318.322a.292.292 0 0 0 0 .424l1.11 1.128-1.11 1.127a.292.292 0 0 0 0 .425l.318.321a.287.287 0 0 0 .42 0L6 7.61 7.116 8.73a.287.287 0 0 0 .42 0l.318-.321a.292.292 0 0 0 .09-.212Z'
			clipRule='evenodd'
		/>
	</Svg>
)
export default ClearTextInput
