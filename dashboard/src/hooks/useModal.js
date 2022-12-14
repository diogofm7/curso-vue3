import bus from '@/utils/bus'

const EVENT_NAME = 'modal:toggle'

export default function useModal () {
  function open (paylod = {}) {
    bus.emit(EVENT_NAME, { status: true, ...paylod })
  }

  function close (paylod = {}) {
    bus.emit(EVENT_NAME, { status: false, ...paylod })
  }

  function listen (fn) {
    bus.on(EVENT_NAME, fn)
  }

  function off (fn) {
    bus.on(EVENT_NAME, fn)
  }

  return { open, close, listen, off }
}
