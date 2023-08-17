import { SongContextState } from '@/contexts/SongContext'

export enum SongReducerActionType {
  SetDevice = 'SetDevice',
  ToggleIsPlaying = 'ToggleIsPlaying',
  SetCurrentPlayingSong = 'SetCurrentPlayingSong',
  SetVolume = 'SetVolume'
}

export type SongReducerAction =
  | {
      type: SongReducerActionType.SetDevice
      payload: Pick<SongContextState, 'deviceId' | 'volume'>
    }
  | {
      type: SongReducerActionType.ToggleIsPlaying
      payload: boolean
    }
  | {
      type: SongReducerActionType.SetCurrentPlayingSong
      payload: Pick<SongContextState, 'selectedId' | 'selectedSong' | 'isPlaying'>
    }
  | {
      type: SongReducerActionType.SetVolume
      payload: number
    }

export const songReducer = (state: SongContextState, { type, payload }: SongReducerAction): SongContextState => {
  switch (type) {
    case SongReducerActionType.SetDevice:
      return {
        ...state,
        deviceId: payload.deviceId,
        volume: payload.volume
      }
    case SongReducerActionType.ToggleIsPlaying:
      return {
        ...state,
        isPlaying: payload
      }
    case SongReducerActionType.SetCurrentPlayingSong:
      const { selectedId, selectedSong, isPlaying } = payload
      return {
        ...state,
        selectedId,
        selectedSong,
        isPlaying
      }

    case SongReducerActionType.SetVolume:
      return {
        ...state,
        volume: payload
      }
    default:
      return state
  }
}
