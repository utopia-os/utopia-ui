/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line react/prop-types
const RelationCard = ({ title, description, imageSrc }) => (
  <div className={`tw:mb-6 ${imageSrc ? 'tw:md:flex tw:md:space-x-4' : ''}`}>
    {imageSrc && (
      <div className='tw:md:w-1/2 tw:mb-4 tw:md:mb-0'>
        <img src={imageSrc} alt={title} className='tw:w-full tw:h-32 tw:object-cover' />
      </div>
    )}
    <div className={imageSrc ? 'tw:md:w-1/2' : 'tw:w-full'}>
      <h3 className='tw:text-lg tw:font-semibold'>{title}</h3>
      <p className='tw:mt-2 tw:text-sm tw:text-gray-600'>{description}</p>
    </div>
  </div>
)

export default RelationCard
