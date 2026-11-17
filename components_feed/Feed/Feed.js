import React, { memo, useCallback, useRef, useState, useEffect } from 'react'
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import UserReactions from './UserReactions'
import puzzles from '../../temp_datasets/puzzles@100.json'
import Numpad from './Numpad'
import FollowCreatorBtn from './FollowCreatorBtn'
import { Heart, UserGroup } from 'lucide-react-native'
import {GestureDetector, GestureHandlerRootView, useTapGesture} from  "react-native-gesture-handler"
import {totalUsers} from "../../users_data/TotalUsers"

const PuzzlePage = memo(function PuzzlePage({
  item,
  onDoubleTap,
  pageHeight,
  sidePadding,
  contentWidth,
  keypadHeight,
  initialAnswer,
  initialSelectedOption,
  onAnswerChange,
  onOptionSelect,
}) {
  const [answer, setAnswer] = useState(initialAnswer)
  const [selectedOption, setSelectedOption] = useState(initialSelectedOption)
  const answerRef = useRef(answer)
  const [userSolved, setUserSolved] = useState(1)
  const [isUserAnswerCorrect, setIsUserAnswerCorrect] = React.useState(null);
  const [heartPosition, sethHeartPosition] = React.useState(null);

  const calculateUserRateOfSolvingThisQuestion = () => {
    const total_Users = totalUsers()
    const percentage = ((userSolved / total_Users) * 100).toFixed(2)
    return percentage
  }

  const checkUserAnswer = useCallback(() => {
    const userAnswer = String(answerRef.current).trim()
    const correctAnswer = String(item.answer).trim()

    if (!userAnswer) return
    const solvedRate = calculateUserRateOfSolvingThisQuestion()

    setUserSolved(solvedRate)

    setIsUserAnswerCorrect(userAnswer === correctAnswer)
  }, [item.answer])


  const updateAnswer = useCallback((nextAnswer) => {
    answerRef.current = nextAnswer
    setAnswer(nextAnswer)

    // Reset the result whenever the answer changes
    setIsUserAnswerCorrect(null)

    onAnswerChange(item.id, nextAnswer)
  }, [item.id, onAnswerChange])

  const handleKeyPress = useCallback((value) => {
    const current = answerRef.current

    updateAnswer(
      value === 'X'
        ? current.slice(0, -1)
        : `${current}${value}`
    )
  }, [updateAnswer])

  const doubleTap = useTapGesture({
    numberOfTaps: 2,
    maxDelay: 300,
    maxDuration: 250,
    maxDeltaX: 20,
    maxDeltaY: 20,
    runOnJS: true,
    cancelsJSResponder: false,
    onActivate: (event) => {
      onDoubleTap()
      sethHeartPosition({
        x: event.x,
        y: event.y,
        id: Date.now()
      })
    },
  })

  useEffect(()=>{
    if (!heartPosition) return 
    const timeout = setTimeout(()=>{
      sethHeartPosition(null)
    },700)
    return () => clearTimeout(timeout)
  }, [heartPosition])

  return (
    <View style={[styles.page, { height: pageHeight, paddingHorizontal: sidePadding }]}>
      <GestureDetector gesture={doubleTap}>
        <View style={StyleSheet.absoluteFill}>
        {heartPosition && (
          <Text
          pointerEvents='none'
          style = {{
            position: "absolute",
            left : heartPosition.x - 25,
            top: heartPosition.y - 25,
            fontSize: 50,
            zIndex: 100,
            elevation: 100,
          }}
          >
            <Heart fill = "red" color = "red" size={50} />
          </Text>
        )}
        </View>
      </GestureDetector>
      <View className = "flex self-center items-center justify-center mt-5 border-white/40 border w-52 h-fit py-2 rounded-2xl">
        <View className = "flex flex-row items-center gap-2 ">
          <UserGroup color="white" fill="white" size={20} />
          <Text className = "text-[#A6E34A] font-bold text-lg">{userSolved}%</Text>
          <Text className = "text-gray-500 text-lg">solved this</Text>
        </View>
      </View>
      <View pointerEvents="box-none" style={styles.puzzleArea}>
        {item.type === 'math' && item.equation ? (
          <View style={[styles.prompt, { width: contentWidth }]}>
            {item.equation.map((part, index) => (
              <Text key={`${item.id}-part-${index}`} style={styles.equationText}>
                {part.value}
              </Text>
            ))}
          </View>
        ) : (
          <View style={[styles.prompt, { width: contentWidth }]}>
            <Text style={styles.questionText}>{item.question}</Text>
          </View>
        )}

        {item.type === 'math' ? (
          <>
            <TextInput
              value={answer}
              onChangeText={updateAnswer}
              showSoftInputOnFocus={false}
              accessibilityLabel="Enter answer"
              placeholder="Enter Answer"
              placeholderTextColor="#9A9A9A"
              style={[
                styles.answerInput,
                { width: contentWidth },
                isUserAnswerCorrect === true && {
                  borderWidth: 2,
                  borderColor: '#A6E34A',
                  color: '#A6E34A',
                },
                isUserAnswerCorrect === false && {
                  borderWidth: 2,
                  borderColor: '#FF4D4D',
                  color: '#FF4D4D',
                },
              ]}
            />
            <View style={{ width: contentWidth }}>
              <Numpad width={contentWidth} height={keypadHeight} onCheckAnswer={checkUserAnswer} onKeyPress={handleKeyPress} />
            </View>
          </>
        ) : (
          <View style={[styles.options, { width: contentWidth }]}>
            {(item.options ?? []).map((option, index) => {
              const isSelected = selectedOption === index
              return (
                <Pressable
                  key={`${item.id}-option-${index}`}
                  accessibilityRole="button"
                  accessibilityState={{ selected: isSelected }}
                  onPress={() => {
                    setSelectedOption(index)
                    onOptionSelect(item.id, index)
                  }}
                  style={[styles.option, isSelected && styles.selectedOption]}
                >
                  <Text style={styles.optionText}>{option}</Text>
                </Pressable>
              )
            })}
          </View>
        )}
      </View>

      <View pointerEvents="box-none" style={[styles.creator, { width: contentWidth }]}>
        <FollowCreatorBtn />
      </View>
    </View>
  )
})

