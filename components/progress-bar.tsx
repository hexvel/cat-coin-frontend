const ProgressBar = ({ progress }: { progress: number }) => {
	return (
		<div className='w-full flex justify-center absolute bottom-28'>
			<div className='relative w-[90%] h-2 mb-2 bg-white rounded-full'>
				<div className='w-full text-xl font-semibold absolute -top-10 text-white flex justify-between'>
					<p>⚡{progress}</p>
					<p className='text-primary'>/6000</p>
				</div>
				<div
					className='absolute top-0 left-0 h-full bg-[rgb(26,151,6)] rounded-full'
					style={{ width: `${(progress / 6000) * 100}%` }}
				/>
			</div>
		</div>
	)
}

export default ProgressBar
