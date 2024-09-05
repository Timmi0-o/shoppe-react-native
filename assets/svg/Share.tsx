import Svg, { ClipPath, Defs, G, Path, SvgProps } from 'react-native-svg'
const Share = (props: SvgProps) => (
	<Svg width={14} height={14} fill='none' {...props}>
		<G fill='#000' clipPath='url(#a)'>
			<Path d='M12.97 2.333a1.896 1.896 0 1 1-3.792 0 1.896 1.896 0 0 1 3.792 0Z' />
			<Path d='M11.074 4.667a2.336 2.336 0 0 1-2.333-2.334A2.336 2.336 0 0 1 11.074 0a2.336 2.336 0 0 1 2.334 2.333 2.336 2.336 0 0 1-2.334 2.334Zm0-3.792a1.46 1.46 0 0 0-1.458 1.458 1.46 1.46 0 0 0 1.458 1.459 1.46 1.46 0 0 0 1.459-1.459A1.46 1.46 0 0 0 11.074.875ZM12.97 11.667a1.896 1.896 0 1 1-3.792 0 1.896 1.896 0 0 1 3.792 0Z' />
			<Path d='M11.074 14a2.336 2.336 0 0 1-2.333-2.333 2.336 2.336 0 0 1 2.333-2.334 2.336 2.336 0 0 1 2.334 2.334A2.336 2.336 0 0 1 11.074 14Zm0-3.792a1.46 1.46 0 0 0-1.458 1.459 1.46 1.46 0 0 0 1.458 1.458 1.46 1.46 0 0 0 1.459-1.458 1.46 1.46 0 0 0-1.459-1.459ZM4.803 7a1.896 1.896 0 1 1-3.791 0 1.896 1.896 0 0 1 3.791 0Z' />
			<Path d='M2.908 9.333A2.336 2.336 0 0 1 .574 7a2.336 2.336 0 0 1 2.334-2.333A2.336 2.336 0 0 1 5.24 7a2.336 2.336 0 0 1-2.333 2.333Zm0-3.791A1.46 1.46 0 0 0 1.449 7a1.46 1.46 0 0 0 1.459 1.458A1.46 1.46 0 0 0 4.366 7a1.46 1.46 0 0 0-1.458-1.458Z' />
			<Path d='M4.285 6.72a.582.582 0 0 1-.29-1.09l5.413-3.086a.582.582 0 1 1 .578 1.014L4.573 6.644a.58.58 0 0 1-.288.076ZM9.697 11.533a.58.58 0 0 1-.288-.077L3.996 8.37a.584.584 0 0 1 .578-1.013l5.412 3.085a.584.584 0 0 1-.289 1.09Z' />
		</G>
		<Defs>
			<ClipPath id='a'>
				<Path fill='#fff' d='M0 0h14v14H0z' />
			</ClipPath>
		</Defs>
	</Svg>
)
export default Share
