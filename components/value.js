import OG from './og'

export default ({ value, type }) => {
  switch (type) {
    case 'TEXT': {
      return (
        <p className='text-light-2'>
          {value}
        </p>
      )
    }
    case 'IMAGE': {
      return (
        <img
          src={value}
          className='block w-full rounded'
        />
      )
    }
    case 'EMBED': {
      return (
        <OG url={value} />
      )
    }
    default: {
      return 'Well, you\'re pretty screwed!'
    }
  }
}