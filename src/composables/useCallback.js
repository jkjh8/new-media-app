export const useCallback = () => {
  const fnSetCallback = (player, type) => {
    const fnU = (value) => API.send(type, value)

    player.onabort = () => fnU({ status: 'abort', readyState: player.readyState })
    player.oncanplay = () => fnU({ status: 'canplay', readyState: player.readyState })
    player.oncanplaythrough = () => fnU({ status: 'canplaythrough', readyState: player.readyState })
    player.ondurationchange = () => fnU({ duration: player.duration })
    player.onemptied = () => fnU({ status: 'emptied', readyState: player.readyState })
    player.onended = () => fnU({ status: 'ended', readyState: player.readyState })
    player.onerror = () => fnU({ status: 'error', readyState: player.readyState, error: player.error })
    player.onloadeddata = () =>
      fnU({ status: 'loadeddata', readyState: player.readyState, src: player.src, sinkId: player.sinkId })
    player.onloadedmetadata = () =>
      fnU({ status: 'loadedmetadata', readyState: player.readyState, src: player.src, sinkId: player.sinkId })
    player.onloadstart = () => fnU({ status: 'loadstart', readyState: player.readyState })
    player.onpause = () => fnU({ status: 'pause', readyState: player.readyState })
    player.onplay = () => fnU({ status: 'play', readyState: player.readyState })
    player.onplaying = () => fnU({ status: 'playing', readyState: player.readyState })
    // player.onprogress = () => fnU({ status: 'progress', readyState: player.readyState })
    // player.onratechange = () => fnU({ status: 'ratechange', readyState: player.readyState })
    // player.onseeked = () => fnU({ status: 'seeked', readyState: player.readyState })
    // player.onseeking = () => fnU({ status: 'seeking', readyState: player.readyState })
    player.onstalled = () => fnU({ status: 'stalled', readyState: player.readyState })
    player.onsuspend = () => fnU({ status: 'suspend', readyState: player.readyState })
    player.ontimeupdate = () =>
      fnU({ status: 'playing', readyState: player.readyState, currentTime: player.currentTime })
    player.onvolumechange = () => fnU({ volume: player.volume })
    player.onwaiting = () => fnU({ status: 'waiting', readyState: player.readyState })
  }

  return {
    fnSetCallback
  }
}
