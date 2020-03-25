import React, { useState, useCallback } from 'react'
import { AutoSizer, InfiniteLoader, List } from 'react-virtualized'
import ContentBox from '../ContentBox'
import styles from '../../assets/css/styles.css'

const STATUS_LOADING = 1
const STATUS_LOADED = 2

const timeoutIdMap = {}

const RealtimeTable = (props) => {
  const [state, setNewState] = useState({
    loadedRowCount: 0,
    loadedRowsMap: {},
    loadingRowCount: 0,
  })
  const setState = useCallback(
    (newState) => {
      setNewState((currentState) => ({
        ...currentState,
        ...newState,
      }))
    },
    [setNewState],
  )
  const { list } = props

  const rowRenderer = ({ index, key, style }) => {
    const { list } = props
    const row = list[index]
    return (
      <div className={styles.RTRow} key={key} style={style}>
        {row.text}
      </div>
    )
  }

  const loadMoreRows = ({ startIndex, stopIndex }) => {
    console.log('_loadMoreRows')
    const { loadedRowsMap, loadingRowCount } = state
    const increment = stopIndex - startIndex + 1

    for (var i = startIndex; i <= stopIndex; i++) {
      loadedRowsMap[i] = STATUS_LOADING
    }

    setState({
      loadingRowCount: loadingRowCount + increment,
    })

    const timeoutId = setTimeout(() => {
      const { loadedRowCount, loadingRowCount } = state

      delete timeoutIdMap[timeoutId]

      for (var i = startIndex; i <= stopIndex; i++) {
        loadedRowsMap[i] = STATUS_LOADED
      }

      setState({
        loadingRowCount: loadingRowCount - increment,
        loadedRowCount: loadedRowCount + increment,
      })

      promiseResolver()
    }, 100 + Math.round(Math.random() * 200))

    timeoutIdMap[timeoutId] = true

    let promiseResolver

    return new Promise((resolve) => {
      promiseResolver = resolve
    })
  }

  const isRowLoaded = ({ index }) => {
    // console.log('_isRowLoaded');
    const { loadedRowsMap } = state
    return !!loadedRowsMap[index] // STATUS_LOADING or STATUS_LOADED
  }

  return (
    <ContentBox>
      <InfiniteLoader
        isRowLoaded={isRowLoaded}
        loadMoreRows={loadMoreRows}
        rowCount={list.length}
      >
        {({ onRowsRendered, registerChild }) => (
          <AutoSizer disableHeight>
            {({ width }) => (
              <List
                ref={registerChild}
                className={styles.RTList}
                height={props.height}
                onRowsRendered={onRowsRendered}
                rowCount={list.length}
                rowHeight={30}
                rowRenderer={rowRenderer}
                width={width}
              />
            )}
          </AutoSizer>
        )}
      </InfiniteLoader>
    </ContentBox>
  )
}

export default RealtimeTable
