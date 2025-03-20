import Subtitle from '#components/Typography/Subtitle'

interface TitleCardProps {
  title?: string
  hideTitle?: boolean
  children?: React.ReactNode
  topMargin?: string
  className?: string
  TopSideButtons?: React.ReactNode
}

/**
 * @category Templates
 */
export function TitleCard({
  title,
  hideTitle,
  children,
  topMargin,
  TopSideButtons,
  className,
}: TitleCardProps) {
  return (
    <div
      className={
        'tw-card tw:w-full tw:p-6 tw:bg-base-100 tw:shadow-xl tw:h-fit tw:mb-4 ' +
        (className ?? '') +
        ' ' +
        (topMargin ?? 'tw:mt-6')
      }
    >
      {!hideTitle && (
        <>
          <Subtitle styleClass={TopSideButtons ? 'tw:inline-block' : ''}>
            {title}

            {/* Top side button, show only if present */}
            {TopSideButtons && (
              <div className='tw:inline-block tw:float-right'>{TopSideButtons}</div>
            )}
          </Subtitle>
          <div className='tw-divider tw:mt-2'></div>
        </>
      )}

      {/** Card Body */}
      <div className='tw:h-full tw:bg-transparent tw:w-full tw:pb-6 tw:bg-base-100'>{children}</div>
    </div>
  )
}