const Feed = () => {
  const [feedSize, setFeedSize] = useState({ width: 0, height: 0 })
  const answers = useRef({})
  const selectedOptions = useRef({})
  const sidePadding = Math.max(16, Math.min(24, feedSize.width * 0.05))
  const reactionSpace = Math.max(56, Math.min(76, feedSize.width * 0.16))
  const contentWidth = Math.max(0, feedSize.width - sidePadding * 2 - reactionSpace)
  const keypadHeight = Math.min(contentWidth / 1.67, Math.max(132, feedSize.height * 0.3))
  const [isDoubledTap, setIsDoubleTap] = React.useState(false);
  // const doubleTap = useTapGesture({
  //   numberOfTaps: 2,
  //   runOnJS: true,
  //   onActivate: () => {
  //     setIsDoubleTap(true)
  //   }
  // })
  const saveAnswer = useCallback((id, value) => {
    answers.current[id] = value
  }, [])
  const saveSelectedOption = useCallback((id, value) => {
    selectedOptions.current[id] = value
  }, [])

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View
        style={styles.container}
        onLayout={({ nativeEvent }) => {
          const { width, height } = nativeEvent.layout
          setFeedSize((current) => current.width === width && current.height === height ? current : { width, height })
        }}
      >
        {feedSize.height > 0 && feedSize.width > 0 && (
          <FlatList
            data={puzzles}
            pagingEnabled
            style={styles.list}
            getItemLayout={(_, index) => ({ length: feedSize.height, offset: feedSize.height * index, index })}
            keyExtractor={(item) => item.id}
            decelerationRate="fast"
            showsVerticalScrollIndicator={false}
            initialNumToRender={2}
            maxToRenderPerBatch={4}
            windowSize={5}
            onMomentumScrollEnd={() => {
              setIsDoubleTap(false)
            }}
            renderItem={({ item }) => (
              <PuzzlePage
                item={item}
                pageHeight={feedSize.height}
                sidePadding={sidePadding}
                contentWidth={contentWidth}
                keypadHeight={keypadHeight}
                initialAnswer={answers.current[item.id] ?? ''}
                initialSelectedOption={selectedOptions.current[item.id] ?? null}
                onAnswerChange={saveAnswer}
                onOptionSelect={saveSelectedOption}
                onDoubleTap={() => setIsDoubleTap(true)}
              />
            )}
          />
        )}
        <View pointerEvents="box-none" style={styles.reactionRail}>
          <UserReactions doubleTap = {isDoubledTap} />
        </View>
      </View>
    </GestureHandlerRootView>
  )
}

export default Feed

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    width: '100%',
  },
  list: {
    flex: 1,
  },
  page: {
    width: '100%',
  },
  puzzleArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 12,
    gap: 10,
  },
  prompt: {
    alignItems: 'center',
    marginBottom: 6,
  },
  equationText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32,
  },
  questionText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 27,
    textAlign: 'center',
  },
  answerInput: {
    height: 54,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 14,
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
  },
  options: {
    gap: 8,
  },
  option: {
    minHeight: 42,
    justifyContent: 'center',
    paddingHorizontal: 14,
    backgroundColor: 'rgba(255,255,255,0.16)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  selectedOption: {
    backgroundColor: 'rgba(166,227,74,0.28)',
    borderColor: '#A6E34A',
  },
  optionText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  creator: {
    paddingBottom: 12,
  },
  reactionRail: {
    position: 'absolute',
    right: 0,
    bottom: 24,
    top: 0,
    zIndex: 10,
  },
  
})
