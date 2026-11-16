import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Bookmark, Heart, Menu, MessageCircle, Share } from 'lucide-react-native'

const UserReactions = () => {
  const reactions = [
    {Icon: Heart, Title: "10.7k"},
    {Icon: MessageCircle, Title: "1023"},
    {Icon: Share, Title: "10"},
    {Icon: Bookmark, Title: "109"},
    {Icon: Menu},
  ]
  return (
    <View className = "w-full h-full items-end justify-end pb-2 pr-2 gap-6">
      {reactions.map(({Icon, Title},idx)=>{
         return(
          <View key = {idx} className = "gap-10 flex-col flex">
            <View className = "flex flex-col gap-1">
              <Icon color="white" size={28} />
              <Text className = "text-white text-center text-sm">{Title}</Text>
            </View>
          </View>
        )
      })}
    </View>
  )
}

export default UserReactions

const styles = StyleSheet.create({})