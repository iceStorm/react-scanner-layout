import { useMemo, useRef } from 'react'

import clsx from 'clsx'
import { motion } from 'framer-motion'

import { IconType } from 'react-icons'
import { IoVideocam } from 'react-icons/io5'
import { IoIosMusicalNotes } from 'react-icons/io'
import { RiBarcodeLine } from 'react-icons/ri'
import { RxTriangleDown } from 'react-icons/rx'
import { CiBarcode } from 'react-icons/ci'
import { BsFillPlayFill, BsFillStopFill } from 'react-icons/bs'
import { VscTriangleDown, VscTriangleUp } from 'react-icons/vsc'

import { useCameraStore, useHeaderStore } from '@store'

interface HeaderItem {
  title: string
  icon: IconType
  content?: JSX.Element
}

const items: HeaderItem[] = [
  {
    title: 'Barcodes',
    icon: RiBarcodeLine,
  },
  {
    title: 'Camera',
    icon: IoVideocam,
  },
  {
    title: 'Mask',
    icon: CiBarcode,
  },
  {
    title: 'Sound Effects',
    icon: IoIosMusicalNotes,
  },
]

// m-3 tailwind-css
const panelMargin = 12

export function Header() {
  // const [selectedItem, setSelectedItem] = useState<HeaderItem>()

  const { isMenuHidden, setMenuVisibility } = useHeaderStore()
  const { isCameraPaused, setCameraVisibility } = useCameraStore()

  const ref = useRef<HTMLDivElement>(null)

  const PauseResumeIcon = useMemo(() => {
    return isCameraPaused ? BsFillPlayFill : BsFillStopFill
  }, [isCameraPaused])
  const MenuIcon = useMemo(() => {
    return isMenuHidden ? VscTriangleDown : VscTriangleUp
  }, [isMenuHidden])

  return (
    <header className={clsx('absolute z-10 top-0 left-0 right-0 m-3')}>
      <motion.div
        ref={ref}
        className={clsx(
          'flex divide-x divide-gray-700',
          'max-w-lg mx-auto',
          'bg-black',
          'rounded-md overflow-hidden',
        )}
        animate={{
          marginTop: isMenuHidden
            ? `-${(ref.current?.clientHeight ?? 0) + (panelMargin ?? 0)}px`
            : 0,
        }}
        style={{ minWidth: '300px' }}
      >
        {items.map((i) => {
          return <HeaderItemView key={i.title} item={i} />
        })}
      </motion.div>

      <div className="flex justify-center items-center gap-3 mt-3">
        <button
          className={clsx(
            'flex items-center gap-1',
            'px-5 py-1 pl-3',
            'text-xs text-white',
            'bg-black rounded-full',
            'hover:bg-stone-700',
          )}
          onClick={() => setMenuVisibility(!isMenuHidden)}
        >
          <MenuIcon size={15} />
          <span>{isMenuHidden ? 'Menu' : 'Hide'}</span>
        </button>

        <button
          className={clsx(
            'flex items-center px-3 py-1 gap-1',
            'text-xs text-white',
            'bg-black rounded-full',
            'hover:bg-stone-700',
          )}
          onClick={() => setCameraVisibility(!isCameraPaused)}
        >
          <PauseResumeIcon size={15} />
          <span>{isCameraPaused ? 'Resume' : 'Pause'}</span>
        </button>
      </div>
    </header>
  )
}

interface HeaderItemViewProps {
  item: HeaderItem
}

function HeaderItemView(props: HeaderItemViewProps) {
  const { icon: Icon, title } = props.item

  return (
    <button
      className={clsx(
        'flex-1 p-3',
        'flex flex-col items-center',
        'transition-all duration-100 hover:bg-stone-700',
      )}
    >
      <div className="flex flex-col items-center gap-1">
        <Icon size={20} className="text-white" />
        <span className="text-white text-xs">{title}</span>
      </div>

      <RxTriangleDown size={15} className="text-white" />
    </button>
  )
}
