import Svg, { Path, SvgProps } from 'react-native-svg'

const ArrowBack = (props: SvgProps) => (
	<Svg
		width={props.width}
		height={props.height}
		viewBox='0 0 8 16'
		fill='none'
		{...props}
	>
		<Path
			fill={props.fill || '#000'}
			d='M8.934 14.463a.4.4 0 0 1 0 .568l-.847.848a.384.384 0 0 1-.56 0L.176 8.528A.6.6 0 0 1 0 8.104v-.208a.6.6 0 0 1 .176-.424l7.35-7.35a.384.384 0 0 1 .56 0l.848.847a.4.4 0 0 1 0 .568L2.471 8l6.463 6.463Z'
		/>
	</Svg>
)

export default ArrowBack
